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
//import { editCardItems } from "../../../redux/cardItemsSlice/cardItemsSlice";
//import axios from "axios";

const URL = "http://localhost:300/files";
export const ProductDetail = () => {
  const { userId } = useParams();
  const cardFromLocalStorage = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  const [cartItems, setCartItems] = useState(cardFromLocalStorage);
  const [count, setCount] = useState(1);
  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //console.log(basket)
  const decreament = () => {
    count > 0 ? setCount(count - 1) : setCount(1);
  };
  const increament = (item) => {
    count < item.quantity ? setCount(count + 1) : setCount(count);
  };
  console.log("count", count);

  /*********************Add to Basket **********************/

  const handleBasket = (item) => {
    const exist = cartItems.find((x) => x.id === item.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === item.id ? { ...exist, quantity: exist.quantity + count } : x
        )
      );

      //////////////////////////////////////
      /* let nameItem = cartItems[0].name;
      let priceItem = cartItems[0].price;
      let quantityItem = cartItems[0].quantity;
      console.log(nameItem, "2");
      axios
        .post(`http://localhost:300/cardItems`, {
          id: item.id,
          name: nameItem,
          price: priceItem,
          quantity: quantityItem,
        })
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error.message);
        }); */
      ///////////////////////////////////////////////////
    } else {
      setCartItems([...cartItems, { ...item, quantity: count }]);
    }
  };
  console.log(cartItems);
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
                        <SwiperSlide>
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
                    <h6 className="py-3">
                      قیمت:
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      تومان
                    </h6>
                    <div className="d-flex gap-2 my-3">
                      <span className="my-2 ">تعداد: </span>
                      <button
                        className="px-3 p-2  rounded bg-info text-white border-white"
                        onClick={() => increament(item)}
                      >
                        +
                      </button>
                      <p className="px-2 my-2 border">{count}</p>
                      <button
                        className=" p-2 px-3 rounded bg-danger text-white border-white"
                        onClick={() => decreament()}
                      >
                        -
                      </button>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="enter"
                        onClick={() => {
                          handleBasket(item);
                        }}
                      >
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
