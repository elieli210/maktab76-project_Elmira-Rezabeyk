import { CKEditor } from "@ckeditor/ckeditor5-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { updateProduct } from "../../../redux/productSlice/ProductSlice";
import { useDispatch } from "react-redux";
function ModalEdit(props) {
  const {
   // tempItem,
    //setIsModalOpen,
    setShowStore,
    thumbnail,
    onImageChange,
    name,
    setName,
    explan,
    category,
    tempEdit,
    setCategory,
    price,
    setPrice,
    setExplan,
    setShowToastEdit,
  } = props;
  const dispatch = useDispatch();
  //const URL_PRODUCT = "http://localhost:300/products";

  //////Edit save//////
  const handleSave = () => {
    console.log("tempEdit", tempEdit);
    let newProduct = {
      id: tempEdit,
      name: name,
      category: category,
      explan: explan,
      price: price,
      thumbnail: thumbnail,
    };
    dispatch(updateProduct(newProduct));
    setShowStore(false);
    setTimeout(() => {
      setShowToastEdit(true);
      setTimeout(() => setShowToastEdit(false), 3000);
      // dispatch(getProduct());
    }, 1000);
  };
  //////Edit//////
  // const handleEdit = (id, product, e) => {
  //   console.log(id, product);
  //   setTempEdit(id);
  //   setShowStore(true);
  //   if (id) {
  //     axios
  //       .get(`${URL_PRODUCT}/${id}`)
  //       .then((response) => {
  //         if (response.data !== null) {
  //           console.log("response", response);
  //           setName(response.data.name);
  //           setPrice(response.data.price);
  //           setCategory(response.data.category);
  //           setThumbnail(response.data.thumbnail);
  //           setExplan(response.data.explan);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error" + error);
  //       });
  //   }
  // };
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>eliiii کالا</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container1">
          <div className="rowExplaine">
            <div style={{ display: "flex", gap: "30px" }}>
              <div
                className="butCancel"
                onClick={() => {
                  setShowStore(false);
                }}
              >
                X
              </div>
            </div>
            <p>تصویر کالا</p>

            <input
              value={thumbnail}
              type="file"
              placeholder="تصویر کالا"
              accept="image/*"
              onChange={(event) => {
                onImageChange(event);
              }}
            />

            <p>نام کالا</p>
            {console.log(name)}
            <input
              value={name}
              required
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <p>دسته بندی</p>
          <select
            name="category"
            className="categoryInput"
            placeholder="دسته بندی"
            id={""}
            required
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option className="">شلوار/جین</option>
            <option className="">شلوار/ مام فیت</option>
            <option className="">لباس دخترانه تابستانی/تی شرت</option>
            <option className="">لباس دخترانه زمستانی / هودی</option>
          </select>
          <p>قیمت کالا</p>

          <input
            value={price}
            defaultValue={price}
            required
            type="text"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <p>توضیحات</p>
          {/* -------------------------Text Edditor----------------------  */}
          <CKEditor
            value={explan}
            required
            editor={ClassicEditor}
            data="<p></p>"
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setExplan(event.target.value);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          className="btn-save"
          onClick={(event) => {
            handleSave(event);
          }}
        >
          ذخیره
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEdit;
