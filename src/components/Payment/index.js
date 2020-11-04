import React from "react";
import "./Payment.css";
import { useStateValue } from "../../context/StateProvider";
import CartItem from "../CartItem";
import { Link } from "react-router-dom";

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{cart.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Addess</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>12538 Westland Ct</p>
            <p>Fulton, MD</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {cart.map((item) => (
              <CartItem
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">{/* STRIPE */}</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
