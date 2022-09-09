import React from "react";
import { useNavigate } from "react-router-dom";

export const NotSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src="./assets/cancel.svg" alt="not success icon" className=" mt-5" />
      <p>پرداخت شما موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است.</p>
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
