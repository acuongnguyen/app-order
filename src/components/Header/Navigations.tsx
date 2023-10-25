import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

const Navigations = ({ direction }: { direction?: string }) => {
  const [{ showOrder, showOrderForm, cartItems }, dispatch] = useStateValue();
  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: true,
    });
  };
  const handleToggleOrder = () => {
    dispatch({
      type: "TOGGLE_ORDER_FORM",
      showOrderForm: !showOrderForm,
      showOrder: true,
    });
  };
  return (
    <div className="flex items-center gap-8">
      <motion.ul
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className={`flex items-center gap-8 ${direction && direction}`}
      >
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
        >
          <Link to={"/"}>Home</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
        >
          <Link to={"/menu"}>Menu</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
        >
          <Link to={"/about"}>About us</Link>
        </motion.li>
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out "
          onClick={handleToggleOrder}
        >Order
        </motion.div>
      </motion.ul>

      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="relative flex items-center justify-center text-textColor cart-icon-2"
        onClick={handleToggleCart}
      >
        <MdShoppingBasket className="text-2xl cursor-pointer" />
        {cartItems && (
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center cursor-pointer">
            <p className="text-sm text-white font-semibold">
              {cartItems.length}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Navigations;
