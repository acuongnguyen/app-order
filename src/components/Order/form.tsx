import OrderItem from './item'
import OrderTotal from './OrderTotal'
import { useStateValue } from '../../context/StateProvider';

const OrderBody = ({ action }: { action: any }) => {
  const [{ cartItems, orderItems }] = useStateValue();
  return (
    <div className='w-full h-full rounded-t-[2rem] backgroundColor flex flex-col' style={{ backgroundColor: 'white' }}>
      <div className='w-full h-[60vh] backgroundColor md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-hidden' style={{ backgroundColor: 'white' }}>
        {
          orderItems && orderItems.length > 0 && orderItems.map((item: any, index: number) => {
            return <OrderItem key={index} item={item} />
          })
        }
      </div>
      <OrderTotal checkoutState={action} />
    </div>
  )
}

export default OrderBody