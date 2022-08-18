import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

export const Header = () => {
  return (
    <nav
      className="navbar "
      style={{
        backgroundColor: "rgb(238, 234, 245)",
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
        bottom: "0px",
        boxShadow: "2px 4px rgb(268, 234, 285)",
        width: "100%",
        height: "98px",
      }}
    >
      <div className="social-btns">
        <NavLink
          className="btn basket"
          to="/basket"
          style={{
            width: "126px",
            height: "84px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-24px",
          }}
        >
          <FaShoppingCart
            className="fa fa-basket"
            style={{
              top: "2px",
              position: "relative",
            }}
          />
          سبد خرید
        </NavLink>
        <NavLink
          className="btn admin"
          style={{
            top: "-59px",
            left: "171px",
            position: "relative",
            fontSize: "16px",
            textDecoration: "none",

            width: "126px",
            height: "84px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-24px",
          }}
          to="/admin"
        >
          <FiLogIn
            className="fa fa-admin"
            style={{
              top: "2px",
              position: "relative",
            }}
          />
          مدیریت
        </NavLink>
        <NavLink
          style={{
            top: "-147px",
            marginRight: "-824px",
            position: "relative",
            fontSize: "20px",
            textDecoration: "none",
            color: "#fe0883",
            fontWeight: "bold",
          }}
          to="/"
        >
          فروشگاه اینترنتی لباس الی شاپ
          <img
            src="./assets/pic8.jpg"
            alt="logo"
            width="200px"
            className="rounded"
          />
        </NavLink>
      </div>
    </nav>
  );
};
