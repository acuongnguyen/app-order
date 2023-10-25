import { fetchSessionUser, fetchSessionUserMode } from "../utils/fetchSessionData";

const sessionUser = fetchSessionUser();
const sessionUserMode = fetchSessionUserMode();
export const initialState = {
    user: sessionUser,
    foodItems: null,
    showCart: false,
    showMobileNav: false,
    showOrder: false,
    showOrderForm: false,
    cartItems: [],
    orderItems: [],
    cartTotal: 0,
    orderTotal: 0,
    adminMode: sessionUserMode,
    users: [],
    paymentMethod: 'mobile_money',
    checkoutData: {},
}