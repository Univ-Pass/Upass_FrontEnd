import { createWebHistory, createRouter } from "vue-router"
import StudentId from "./page/StudentId/StudentId.vue"
import Order from "./page/Order/Order.vue"
import Wallet from "./page/Wallet/Wallet.vue"
import QRScanner from "./page/QRScanner/QRScanner.vue"
import Login from "./page/Login/Login.vue"
import LoginForm from "./page/LoginForm/LoginForm.vue"
import Reservation from "./page/Reservation/Reservation.vue"
import Calendar from "./page/Calendar/Calendar.vue"
import EntryList from "./page/EntryList/EntryList.vue"
import AdminSetting from "./page/AdminSetting/AdminSetting.vue"
import axios from "axios"

// 각 페이지 라우팅 설정
const routes = [
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/loginForm/:name/:imgUrl/:email/:find?",
		name: "LoginForm",
		component: LoginForm,
		props: true,
	},
	{
		path: "/",
		name: "StudentId",
		component: StudentId,
	},
	{
		path: "/wallet",
		name: "Wallet",
		component: Wallet,
	},
	{
		path: "/order",
		name: "Order",
		component: Order,
	},
	{
		path: "/reservation",
		name: "Reservation",
		component: Reservation,
	},
	{
		path: "/calendar",
		name: "Calendar",
		component: Calendar,
	},
	{
		path: "/entrylist",
		name: "Entrylist",
		component: EntryList,
	},
	{
		path: "/qrscanner",
		name: "QRScanner",
		component: QRScanner,
	},
	{
		path: "/adminsetting",
		name: "AdminSetting",
		component: AdminSetting,
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})

// 올바른 User key인지 확인 + Admin Key 인지 확인
async function authenticationKey() {
	try {
		const response = await axios.get("/api/authkey/", { params: { key: localStorage.getItem("key"), admin_key: localStorage.getItem("adminKey") } })
		if (response.status === 201) {
			if (response.data.msg === "This is the correct key" || response.data.msg === "Admin key success") return true
		}
	} catch (error) {
		if (error.response.data.msg === "Key is error") {
			localStorage.removeItem("key")
			return false
		} else if (error.response.data.msg === "Admin key is error") {
			localStorage.removeItem("adminKey")
			return false
		}
	}
}

// 라우터 이동전에 로그인 유효성 검사
router.beforeEach((to, from, next) => {
	// 로그인 페이지 갔을때
	if (to.path == "/login") {
		// 로그인 상태가 아니면(key 없으면) 로그인 페이지로 이동
		if (localStorage.getItem("key") === null) {
			next()
		} else {
			// 로그인 상태면(key 있으면) 페이지 이동
			next({ path: "/" })
		}
		// 입력 창 갔을 때
	} else if (to.path.split("/")[1] == "loginForm") {
		next()
		// 로그인, 입력창 아닐때
	} else {
		if (localStorage.getItem("key") !== null) authenticationKey()
		if (localStorage.getItem("key") === null) {
			// 로그인 상태(key 없으면)가 아니면 로그인 페이지로 이동시킴
			next({ path: "/login" })
		} else {
			// 로그인 상태면(key 있으면) 페이지 이동
			if (JSON.parse(localStorage.getItem("AdminMode")) === true) {
				if (to.path == "/entrylist" || to.path == "/qrscanner" || to.path == "/adminsetting") {
					next()
				} else next({ path: "/entrylist" })
			} else {
				next()
			}
		}
	}
})
