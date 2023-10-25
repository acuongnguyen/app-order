import { motion } from "framer-motion";
import ReactDOM from 'react-dom';
import { Logo } from "../Assets";

const productIcon = (
  <div>
    <img src={Logo} alt="Logo" width="48" height="48" />
  </div>
);

export const animateProductToCart = (product: HTMLElement | null, imageUrl: string, name: string) => {
  const isMobile = window.innerWidth < 768; 
  const cartIcon = document.querySelector('.cart-icon');
  const cartIcon2 = document.querySelector('.cart-icon-2');
  
  if (cartIcon && cartIcon2 && product) {
    const productBounds:DOMRect  = product.getBoundingClientRect();
    const cartBounds:DOMRect = cartIcon.getBoundingClientRect();
    const cartBounds2:DOMRect = cartIcon2.getBoundingClientRect();

    let xOffset, yOffset;

    if (isMobile) {
      xOffset = cartBounds.left - productBounds.left + cartBounds.width / 2;
      yOffset = cartBounds.top - productBounds.top + cartBounds.height / 2 - 100;
    } else {
      xOffset = cartBounds2.left - productBounds.left;
      yOffset = cartBounds2.top - productBounds.top - 50;
    }

    const productAnimation = {
      x: xOffset,
      y: yOffset,
      opacity: [1, 0],
      scale: [0.5, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    };

    const onAnimationComplete = () => {
      ReactDOM.unmountComponentAtNode(animatedProductContainer);
      document.body.removeChild(animatedProductContainer);
    };

    const animatedProduct = (
      <motion.div
        initial={{ opacity: 1 }}
        animate={productAnimation}
        exit={{ opacity: 0 }}
        onAnimationComplete={onAnimationComplete}
        style={{
          position: "fixed",
          zIndex: 999,
          left: productBounds.left,
          top: productBounds.top,
        }}
      >
      {productIcon}
    </motion.div>
    );

    const animatedProductContainer = document.createElement('div');
    document.body.appendChild(animatedProductContainer);
    ReactDOM.render(animatedProduct, animatedProductContainer);
  }
};
