import { useState } from "react";
import { useStateValue } from '../../context/StateProvider';
import { formatNumber } from "../../utils/functions";

const OrderTotal = ({ checkoutState }: { checkoutState: any }) => {
  const [{ orderTotal }] = useStateValue();
  const [orderDate, setOrderDate] = useState(new Date().toLocaleDateString());
  const [orderStatus, setOrderStatus] = useState("Đang hoàn thành");
  const statusColor = orderStatus === "Đang hoàn thành" ? "#FBBC05" : orderStatus === "Đã hoàn thành" ? "#1EFF34" : "white";

  return (
    <>
      <div className='w-full mt-2 md:mt-0 flex-1 rounded backgroundColor rounded-t-[2rem] px-4 py-2 flex flex-col items-center justify-evenly' style={{ backgroundColor: '#EBEBEB' }}>
        <div className="w-full px-4">
          <div className="w-full flex items-center justify-between my-5">
            <p className="text-base md:text-lg uppercase">Tổng tiền:</p>
            <p className="text-base md:text-lg "><span className="text-sm text-red-600"></span> {formatNumber(orderTotal)}đ</p>
          </div>
          <div className="border border-gray-300"></div>
          <div className="flex mb-4 text-base justify-between my-5">
            <span>Tình trạng: </span>
            <span style={{ color: statusColor }}>{orderStatus}</span>
          </div>
        </div>
        <div className="w-full justify-between text-center items-center ">Cảm Ơn Quý Khách</div>
      </div>
    </>
  )
}

export default OrderTotal;
