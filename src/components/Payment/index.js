import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "../../context/StateProvider";
import CartItem from "../CartItem";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "../../context/reducer";
import axios from "../../axios";
import { db } from "../../firebase";

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  useEffect(() => {
    // generate stripe secret to allow charges
    const getClientSecret = async () => {
      const res = await axios({
        method: "POST",
        // Stripe expects total in currency's subunits (dollars => cents)
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(res.data.clientSecret);
      console.log("CLIENT SECRET: ", res.data.clientSecret);
    };
    getClientSecret();
  }, [cart]);

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    console.log(user?.uid);

    // eslint-disable-next-line no-unused-vars
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          })
          .catch((err) => console.log(err.message));
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_CART",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    //   Listen for changes and display errors
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

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
            {cart.map((item, index) => (
              <CartItem
                key={index}
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
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  value={getCartTotal(cart)}
                  renderText={(value) => (
                    <div>
                      <p>
                        Subtotal ({cart.length} items): <strong>{value}</strong>
                      </p>
                    </div>
                  )}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={
                    processing || disabled || succeeded || cart.length === 0
                  }
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
