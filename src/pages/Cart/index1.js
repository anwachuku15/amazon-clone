import React, { forwardRef, useEffect, useState, useCallback } from "react";
import "./Checkout.css";
import CartItem from "../CartItem";
import Subtotal from "../Subtotal";
import { useStateValue } from "../../context/StateProvider";
import FlipMove from "react-flip-move";
import throttle from "lodash/throttle";

const Checkout = () => {
  const [{ user, cart }, dispatch] = useStateValue();
  const [cartItems, setCartItems] = useState([].concat(cart));

  const emailName = user && user.email.split("@");

  const removeFromCart = (index, id) => {
    const originalCart = cartItems.slice();
    originalCart.splice(index, 1);
    const newCart = [].concat(originalCart);
    setCartItems(newCart);
  };

  // setTimeout(() => {
  //   dispatch({
  //     type: "REMOVE_FROM_CART",
  //     id: id,
  //   });
  // }, 500);

  const FlipCart = forwardRef((props, ref) => (
    <div ref={ref}>
      <CartItem
        index={props.index}
        id={props.id}
        title={props.title}
        image={props.image}
        price={props.price}
        rating={props.rating}
        removeFromCart={throttle(
          () => removeFromCart(props.index, props.id),
          800
        )}
      />
    </div>
  ));

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src={require("../../assets/img/ad.jpg")}
          alt=""
          className="checkout__ad"
        />

        <div>
          <h3>Hello, {user ? emailName[0] : "Guest"}</h3>
          <h2 className="checkout__title">Your shopping cart</h2>
          <FlipMove
            staggerDurationBy="100"
            duration={500}
            enterAnimation="accordionVertical"
            leaveAnimation="accordionVertical"
            typeName="ul"
          >
            {cartItems.map((item, index) => (
              <FlipCart
                key={index}
                index={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </FlipMove>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
