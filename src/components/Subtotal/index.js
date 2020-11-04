import React from "react";
import "./Subtotal.css";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../context/StateProvider";
import { getCartTotal } from "../../context/reducer";

const Subtotal = () => {
  const history = useHistory();
  const [{ cart }] = useStateValue();

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
      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
