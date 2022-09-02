import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../../redux/productSlice/ProductSlice";
import { IoMdArrowDropleft } from "react-icons/io";
import { getCategory } from "../../../redux/categorySlice/categorySlice";
const URL = "http://localhost:300/files";

export const Cards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  const { category } = useSelector((store) => store.category);

  useEffect(() => {
    dispatch(getProduct());
  }, []);
  useEffect(() => {
    dispatch(getCategory());
  }, []);

 
  return (
    <div dir="rtl" className="mb-5">
      {category.map((elem) => (
        <>
          <NavLink to={`sidebar/${elem.id}`}>
            {`کالاهای گروه ${elem.name}`}
          </NavLink>
          <IoMdArrowDropleft />
          <div className="row m-2 ">
            {product.map((item) =>
              item.category === elem.id ? (
                <div
                  key={item.id}
                  className="col-sm-4 col-md-3 v my-2 shadow p-3 mb-5 bg-body rounded"
                  onClick={() => navigate(`/productDetail/${item.id}`)}
                >
                  <div
                    className="card shadow-sm w-100"
                    style={{ minHeight: 225 }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-center ">{item.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted text-center">
                        قیمت:{item.price}
                      </h6>
                      <p className="card-text">
                        <img
                          src={`${URL}/${item.thumbnail}`}
                          alt="product pictures"
                          style={{ width: "240px", height: "150px" }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </>
      ))}

     
    </div>
  );
};

