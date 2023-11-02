import { cartItem } from "../../../types";
import { formatNumber, getFoodyById } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";

const OrderItem = ({ item }: { item: cartItem }) => {
  const [{ foodItems, cartItems, orderItems }, dispatch] = useStateValue();
  const { id, fid, qty } = item;
  const foodItem = getFoodyById(foodItems, fid);
  const price = foodItem?.price || 0;
  const formattedPrice = formatNumber(price);
  return (
    <>
      <div className="w-full p-1 px-2 rounded-lg backgroundColor hover:shadow-md flex items-center justify-between gap-2 cursor-pointer" style={{ backgroundColor: 'white' }}>
        <div className=" flex items-center  gap-2 px-2">
          <img
            src={foodItem?.imageUrl}
            alt=""
            className="w-20 h-20 max-w-[60px] rounded-full object-contain"
          />
          <div className="flex flex-col gap-0 ">
            <p className="text-base ">{foodItem?.name}</p>
            <p className="text-sm block text-gray-1 font-semibold">
              {formattedPrice}<span className="text-xs text-red-600">đ</span>
            </p>
          </div>
        </div>
        <div className="group flex items-center gap-2  cursor-pointer px-5" >
          <p className="text-sm text-base w-15 h-5 backgroundColor rounded-sm bg-cartBg flex items-center justify-center cursor-default" style={{ backgroundColor: 'white' }}>
            SL: {qty}
          </p>
        </div>

      </div>
      <div className="border"></div>
    </>
  );
};

export default OrderItem;