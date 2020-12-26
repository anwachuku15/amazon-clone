import React from "react";
import "./Cart.css";
import CartItem from "../../components/CartItem";
import Subtotal from "../../components/Subtotal";
import { useStateValue } from "../../context/StateProvider";

const Cart = () => {
  const [{ user, cart }, dispatch] = useStateValue();

  const emailName = user && user.email.split("@");

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

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
          {cart.map((item, index) => (
            <CartItem
              key={index}
              index={index}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              removeFromCart={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Cart;
