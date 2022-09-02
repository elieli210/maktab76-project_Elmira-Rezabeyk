import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const BasketShopping = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p>سبد خرید</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/formFinalize")}
      >
        نهایی کردن سبد خرید
      </button>
    </motion.div>
  );
};
