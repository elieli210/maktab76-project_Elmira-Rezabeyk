import React from "react";
import { NavLink } from "react-router-dom";

export const HeaderSecond = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "blue" : "black",
      textDecoration: "none",
      padding: "20px",
    };
  };

  return (
    <div
      className=" "
      style={{
        backgroundColor: "rgb(238, 234, 245)",
        display: "flex",
        gap: "110px",
        alignItems: "center",
        justifyContent: "center",
        bottom: "0px",
      }}
    >
      <NavLink to="/" style={navLinkStyles}>
        بازگشت به سایت
      </NavLink>
      <NavLink to="order" style={navLinkStyles}>
        سفارش ها
      </NavLink>
      <NavLink to="stocks" style={navLinkStyles}>
        موجودی و قیمت ها
      </NavLink>

      <NavLink to="products" style={navLinkStyles}>
        کالاها
      </NavLink>

      <h4>پنل مدیریت فروشگاه الی شاپ</h4>
    </div>
  );
};
