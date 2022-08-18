import React from "react";
//import { HeaderSecond } from "../header/HeaderSecond";
import { PanelProduct } from "./content-panels/PanelProduct";
import { motion } from "framer-motion";

export const ContentProducts = () => {
  return (
    <motion.div
      dir="rtl"
      className="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="d-flex justify-content-between my-2 mx-3">
        <h4 className="m-3"> مدیریت کالاها</h4>
        <button class="enter" style={{ padding: "2px 16px" }}>
          افزودن کالا
        </button>
      </div>

      <PanelProduct />
    </motion.div>
  );
};
