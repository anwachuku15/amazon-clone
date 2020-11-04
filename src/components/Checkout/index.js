import React from "react";
import "./Checkout.css";
import CartItem from "../CartItem";
import Subtotal from "../Subtotal";
import { useStateValue } from "../../context/StateProvider";

const Checkout = () => {
  const [{ user, cart }] = useStateValue();

  const emailName = user && user.email.split("@");

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
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
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

export default Checkout;
