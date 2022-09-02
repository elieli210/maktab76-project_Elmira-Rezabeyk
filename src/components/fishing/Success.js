import React from "react";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src="./assets/okey.svg" alt="success icon" />
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
