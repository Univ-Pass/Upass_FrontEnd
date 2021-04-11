import { createWebHistory, createRouter } from "vue-router"
import StudentId from "./page/StudentId/StudentId.vue"
import Order from "./page/Order/Order.vue"
import Setting from "./page/Setting/Setting.vue"
import Wallet from "./page/Wallet/Wallet.vue"
import QRScanner from "./page/QRScanner/QRScanner.vue"
import SimplePassword from "./page/SimplePasswd/SimplePasswd.vue"

const routes = [
	{
		path: "/",
		name: "StudentId",
		component: StudentId,
	},
	{
		path: "/order",
		name: "Order",
		component: Order,
	},
	{
		path: "/wallet",
		name: "Wallet",
		component: Wallet,
	},
	{
		path: "/setting",
		name: "Setting",
		component: Setting,
	},
	{
		path: "/qrscanner",
		name: "QRScanner",
		component: QRScanner,
	},
	{
		path: "/simplepwd",
		name: "Setting",
		component: SimplePassword,
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
