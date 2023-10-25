import { useStateValue } from "../../context/StateProvider";
import OrderBody from "./form";
import OrderHeader from "./header";
import { motion } from "framer-motion";
import EmptyOrder from "../EmptyOrder";
import NotFound from "../NotFound";
import Checkout from "../Checkout";
import { useState } from "react";
const Order = () => {
  const [{ cartItems, orderItems }] = useStateValue();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  return (
    <>
      {checkoutOpen ? (
        <Checkout handler={setCheckoutOpen} />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className={`w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0`}
          >
            <OrderHeader />
            {orderItems && orderItems.length > 0 ? (
              <OrderBody action={setCheckoutOpen} />
            ) : (
              <div className="h-full w-full flex-1 flex items-center justify-center">
                <EmptyOrder />
              </div>
            )}
          </motion.div>
          {!orderItems && <NotFound text={"Cart Items not available"} />}
        </>
      )}
    </>
  );
};

export default Order;
