import { BiMinus, BiPlus } from "react-icons/bi";

import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { cartItem } from "../../../types";
import { deleteCartItem, formatNumber, getFoodyById, updateCartItemQty } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";

const CartItem = ({ item }: { item: cartItem }) => {
  const [{ foodItems, cartItems }, dispatch] = useStateValue();
  const { id, fid, qty } = item;
  const foodItem = getFoodyById(foodItems, fid);
  const price = foodItem?.price || 0;
  const formattedPrice = formatNumber(price);

  return (
    <>
      <div className="w-full p-1 px-2 rounded-lg backgroundColor hover:shadow-md flex items-center justify-between gap-2 cursor-pointer " style={{ backgroundColor: 'white ' }}>
        <div className=" flex items-center gap-2">
          <img
            src={foodItem?.imageUrl}
            alt=""
            className="w-20 h-20 max-w-[60px] rounded-full object-contain"
          />

          <div className="flex flex-col gap-0 ">
            <p className="text-base ">{foodItem?.name}</p>
            <p className="text-sm block text-base font-semibold">
              {formattedPrice} <span className="text-xs text-red-600">đ</span>
            </p>
          </div>
        </div>

        <div className="flex flex-row">
          <motion.div
            className="w-6 h-6 rounded-full flex items-center justify-center backgroundColor"
            whileTap={{ scale: 0.75 }}
            onClick={qty > 1 ? () => updateCartItemQty(cartItems, foodItems, item, dispatch, -1) : () => { }}
            style={{ backgroundColor: '#EBEBEB' }}
          >
            <BiMinus className="text-base" />
          </motion.div>
          <p className="text-lg font-semibold w-6 h-6 ml-2 mr-2 rounded-sm backgroundColor flex items-center justify-center cursor-default" style={{ backgroundColor: 'white' }}>
            {qty}
          </p>
          <motion.div
            className="w-6 h-6 rounded-full flex items-center justify-center backgroundColor"
            whileTap={{ scale: 0.75 }}
            onClick={() => updateCartItemQty(cartItems, foodItems, item, dispatch, 1)}
            style={{ backgroundColor: '#EBEBEB' }}
          >
            <BiPlus className="text-base" />
          </motion.div>
        </div>

        <motion.div
          whileTap={{ scale: 0.75 }}
          className="text-sm text-gray-50 w-6 h-6 rounded-lg bg-cartNumBg flex items-center justify-center"
          onClick={() => deleteCartItem(cartItems, foodItems, item, dispatch)}
        >
          <MdDelete />
        </motion.div>
      </div>
      <div className="w-full border-b border-gray-300 my-"></div>
    </>
  );
};

export default CartItem;
