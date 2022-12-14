import { CKEditor } from "@ckeditor/ckeditor5-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  createProduct,
  getProduct,
} from "../../../redux/productSlice/ProductSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosInstance from "../../../api/http";
import { unwrapResult } from "@reduxjs/toolkit";
//import defaultImg from "../../../assets/pic/icon2.png";

function ModalAdd({
  showStore,
  setShowStore,
  handleCancel,
  setShowToastAdd,
  currentPage,
  fetchProducts,
}) {
  const defaultImg = "41cfdff705619935d61b721da4dffab7";
  const [category, setCategory] = useState(0);
  const [categoryErr, setCategoryErr] = useState("");
  const [subcategory, setSubcategory] = useState(0);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [price, setPrice] = useState();
  const [pirceErr, setPriceErr] = useState("");
  const [thumbnail, setThumbnail] = useState(defaultImg);
  const [thumbnailErr, setThumbnailErr] = useState("");
  const [id, setId] = useState(20);
  const [quantity, setQuantity] = useState();
  const [image, setImage] = useState([defaultImg]);
  console.log(image);
  console.log(thumbnail);
  const dispatch = useDispatch();
  const URL = "http://localhost:300/files";

  const resetInputs = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setThumbnail("");
    setQuantity("");
    setSubcategory("");
    setImage([]);
    setThumbnailErr("");
    setThumbnailErr("");
    setDescriptionErr("");
  };

  ///////add/////
  const onImageChange = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setThumbnail(res.data.filename);
    });
  };
  const handleName = (event) => {
    setName(event.target.value);
    if (/\d/.test(name)) {
      setNameErr(".?????? ?????????? ???????? ?????????? ????????");
    } else if (event.target.value === "") {
      setNameErr("?????? ???????? ?????? ?????????? ???????? ????????");
    } else if (name.length <= 2) {
      setNameErr(" ?????? ?????????????? ???????? ?????? ?????????? ??????");
    } else {
      setNameErr("");
    }
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "") {
      setCategoryErr("?????? ???????? ?????? ?????????? ???????? ????????");
    } else {
      setCategoryErr("");
    }
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
    if (event.target.value.length <= 2) {
      setPriceErr(" ?????? ?????????????? ???????? ?????? ?????????? ??????");
    } else if (event.target.value === "") {
      setPriceErr("?????? ???????? ?????? ?????????? ???????? ????????");
    } else {
      setPriceErr("");
    }
  };
  const handleSave = () => {
    //setId((prevCount) => prevCount + 1);
    let newProduct = {
      name: name,
      price: price,
      category: Number(category),
      subcategory: Number(subcategory),
      description: description,
      thumbnail: thumbnail,
      quantity: quantity,
      image: image,
    };
    dispatch(createProduct(newProduct))
      .then(unwrapResult)
      .then(() => {
        fetchProducts(currentPage);
        handleCancel();
      })
      .catch((e) => {
        console.log(e?.Message);
      });
    dispatch(getProduct());

    setShowStore(false);
    setTimeout(() => {
      setShowToastAdd(true);
      setTimeout(() => setShowToastAdd(false), 3000);
      dispatch(getProduct());
    }, 1000);
  };

  const onBigImageChange = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setImage([res.data.filename]);
    });
  };
  const isValid =
    nameErr === "" &&
    pirceErr === "" &&
    descriptionErr === "" &&
    categoryErr === "" &&
    thumbnailErr === "" &&
    name !== "" &&
    category !== "" &&
    subcategory !== "" &&
    quantity !== "" &&
    price !== "";
  return (
    <Modal show={showStore} onHide={handleCancel} className="g-5 " dir="rtl">
      <Modal.Header
        closeButton
        className="enter"
        style={{ display: "flex", gap: "311px" }}
      >
        <Modal.Title>???????????? ????????</Modal.Title>
      </Modal.Header>

      <Modal.Body className="enter">
        <div className="rowExplaine ">
          <p>?????????? ???????? ????????</p>
          <input
            style={{ left: "-129px", position: "relative" }}
            type="file"
            placeholder="?????????? ????????"
            accept="image/*"
            onChange={(event) => {
              onImageChange(event);
            }}
          />

          <img
            style={{
              left: "-37px",
              position: "relative",
              width: "50px",
              height: "50px",
            }}
            src={`${URL}/${thumbnail}`}
            alt=" "
          />
          <p>?????????? ???????? ????????</p>
          <input
            style={{ left: "-129px", position: "relative" }}
            type="file"
            placeholder="?????????? ????????"
            accept="image/*"
            onChange={(event) => {
              onBigImageChange(event);
            }}
          />

          <img
            style={{
              left: "-37px",
              position: "relative",
              width: "50px",
              height: "50px",
            }}
            src={`${URL}/${image}`}
            alt=" "
          />

          <p>?????? ????????</p>
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
        <p>????????????</p>
        <input
          defaultValue={quantity}
          required
          type="text"
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <p>???????? ????????</p>
        <select
          name="category"
          className="categoryInput"
          placeholder="???????? ????????"
          id={""}
          required
          onChange={(event) => {
            handleCategory(event);
          }}
        >
          <option value={1} defaultValue={category} className="pant-fit">
            ??????????
          </option>
          <option value={2} defaultValue={category} className="t-shirt">
            ???????? ?????????????? ????????????????
          </option>
          <option value={3} defaultValue={category} className="hoodi">
            ???????? ?????????????? ??????????????
          </option>
        </select>
        <select
          name="subcategory"
          className="subcategoryInput"
          placeholder="?????? ???????? ????????"
          id={""}
          required
          onChange={(event) => {
            setSubcategory(event.target.value);
          }}
        >
          <option value={1} defaultValue={subcategory} className="pant">
            ??????
          </option>
          <option value={2} defaultValue={subcategory} className="pant-fit">
            ?????? ??????
          </option>
          <option value={3} defaultValue={subcategory} className="t-shirt">
            ???? ??????
          </option>
          <option value={4} defaultValue={subcategory} className="hoodi">
            ????????
          </option>
        </select>
        <p>???????? ????????</p>

        <input
          value={price}
          required
          type="text"
          onChange={(event) => {
            handlePrice(event);
          }}
        />
        <p>??????????????</p>
        {/* -------------------------Text Edditor----------------------  */}

        <CKEditor
          dir="rtl"
          editor={ClassicEditor}
          data={description}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            setDescription(editor.getData());

            //const data = editor.getData();
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
        <p>{descriptionErr}</p>
      </Modal.Body>

      <Modal.Footer dir="rtl" className="d-flex justify-content-between">
        <Button
          disabled={!isValid}
          size="sm"
          variant="success"
          type="submit"
          className="btn-save enter"
          onClick={() => {
            handleSave();
          }}
        >
          ??????????
        </Button>
        <Button
          size="sm"
          variant="info"
          type="reset"
          onClick={(e) => resetInputs(e)}
        >
          <FontAwesomeIcon icon={faUndo} /> ????????
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAdd;
