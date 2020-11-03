import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";

const Subtotal = ({ cart }) => {
  const getCartTotal = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    return total;
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        value={getCartTotal(cart)}
        renderText={(value) => (
          <div>
            <p>
              Subtotal ({cart.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift{" "}
            </small>
          </div>
        )}
        decimalScale={2}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
