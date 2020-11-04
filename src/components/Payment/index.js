import React from "react";
import { useStateValue } from "../../context/StateProvider";
import CartItem from "../CartItem";

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div className="payment">
      <div className="payment__container">
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
            <h3></h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
