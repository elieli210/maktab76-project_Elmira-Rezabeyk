import React from "react";
import { useNavigate } from "react-router-dom";

export const Bank = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src="./assets/payment.JPG" alt="payment" />
      <button
        onClick={() => navigate("/cancel")}
        type="button"
        className="btn btn-danger"
        style={{ marginTop: "-169px", marginLeft: "811px", width: "190px" }}
      >
        انصراف
      </button>
      <button
        onClick={() => navigate("/success")}
        type="button"
        className="btn btn-primary"
        style={{ marginTop: "-217px", marginLeft: "1008px", width: "190px" }}
      >
        پرداخت
      </button>
    </div>
  );
};
