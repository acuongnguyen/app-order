export const actionTypes = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CATEGORY: 'SET_CATEGORY',
    SET_FOODS_POPULAR: 'SET_FOODS_POPULAR',
    TOGGLE_CART: 'TOGGLE_CART',
    SET_CARTITEMS: 'SET_CARTITEMS',
    SET_ORDERITEMS: 'SET_ORDERITEMS',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
    SET_ORDER_TOTAL: 'SET_ORDER_TOTAL',
    SET_ADMIN_MODE: 'SET_ADMIN_MODE',
    SET_USERS: 'SET_USERS',
    UPDATE_USER: 'UPDATE_USER',
    SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
    UPDATE_CHECKOUT_DATA: 'UPDATE_CHECKOUT_DATA',
    TOGGLE_CONTRACT_FORM: 'TOGGLE_CONTRACT_FORM',
    TOGGLE_ORDER_FORM: 'TOGGLE_ORDER_FORM',
    TOGGLE_ORDER: 'TOGGLE_ORDER',
    TOGGLE_MOBILE_NAV: 'TOGGLE_MOBILE_NAV',
    ADD_TO_ORDER: 'ADD_TO_ORDER',
    ADD_TO_CART: 'ADD_TO_CART',
    SET_FILTER: 'SET_FILTER',
    CLEAR_CART: 'CLEAR_CART',
    CLEAR_ORDER: 'CLEAR_ORDER',
}

export const mergeCartItems = (currentCartItems, newCartItems) => {
    const updatedCart = [...currentCartItems];
    newCartItems.forEach(newItem => {
        const existingItem = updatedCart.find(item => item.id === newItem.id);
        if (existingItem) {
            existingItem.quantity += newItem.quantity;
        } else {
            updatedCart.push(newItem);
        }
    });
    return updatedCart;
};

const reducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_FOOD_ITEMS:
            const newFoodItems = action.foodItems;
            const currentFood = state.foodItems ? [...state.foodItems] : [];
            const isItemInCurrentFood = (item) => {
                return currentFood.some((existingItem) => existingItem.id === item.id);
            };
            const updatedFoodItems = newFoodItems.filter((newItem) => !isItemInCurrentFood(newItem));
            // localStorage.setItem('foodItems', JSON.stringify(updatedFoodItems));
            return {
                ...state,
                foodItems: currentFood.concat(updatedFoodItems),
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.loading,
            };
        case actionTypes.SET_CATEGORY:
            return {
                ...state,
                categories: action.categories,
            }
        case actionTypes.SET_FOODS_POPULAR:
            return {
                ...state,
                foodItemsPopular: action.foodItemsPopular,
            }
        case actionTypes.TOGGLE_CART:
            return {
                ...state,
                showCart: action.showCart,
            };

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
        case actionTypes.CLEAR_Order:
            return {
                ...state,
                orderItems: [],
            };
        case actionTypes.SET_CARTITEMS:
            const updatedCart = mergeCartItems(state.cartItems, action.cartItems);
            return {
                ...state,
                cartItems: updatedCart,
            };
        case actionTypes.SET_ORDERITEMS:
            const updatedOrderItems = [...state.orderItems];
            action.orderItems.forEach(newCartItem => {
                const existingItemIndex = updatedOrderItems.findIndex(item => item.fid === newCartItem.fid);

                if (existingItemIndex !== -1) {
                    const updatedItem = {
                        ...updatedOrderItems[existingItemIndex],
                        qty: updatedOrderItems[existingItemIndex].qty + newCartItem.qty
                    };
                    updatedOrderItems[existingItemIndex] = updatedItem;
                } else {
                    updatedOrderItems.push(newCartItem);
                }
            });
            return {
                ...state,
                orderItems: updatedOrderItems,
            };
        case actionTypes.SET_CART_TOTAL:
            return {
                ...state,
                cartTotal: action.cartTotal,
            };
        case actionTypes.SET_ORDER_TOTAL:
            return {
                ...state,
                orderTotal: action.orderTotal,
            }
        case actionTypes.SET_ADMIN_MODE:
            return {
                ...state,
                adminMode: action.adminMode,
            };
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                user: action.user
            };
        case actionTypes.SET_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.paymentMethod
            };
        case actionTypes.UPDATE_CHECKOUT_DATA:
            return {
                ...state,
                checkoutData: action.checkoutData
            };
        case actionTypes.TOGGLE_CONTACT_FORM:
            return {
                ...state,
                showContactForm: action.showContactForm
            };
        case actionTypes.TOGGLE_CONTRACT_FORM:
            return {
                ...state,
                showContractForm: action.showContractForm
            };
        case actionTypes.TOGGLE_ORDER_FORM:
            return {
                ...state,
                showOrderForm: action.showOrderForm,
            };
        case actionTypes.TOGGLE_ORDER:
            return {
                ...state,
                showOrder: action.showOrder
            };
        case actionTypes.TOGGLE_MOBILE_NAV:
            return {
                ...state,
                showMobileNav: action.showMobileNav
            };
        case actionTypes.SET_FILTER:
            return {
                ...state,
                filter: action.filter,
            };
        default:
            return state;
    }
}

export default reducer;