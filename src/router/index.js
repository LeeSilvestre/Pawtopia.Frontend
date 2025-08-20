import { createWebHistory, createRouter } from "vue-router";
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Promo from '../pages/Promo.vue';
import Menu from '../pages/Menu.vue';
import Table from '../pages/Table.vue';
import Cart from '../pages/Cart.vue';
import Checkout from '../pages/Checkout.vue';
import Thank from '../pages/Thank.vue';
import MyOrder from '../pages/MyOrder.vue';
import Admin from '../admin/Admin.vue';
import Dashboard from '../admin/Dashboard.vue';
import Kitchen from '../kitchen/Kitchen.vue';
import KDashboard from '../kitchen/KDashboard.vue';
import ManageMenu from '../admin/ManageMenu.vue';
import UpdateMenu from '../admin/UpdateMenu.vue';
import History from '../admin/History.vue';
import Delivering from '../admin/Delivering.vue';
import Cancelled from '../admin/Cancelled.vue';
import AddNewFood from '../admin/AddNewFood.vue';
import MyOrderHistory from '../pages/OrderHistory.vue';
import CancelledOrder from '../pages/OrderCancelled.vue';


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, 
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/promotions",
    name: "Promotions",
    component: Promo,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/thank",
    name: "Thank",
    component: Thank,
  },
  {
    path: "/myorder",
    name: "MyOrder",
    component: MyOrder,
  },
  {
    path: "/myorderhistory",
    name: "MyOrderHistory",
    component: MyOrderHistory,
  },
  {
    path: "/cancelledorder",
    name: "CancelledOrder",
    component: CancelledOrder,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/kitchen",
    name: "Kitchen",
    component: Kitchen,
  },
  {
    path: "/kitchen/kdashboard",
    name: "KDashboard",
    component: KDashboard,
  },
  {
    path: "/admin/managemenu",
    name: "ManageMenu",
    component: ManageMenu,
  },
  {
    path: "/admin/updatemenu",
    name: "UpdateMenu",
    component: UpdateMenu,
  },
  {
    path: "/admin/history",
    name: "History",
    component: History,
  },
  {
    path: "/admin/delivering",
    name: "Delivering",
    component: Delivering,
  },
  {
    path: "/admin/cancelled",
    name: "Cancelled",
    component: Cancelled,
  },
  {
    path: "/admin/addnewfood",
    name: "AddNewFood",
    component: AddNewFood,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home,
    // https://stackoverflow.com/questions/68504803/how-can-i-make-a-catch-all-other-route-in-vue-router-also-catch-the-url-when-p
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;