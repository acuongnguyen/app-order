import CartItem from './Item'
import CartTotal from './CartTotal'
import { useStateValue } from '../../context/StateProvider';

const CartBody = ({ action }: { action: any }) => {
  const [{ cartItems }] = useStateValue();
  return (
    <div className='w-full h-full rounded-t-[2rem] backgroundColor flex flex-col' style={{ backgroundColor: 'white' }}>
      <div className='w-full h-[60vh] md:h-42 px-6 py- flex flex-col gap-3 overflow-y-scroll scrollbar-hidden'>
        {
          cartItems && cartItems.length > 0 && cartItems.map((item: any, index: number) => {
            return <CartItem key={index} item={item} />
          })
        }
      </div>
      <CartTotal checkoutState={action} />
    </div>
  )
}

export default CartBody