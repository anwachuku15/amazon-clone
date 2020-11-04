import React from "react";
import "./CartItem.css";

const CartItem = ({
  index,
  id,
  image,
  title,
  price,
  rating,
  removeFromCart,
}) => {
  return (
    <div className="cartItem">
      <img src={image} alt="" className="cartItem__image" />
      <div className="cartItem__info">
        <p className="cartItem__title">{title}</p>
        <p className="cartItem__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="cartItem__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span
                key={i}
                className="cartItem__ratingStar"
                role="img"
                aria-label="star"
              >
                🌟
              </span>
            ))}
        </div>
        <button onClick={removeFromCart}>Remove from Cart</button>
      </div>
    </div>
  );
};

export default CartItem;
