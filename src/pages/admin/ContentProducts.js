import React, { useEffect, useState } from "react";
import { PanelProduct } from "./content-panels/PanelProduct";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProduct,
} from "../../redux/productSlice/ProductSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyToastAdd from "./content-panels/MyToastAdd";
import axios from "../../api/http";
export const ContentProducts = () => {
  const [showStore, setShowStore] = useState(false);
  //const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("");
  const [categoryErr, setCategoryErr] = useState("");
  const [subcategory, setSubcategory] = useState(0);

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [price, setPrice] = useState();
  const [pirceErr, setPriceErr] = useState("");
  const { product } = useSelector((store) => store.product);
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailErr, setThumbnailErr] = useState("");
  const [id, setId] = useState(20);
  const [showToastAdd, setShowToastAdd] = useState(false);
  const [quantity, setQuantity] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, []);
  //////images
  /////////
  // const URL_IMAGE = "http://localhost:300/files";

  const onImageChange = async (e) => {
   
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axios.post("/upload", formData).then((res) => {
      return setThumbnail(res.data.filename);
    });
  };
   // const [file] = event.target.files;
    // setImg(URL.createObjectURL(file));
    // if (event.target.value === "") {
    //   setImgErr("این قسمت نمی تواند خالی باشد");
    // } else {
    //   setImgErr("");
    // }
    /////////// ine
    //   let file = event.target.files[0];
    //   let picture = URL.createObjectURL(file);
    //   setThumbnail(picture);
    //   if (event.target.value === "") {
    //     setThumbnailErr("این فیلد نمی تواند خالی باشد");
    //   }
    // };
    //console.log(thumbnail);
  const handleName = (event) => {
    setName(event.target.value);
    if (/\d/.test(name)) {
      setNameErr(".نام نباید شامل اعداد باشد");
    } else if (event.target.value === "") {
      setNameErr("این قسمت نمی تواند خالی باشد");
    } else if (name.length <= 2) {
      setNameErr(" طول کاراکتر وارد شده کوتاه است");
    } else {
      setNameErr("");
    }
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "") {
      setCategoryErr("این قسمت نمی تواند خالی باشد");
    } else {
      setCategoryErr("");
    }
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
    if (event.target.value.length <= 2) {
      setPriceErr(" طول کاراکتر وارد شده کوتاه است");
    } else if (event.target.value === "") {
      setPriceErr("این قسمت نمی تواند خالی باشد");
    } else {
      setPriceErr("");
    }
  };
  const handleSave = (event) => {
    ////post method
    // event.preventDefault();

    setId((prevCount) => prevCount + 1);
    let newProduct = {
      //id: id,
      name: name,
      price: price,
      category: category,
      subcategory: subcategory,
      description: description,
      thumbnail: thumbnail,
      quantity: quantity,
    };
    dispatch(createProduct(newProduct));

    dispatch(getProduct());

    setShowStore(false);
    setTimeout(() => {
      setShowToastAdd(true);
      setTimeout(() => setShowToastAdd(false), 3000);
      dispatch(getProduct());
    }, 1000);
  };
  const isValid =
    nameErr === "" &&
    descriptionErr === "" &&
    categoryErr === "" &&
    thumbnailErr === "" &&
    name !== "" &&
    category !== "" &&
    subcategory !== "" &&
    quantity !== "" &&
    price !== "";
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
        <button
          type="button"
          className="enter"
          style={{ padding: "2px 16px" }}
          onClick={(e) => {
            setShowStore(true);
          }}
        >
          افزودن کالا
        </button>
      </div>
      <div>
        <div style={{ display: showToastAdd ? "block" : "none" }}>
          <MyToastAdd
            show={showToastAdd}
            message={"🦄محصول مورد نظر با موفقیت اضافه گردید."}
            type={"danger"}
          />
        </div>
        {showStore ? (
          <div
            className="container1 enter "
            style={{ position: "relative", left: "-318px" }}
          >
            <div className="rowExplaine">
              <div style={{ display: "flex", gap: "30px" }}>
                <p>افزودن کالا</p>
                <div
                  className="butCancel"
                  onClick={() => {
                    setShowStore(false);
                  }}
                  style={{
                    position: "relative",
                    left: "-540px",
                  }}
                >
                  X
                </div>
              </div>
              <p>تصویر کالا</p>

              <input
                style={{ left: "-10px", position: "relative" }}
                type="file"
                placeholder="تصویر کالا"
                accept="image/*"
                onChange={(e) => {
                  onImageChange(e);
                }}
              />
              <img
                style={{
                  left: "-70px",
                  position: "relative",
                  width: "50px",
                  height: "50px",
                }}
                src={thumbnail}
                alt="پیش فرض"
                required
              />
              <p>نام کالا</p>
              <input
                value={name}
                required
                type="text"
                onChange={(event) => {
                  handleName(event);
                }}
              />
              <p>{nameErr}</p>
            </div>
            <p>دسته بندی</p>
            <select
              name="category"
              className="categoryInput"
              placeholder="دسته بندی"
              id={""}
              required
              //value={genre1}
              onChange={(event) => {
                handleCategory(event);
              }}
            >
              <option value={1} defaultValue={category} className="">
                شلوار
              </option>

              <option value={2} defaultValue={category} className="">
                لباس دخترانه تابستانی{" "}
              </option>
              <option value={3} defaultValue={category} className="">
                لباس دخترانه زمستانی{" "}
              </option>
            </select>
            <p>{categoryErr}</p>
            <select
              name="subcategory"
              className="subcategoryInput"
              placeholder="زیر دسته بندی"
              id={""}
              required
              onChange={(event) => {
                setSubcategory(event.target.value);
              }}
            >
              <option value={1} defaultValue={subcategory} className="pant">
                جین
              </option>
              <option value={2} defaultValue={subcategory} className="pant-fit">
                مام فیت
              </option>
              <option value={3} defaultValue={subcategory} className="t-shirt">
                تی شرت
              </option>
              <option value={4} defaultValue={subcategory} className="hoodi">
                هودی
              </option>
            </select>
            <p>موجودی</p>
            <input
              defaultValue={quantity}
              required
              type="text"
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
            <p>قیمت کالا</p>
            <input
              value={price}
              required
              type="text"
              onChange={(event) => {
                handlePrice(event);
              }}
            />
            <p>توضیحات</p>
            {/* -------------------------Text Edditor----------------------  */}
            <CKEditor
              required
              editor={ClassicEditor}
              data={description}
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                // const data = editor.getData();
                // console.log({ event, editor, data });
                setDescription(editor.getData());
                // if (event.target.value.length < 2) {
                //   setDescriptionErr(" طول کاراکتر وارد شده کوتاه است");
                // } else if (event.target.value === "") {
                //   setDescriptionErr("این قسمت نمی تواند خالی باشد");
                // } else {
                //   setDescriptionErr("");
                // }
              }}
              onBlur={(event, editor) => {
                console.log("blure", editor);
              }}
              onFocus={(event, editor) => {
                console.log("focus", editor);
              }}
            />
            <p>{descriptionErr}</p>
            <button
              disabled={!isValid}
              onClick={(event) => {
                handleSave(event);
              }}
              className="btn-save enter"
            >
              ذخیره
            </button>
          </div>
        ) : null}
      </div>
      {!showStore && <PanelProduct />}
    </motion.div>
  );
};
