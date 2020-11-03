import React from "react";
import "./Header.css";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";

const Header = () => {
  const [{ cart }] = useStateValue();

  return (
    <div className="header">
      <Link to="/">
        <img
          src={require("../../assets/img/amazon.png")}
          alt=""
          className="header__logo"
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <Search className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__navOption">
          <span className="header__optionLine1">Hello Guest</span>
          <span className="header__optionLine2">Sign In</span>
        </div>
        <div className="header__navOption">
          <span className="header__optionLine1">Returns</span>
          <span className="header__optionLine2">& Orders</span>
        </div>
        <div className="header__navOption">
          <span className="header__optionLine1">Your</span>
          <span className="header__optionLine2">Prime</span>
        </div>
        <div className="header__cart">
          <Link to="/checkout" className="cartLink">
            <ShoppingCartOutlined />
          </Link>
          <p className="cartItems">{cart?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
