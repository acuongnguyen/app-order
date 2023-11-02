import { motion } from 'framer-motion'
import { useStateValue } from '../../context/StateProvider';
import { hideOrderform, addToOrder } from "../../utils/functions";
const CartTotal = ({ checkoutState }: { checkoutState: any }) => {
  const [{ cartItems, cartTotal, orderTotal, showOrderForm, foodItems }, dispatch] = useStateValue();
  const handleToggleOrder = () => {
    addToOrder(cartItems, foodItems, orderTotal, dispatch);
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [],
    });
    dispatch({
      type: "CLEAR_CART",
    });
    dispatch({
      type: "TOGGLE_ORDER_FORM",
      showOrderForm: !showOrderForm,
    });
  };
  return (
    <div className='w-full h-[20vh] mt-2 md:mt-0 flex-1 rounded backgroundColor rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-evenly' style={{ backgroundColor: '#EBEBEB ' }}>

      <div className="w-full flex items-center justify-between">
        <p className="text-base md:text-lg uppercase">Total:</p>
        <p className="text-base md:text-lg "><span className="text-sm text-red-600"></span> {cartTotal}đ</p>
      </div>
      <motion.button onClick={() => handleToggleOrder()} whileTap={{ scale: 0.8 }} className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg'>
        Order {cartTotal}đ
      </motion.button>
    </div>
  )
}

export default CartTotal
