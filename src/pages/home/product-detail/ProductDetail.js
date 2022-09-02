import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../redux/productSlice/ProductSlice";
import { IoMdArrowDropleft } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../assets/style.css";

// import for swiper
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

const URL = "http://localhost:300/files";
export const ProductDetail = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  useEffect(() => {
    dispatch(getProduct());
  }, []);
  return (
    <div dir="rtl">
      {userId.length > 0
        ? product.map((item) =>
            item.id === Number(userId) ? (
              <>
                <div key={item.id} className="d-flex">
                  {/************************slider*************************/}

                  <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper"
                  >
                    {item.image.map((elem) => {
                      return (
                        <SwiperSlide key={item.id}>
                          <img src={`${URL}/${elem}`} alt="عکس کالا" />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className="mt-2 m-5 ">
                    <h4 className="py-4">{item.name}</h4>
                    <div className="py-5">
                      {item.category === 2 && item.subcategory === 4 ? (
                        <h6>
                          {`لباس دخترانه تابستانی `}
                          <IoMdArrowDropleft />
                          {`زیر گروه تی شرت`}
                        </h6>
                      ) : item.category === 3 && item.subcategory === 3 ? (
                        <h6>
                          {`لباس  دخترانه زمستانی`}
                          <IoMdArrowDropleft />
                          {`هودی`}
                        </h6>
                      ) : item.category === 1 && item.subcategory === 1 ? (
                        <h6>
                          {`شلوار`}
                          <IoMdArrowDropleft />
                          {`جین`}
                        </h6>
                      ) : item.category === 1 && item.subcategory === 2 ? (
                        <h6>
                          {`شلوار`}
                          <IoMdArrowDropleft />
                          {`مام فیت`}
                        </h6>
                      ) : item.category === "1" && item.subcategory === "1" ? (
                        <h6>
                          {`شلوار`}
                          <IoMdArrowDropleft />
                          {`جین`}
                        </h6>
                      ) : item.category === "1" && item.subcategory === "2" ? (
                        <h6>
                          {`شلوار`}
                          <IoMdArrowDropleft />
                          {`مام فیت`}
                        </h6>
                      ) : item.category === "2" && item.subcategory === "4" ? (
                        <h6>
                          {`لباس دخترانه تابستانی`}
                          <IoMdArrowDropleft />
                          {`تی شرت`}
                        </h6>
                      ) : item.category === "3" && item.subcategory === "3" ? (
                        <h6>
                          {`لباس دخترانه زمستانی`}
                          <IoMdArrowDropleft />
                          {`هودی`}
                        </h6>
                      ) : null}
                    </div>
                    <h6 className="py-3">قیمت:{item.price} تومان </h6>
                    <button className="enter">
                      افزودن به سبد خرید
                      <AiOutlinePlusCircle />
                    </button>
                    <button className="enter">راهنمای سایز لباس</button>
                  </div>
                </div>
                <p>{item.description.replace(/(<([^>]+)>)/gi, "")}</p>
              </>
            ) : null
          )
        : null}
    </div>
  );
};
