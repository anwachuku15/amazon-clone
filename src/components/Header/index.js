import React from "react";
import "./Header.css";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { auth } from "../../firebase";

const Header = () => {
  const [{ user, cart }] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  const emailName = user && user.email.split("@");

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
        <Link to={!user && "/login"} style={{ textDecoration: "none" }}>
          <div onClick={handleAuth} className="header__navOption">
            <span className="header__optionLine1">
              Hello, {user ? `${emailName[0]}` : "Guest"}
            </span>
            <span className="header__optionLine2">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link
          to={user ? "/orders" : "/login"}
          style={{ textDecoration: "none" }}
        >
          <div className="header__navOption">
            <span className="header__optionLine1">Returns</span>
            <span className="header__optionLine2">& Orders</span>
          </div>
        </Link>
        <div className="header__navOption">
          <span className="header__optionLine1">Your</span>
          <span className="header__optionLine2">Prime</span>
        </div>
        <div className="header__cart">
          <Link to="/cart" className="header__cartLink">
            <ShoppingCartOutlined />
          </Link>
          <p className="header__cartItems">{cart?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
