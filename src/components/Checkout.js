import React from "react";
import "./Checkout.css";
import CartItem from "./CartItem";
import Subtotal from "./Subtotal";

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src={require("../assets/img/ad.jpg")}
          alt=""
          className="checkout__ad"
        />

        <div>
          <h2 className="checkout__title">Your shopping cart</h2>
          <Subtotal />
          <CartItem />
        </div>
      </div>

      <div className="checkout__right">
        <h2>Subtotal & items</h2>
      </div>
    </div>
  );
};

export default Checkout;
