import { fetchSessionUser } from "../utils/fetchSessionData";

const sessionUser = fetchSessionUser();
export const initialState = {
    user: sessionUser,
    foodItems: null,
    categories: [],
    showCart: false,
    showMobileNav: false,
    showOrder: false,
    showOrderForm: false,
    cartItems: [],
    orderItems: [],
    cartTotal: 0,
    orderTotal: 0,
    filter: 'all',
    users: [],
    paymentMethod: 'mobile_money',
    checkoutData: {},
}