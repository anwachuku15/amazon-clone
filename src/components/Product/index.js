import React from "react";
import "./Product.css";
import { useStateValue } from "../../context/StateProvider";

const Product = ({ id, title, image, price, rating }) => {
  const [state, dispatch] = useStateValue();

  const addToCart = () => {
    console.log(state);
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span
                key={i}
                className="product__ratingStar"
                role="img"
                aria-label="star"
              >
                🌟
              </span>
            ))}
        </div>
      </div>
      <img src={image} alt="" className="product__image" />
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
};

export default Product;
