import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../redux/productSlice/ProductSlice";
import { IoMdArrowDropleft } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../assets/style.css";

// import for swiper
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { StarRating } from "./StarRating";

const URL = "http://localhost:300/files";
export const ProductDetail = () => {
  const { userId } = useParams();
  const [count, setCount] = useState(0);
  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  const decreament = () => {
    count > 0 ? setCount(count - 1) : setCount(0);
  };
  const increament = (item) => {
    count < item.quantity ? setCount(count + 1) : setCount(count);
  };

  return (
    <div dir="rtl">
      {userId.length > 0
        ? product.map((item) =>
            item.id === Number(userId) ? (
              <>
                <div key={item.id} className="d-flex rounded">
                  {/************************slider*************************/}

                  <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper "
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
                      ) : null}
                    </div>
                    <h6 className="py-3">قیمت:{item.price} تومان </h6>
                    <div className="d-flex gap-2 py-2">
                      <span className="my-2 ">تعداد: </span>
                      <button
                        className="px-3 rounded-circle border-primary"
                        onClick={() => increament(item)}
                      >
                        +
                      </button>
                      <p className="px-2 my-2 border">{count}</p>
                      <button
                        className="px-3 rounded-circle border-danger"
                        onClick={() => decreament()}
                      >
                        -
                      </button>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="enter" >
                        افزودن به سبد خرید
                        <AiOutlineShoppingCart />
                      </button>
                      <button className="enter">راهنمای سایز لباس</button>
                    </div>
                  </div>
                </div>
                <div>
                  <StarRating />
                </div>
                <p>{item.description.replace(/(<([^>]+)>)/gi, "")}</p>
              </>
            ) : null
          )
        : null}
    </div>
  );
};
