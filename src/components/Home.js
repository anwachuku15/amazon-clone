import React from "react";
import "./Home.css";
import Product from "./Product";
const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src={require("../assets/img/deliverybanner.jpg")}
          alt=""
        />

        <div className="home__row">
          <Product
            id={12345678}
            title="Macbook"
            price={1249.99}
            image={require("../assets/img/macbook.jpg")}
            rating={4}
          />
          <Product
            id={23456789}
            title="Apple Watch Series 3"
            price={169.0}
            image={require("../assets/img/applewatch.jpg")}
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id={34567891}
            title="Fitbit"
            price={199.99}
            rating={3}
            image={require("../assets/img/fitbit.jpg")}
          />
          <Product
            id={44444444}
            title="Apple AirPods Pro"
            price={219.0}
            rating={4}
            image={require("../assets/img/airpods.jpg")}
          />
          <Product
            id={33333333}
            title="Amazon Echo (3rd Generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image={require("../assets/img/echo.jpeg")}
          />
        </div>

        <div className="home__row">
          <Product
            id={22222222}
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image={require("../assets/img/ipad.jpg")}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
