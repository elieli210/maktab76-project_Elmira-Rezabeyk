import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/orderSlice/OrderSlice";

export const Success = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [product, setProduct] = useState();
  const dispatch = useDispatch();

  //setProduct(JSON.parse(localStorage.getItem("cartItems")));

  // (data>0 && data!== undefined && product>0 && product !== undefined) &&
  // if (data && product) {
  //   let obj = {
  //     username: data.username,
  //     lastname: data.latname,
  //     address: data.address,
  //     phone: data.phone,
  //     expectAt: data.expectAt,
  //     products: [
  //       // {
  //       //   id: product.id,
  //       //   name: product.name,
  //       //   count: product.quantity,
  //       //   price: product.price,
  //       //   image: product.thumbnail,
  //       // },
  //     ],
  //     // prices: product.quantity * product.price,
  //     delivered: "true",
  //   };
  // } else {
  //   console.log("obj");
  // }

  //dispatch(createOrder(obj));
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("formInput")));
  }, []);
  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  //setData(JSON.parse(localStorage.getItem("formInput")));

  let obj = {
    //username: data?.username,
    // lastname: data?.lastname,
    // address: data?.address,
    // phone: data?.phone,
    // expectAt: data?.expectAt,
    // products: [
    //   {
    //     id: product?.id,
    //     name: product?.name,
    //     count: product?.quantity,
    //     price: product?.price,
    //     image: product?.thumbnail,
    //   },
    //],
    // prices: product.quantity * product.price,
    delivered: "true",
  };
  // console.log("data", data.username);
  console.log("obj", obj);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src="./assets/okey.svg" alt="success icon" className=" mt-5" />
      <p>پرداخت شما با موفقیت ثبت گردید.</p>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => navigate("/")}
      >
        بازگشت به سایت
      </button>
    </div>
  );
};
