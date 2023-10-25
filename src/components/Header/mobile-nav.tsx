import { MdOutlineRestaurantMenu, MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { Logo } from "../Assets";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

const MobileNav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const [{ showContractForm, showOrderForm, showCart, cartItems }, dispatch] = useStateValue();
  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: !showCart,
    });
  };
  const handleToggleOrder = () => {
    dispatch({
      type: "TOGGLE_ORDER_FORM",
      showOrderForm: !showOrderForm,
    });
  };
  
  return (
    <div className="flex flex-col bg-cardOverlay backdrop-blur-sm items-start justify-start gap-16 w-screen h-screen  overflow-y-hidden  z-50 overflow-hidden ">
      <motion.div className="flex items-center justify-end w-screen h-24  px-10">
        <motion.div
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="relative flex items-center justify-center text-textColor"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineRestaurantMenu className="text-headingColor text-4xl" />
        </motion.div>
      </motion.div>
      <div
        className={`flex items-center justify-center w-full  h-70 gap-10 flex-col`}
      >
        <Link onClick={() => setIsOpen(!isOpen)} to={'/menu'} className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          Menu
        </Link>
        <Link onClick={() => setIsOpen(!isOpen)} to={'services'} className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          Services
        </Link>
        <Link onClick={() => setIsOpen(!isOpen)} to={'/about'} className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          About
        </Link>
        <Link onClick={handleToggleOrder} to={'/order'} className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          Order
        </Link>
      </div>

      <Link
        to={"/"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center  justify-center w-full"
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={Logo} alt="Logo" className="w-16 object-cover" />
          <p className="text-headingColor text-3xl font-bold">Bentilzone</p>
        </motion.div>
      </Link>
    </div>
  );
};

export default MobileNav;
