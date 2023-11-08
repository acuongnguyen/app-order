import { FoodItem, cartItem, FoodCategories, FoodCategory } from "../../types";
import { GiFruitTree, GiChickenOven, GiBeerBottle, GiBowlOfRice } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { FaFish } from "react-icons/fa";
import { Categories, setCategories } from "./categories";
import {
  firebaseAddToCart,
  firebaseAddToOrder,
  firebaseDeleteCartItem,
  firebaseDeleteFood,
  firebaseEmptyUserCart,
  firebaseFetchAllCartItems,
  firebaseFetchFoodItems,
  firebaseGetAllUsers,
  firebaseGetUser,
  firebaseLogout,
  firebaseUpdateCartItem,
  firebaseUpdateUser,
} from "../Firebase";

import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const addToCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  user: any,
  fid: number,
  dispatch: any,
) => {
  if (!user) {
    toast.error("Please login to add items to cart", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "unauthorizedAddToCart",
    });
  } else {
    if (cartItems.some((item: cartItem) => item["fid"] === fid)) {
      toast.error("Item already in cart", {
        icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
        toastId: "itemAlreadyInCart",
      });
    } else {
      const data: cartItem = {
        id: Date.now(),
        fid: fid,
        uid: user.uid,
        qty: 1,
      };
      dispatch({
        type: "SET_CARTITEMS",
        cartItems: [...cartItems, data],
      });
      calculateCartTotal(cartItems, foodItems, dispatch);
      await firebaseAddToCart(data);
    }
  }
};

export const addToOrder = (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  currentOrderTotal: string,
  dispatch: any,
) => {
  if (!cartItems || cartItems.length === 0) {
    toast.error("No items in the cart to add to order", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "emptyCart",
    });
    return;
  }
  dispatch({
    type: "SET_ORDERITEMS",
    orderItems: cartItems,
  });
  calculateOrderTotal(cartItems, foodItems, currentOrderTotal, dispatch);
};

// export const addToOrder = async (
//   cartItems: cartItem[],
//   foodItems: FoodItem[],
//   currentOrderTotal: string,
//   dispatch: any,
// ) => {
//   if (!cartItems || cartItems.length === 0) {
//     toast.error("No items in the cart to add to order", {
//       icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
//       toastId: "emptyCart",
//     });
//     return;
//   }
//   dispatch({
//     type: "SET_ORDERITEMS",
//     orderItems: cartItems,
//   });
//   calculateOrderTotal(cartItems, foodItems, currentOrderTotal, dispatch);
//   try {
//     const response = await fetch('https://vtda.online/api/v1/orders?tableId=1234', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(cartItems),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch({
//         type: "CLEAR_CART",
//       });
//       calculateOrderTotal(cartItems, foodItems, currentOrderTotal, dispatch);
//     } else {
//       throw new Error('Failed to create order');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     toast.error("Failed to create order. Please try again later.");
//   }
// };

export const dispatchtUserCartItems = (
  uid: string,
  items: cartItem[],
  dispatch: any
) => {
  const cartItems = items.filter((item: cartItem) => item.uid === uid);
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });

  return cartItems;
};

export const fetchUserCartData = async (user: any, dispatch: any) => {
  if (user) {
    // await firebaseFetchAllCartItems()
    //   .then((data) => {
    //     const userCart = dispatchtUserCartItems(user.uid, data, dispatch);
    //     localStorage.setItem("cartItems", JSON.stringify(userCart));
    //   })
    //   .then(() => { })
    //   .catch((e) => {
    //     console.log(e);
    // });
  } else {
    localStorage.setItem("cartItems", "undefined");
  }
};
export const fetchFoodPopular = async (dispatch: any) => {
  const apiUrl = 'https://vtda.online/api/v1/foods/popular';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    dispatch({
      type: "SET_FOODS_POPULAR",
      foodItemsPopular: data,
    });
    dispatch({
      type: "SET_FOOD_ITEMS",
      foodItems: data,
    });
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  } catch (error) {
    console.log(error);
    // Cập nhật trạng thái loading nếu có lỗi
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  }
};
export const fetchFoodDataByFilter = (filter: string): string => {
  let apiUrl = "https://vtda.online/api/v1/foods/";
  if (filter) {
    apiUrl += filter;
  }
  return apiUrl;
};


export const fetchFoodData = async (dispatch: any, filter: string) => {
  const apiUrl = fetchFoodDataByFilter(filter);
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    dispatch({
      type: "SET_FOOD_ITEMS",
      foodItems: data,
    });
  } catch (error) {
    console.log(error);
  }
};
//format total
export function formatNumber(number: any) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const getFoodyById = (menu: FoodItem[], fid: number) => {
  return menu.find((item: FoodItem) => item.id === fid);
};

export const fetchCategory = async (dispatch: any) => {
  const apiUrl = 'https://vtda.online/api/v1/categories';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const mappedCategories: FoodCategories = data.map((category: FoodCategory) => {
      console.log("icon", category.imageUrl);
      return {
        id: category.id,
        name: category.name,
        urlParam: category.id,
        imageUrl: category.imageUrl,
      };
    });

    setCategories(mappedCategories);
    dispatch({
      type: "SET_CATEGORY",
      categories: mappedCategories,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update Cart Item Quantity
export const updateCartItemQty = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any,
  val: number
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index].qty += val;
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseUpdateCartItem(cartItems[index])
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  }
};

//  Delete Cart Item
export const deleteCartItem = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems.splice(index, 1);
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseDeleteCartItem(item)
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  }
};

// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  let total = 0;
  cartItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(foodItems, item.fid);
    total += item.qty * parseFloat(foodItem?.price || "0");
  });
  const formattedTotal = formatNumber(total);
  dispatch({
    type: "SET_CART_TOTAL",
    cartTotal: formattedTotal,
  });
};
// Calculate Total Price Round to 2 decimal places
export const calculateOrderTotal = (
  newOrderItems: cartItem[],
  foodItems: FoodItem[],
  currentOrderTotal: string,
  dispatch: any
) => {
  let total = parseFloat(currentOrderTotal);
  console.log("currentOrderTotal", currentOrderTotal);
  newOrderItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(foodItems, item.fid);
    total += item.qty * parseFloat(foodItem?.price || "0");
  });
  if (typeof total === "number") {
    dispatch({
      type: "SET_ORDER_TOTAL",
      orderTotal: total.toFixed(0),
    });
  } else {
    console.error("Total is not a number:", total);
  }
};

// Empty Cart
export const emptyCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  if (cartItems.length > 0) {
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [],
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseEmptyUserCart(cartItems)
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  } else {
    toast.warn("Cart is already empty");
  }
};

// Hide Cart
export const hideCart = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CART",
    showCart: !true,
  });
};


// Hide Order
export const hideOrderform = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_ORDER_FORM",
    showOrderForm: !true,
  });
};

// Hide Mobile Nav
export const hideMobileNav = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_MOBILE_NAV",
    showMobileNav: !true,
  });
};

// Hide Cart
export const hideContractform = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CONTRACT_FORM",
    showContractForm: !true,
  });
};

export const shuffleItems = (items: any) => {
  let currentIndex = items.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [items[currentIndex], items[randomIndex]] = [
      items[randomIndex],
      items[currentIndex],
    ];
  }

  return items;
};

export const logout = async (user: any, dispatch: any, navigate: any) => {
  if (user) {
    await firebaseLogout()
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_CARTITEMS",
          cartItems: [],
        });
        // turn off adminMode
        dispatch({
          type: "SET_ADMIN_MODE",
          adminMode: false,
        });

        localStorage.setItem("user", "undefined");
        localStorage.setItem("adminMode", "undefined");
        localStorage.removeItem("cartItems");
        navigate("/");
      })
      .catch((e: any) => {
        console.log(e);
      });
  } else {
    console.log("You are not logged in");
  }
};

export const ToggleAdminMode = (dispatch: any, state: boolean) => {
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: state,
  });
  localStorage.setItem("adminMode", JSON.stringify(state));
  console.log(state);
};

export const isAdmin = (user: any) => {
  let isAdmin =
    user?.email == "bentilshadrack72@gmail.com" ||
    user?.email == "admin@test.com";
  return isAdmin;
};

// get user
export const getUserData = async (user: any) => {
  return await firebaseGetUser(user.uid);
};

// update currentUser
export const updateUserData = async (
  user: any,
  dispatch: any,
  alert: boolean
) => {
  await firebaseUpdateUser(user)
    .then(() => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(user));
      alert && toast.success("User data updated successfully");
    });
};

// get all users
export const dispatchUsers = async (dispatch: any) => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      dispatch({
        type: "SET_USERS",
        users: users,
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
};
export const getAllUser = async () => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      return users;
    })
    .catch((e: any) => {
      console.log(e);
    });
};
// delete food
export const deleteFood = async (
  food: FoodItem,
  foodItems: FoodItem[],
  dispatch: any
) => {
  await firebaseDeleteFood(food.id);
  // remove food from foodItems
  const foodIndex = foodItems.indexOf(food);
  if (foodIndex !== -1) {
    foodItems.splice(foodIndex, 1);
  }
  dispatch({
    type: "SET_FOOD_ITEMS",
    foodItems,
  });
  toast.success("Food deleted successfully");
};
