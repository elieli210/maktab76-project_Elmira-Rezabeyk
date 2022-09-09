// } from "bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import { updateProduct } from "../../../redux/productSlice/ProductSlice";
import MyToast from "./MyToast";
import DeleteModal from "./ModalDelete";
import axios from "axios";

import MyToastEdit from "./MyToastEdit";
const URL = "http://localhost:300/files";
const URL_PRODUCT = "http://localhost:300/products";

export const PanelProduct = () => {
  //**********************pagination************************* */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [tempItem, setTempItem] = useState();
  const [items, setItems] = useState([]);
  const [showToastEdit, setShowToastEdit] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState();
  const [tempEdit, setTempEdit] = useState();
  const [pageCount, setpageCount] = useState(0);
  const [quantity, setQuantity] = useState();
  const [subcategory, setSubcategory] = useState(0);
  const [image, setImage] = useState([]);

  // const [src, setSrc] = useState([]);
  const dispatch = useDispatch();
  let limit = 7;
  //const URL = "http://localhost:300";
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://localhost:300/products?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };
    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://localhost:300/products?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
    window.scrollTo(0, 0);
  };

  const onImageChange = async (e) => {
    let file = e.target.files[0];
    let picture = URL.createObjectURL(file);
    setThumbnail(picture);
  };
  //////Edit save//////
  const handleSave = () => {
    let newProduct = {
      id: tempEdit,
      name: name,
      category: category,
      subcategory: subcategory,
      description: description,
      quantity: quantity,
      price: price,
      thumbnail: thumbnail,
    };
    dispatch(updateProduct(newProduct));
    setTimeout(() => {
      setShowToastEdit(true);
      setTimeout(() => setShowToastEdit(false), 3000);
    }, 1000);
    setShowStore(false);
  };
  //////Edit//////
  const handleEdit = (id) => {
    setTempEdit(id);
    setShowStore(true);
    if (id) {
      axios
        .get(`${URL_PRODUCT}/${id}`)
        .then((response) => {
          if (response.data !== null) {
            setName(response.data.name);
            setPrice(response.data.price);
            setCategory(response.data.category);
            setThumbnail(response.data.thumbnail);
            setDescription(response.data.description);
            setQuantity(response.data.quantity);
            setSubcategory(response.data.subcategory);
          }
        })
        .catch((error) => {
          console.log("Error" + error);
        });
    }
  };

  const handleDeletModal = (item) => {
    setTempItem(item);
    setIsModalOpen(true);
  };
  const resetInputs = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setThumbnail("");
    setQuantity("");
    setSubcategory("");
  };
  return (
    <div>
      {isModalOpen && (
        <DeleteModal
          handleCancel={() => setIsModalOpen(false)}
          setIsModalOpen={setIsModalOpen}
          tempItem={tempItem}
          isModalOpen={isModalOpen}
          setShowToast={setShowToast}
        />
      )}
      <div style={{ display: showToast ? "block" : "none" }}>
        <MyToast
          show={showToast}
          message={"🦄محصول مورد نظر با موفقیت پاک شد."}
          type={"danger"}
        />
      </div>
      <div style={{ display: showToastEdit ? "block" : "none" }}>
        <MyToastEdit
          show={showToastEdit}
          message={"🦄محصول مورد نظر با موفقیت تغییر کرد."}
          type={"danger"}
        />
      </div>

      {!showStore && (
        <Table
          striped
          bordered
          hover
          size="sm"
          className="w-50 p-3 text-center"
          style={{ margin: " 50px 330px" }}
        >
          <thead>
            <tr className="bg-light">
              <th>تصویر</th>
              <th>نام کالا</th>
              <th>دسته بندی</th>
              <th>ویرایش-حذف</th>
            </tr>
          </thead>
          {items.length > 0
            ? items?.map((item, i) => (
                <>
                  <thead key={i}>
                    <tr id={item.id}>
                      <td>
                        {/* {item.id < 21 ? ( */}
                        <img
                          src={`${URL}/${item.thumbnail}`}
                          alt=" تصویر کالا"
                          style={{ width: "40px", height: "50px" }}
                        />
                        {/* ) : (
                          <img
                            alt="تصویر کالا"
                            src={`${item.thumbnail}`}
                            style={{ width: "40px", height: "50px" }}
                          />
                        )} */}
                      </td>
                      <td>{item?.name}</td>
                      {item.category === 2 && item.subcategory === 3 ? (
                        <td>{`لباس دخترانه تابستانی/تی شرت`}</td>
                      ) : item.category === 3 && item.subcategory === 4 ? (
                        <td>{`لباس  دخترانه زمستانی / هودی`}</td>
                      ) : item.category === 1 && item.subcategory === 1 ? (
                        <td>{`شلوار/جین `}</td>
                      ) : item.category === 1 && item.subcategory === 2 ? (
                        <td>{`شلوار/ مام فیت`}</td>
                      ) : item.category === "1" && item.subcategory === "1" ? (
                        <td>{`شلوار/جین`}</td>
                      ) : item.category === "1" && item.subcategory === "2" ? (
                        <td>{`شلوار/مام فیت`}</td>
                      ) : item.category === "2" && item.subcategory === "3" ? (
                        <td>{`لباس دخترانه تابستانی/ تی شرت`}</td>
                      ) : item.category === "3" && item.subcategory === "4" ? (
                        <td>{`لباس دخترانه زمستانی/ هودی`}</td>
                      ) : null}

                      <td
                        style={{
                          gap: "3px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          type="button"
                          className="enter"
                          onClick={(e) => {
                            handleEdit(item.id, item, e);
                            // showToastMessage();
                          }}
                        >
                          <AiFillEdit />
                        </button>

                        <button
                          type="button"
                          className="enter btn-remove"
                          onClick={() => handleDeletModal(item)}
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </td>
                    </tr>
                  </thead>
                </>
              ))
            : null}
        </Table>
      )}
      <div>
        {showStore ? (
          <div
            className="container1 enter "
            style={{ position: "relative", left: "-318px" }}
          >
            <div className="rowExplaine">
              <div style={{ display: "flex", gap: "30px" }}>
                <p>ویرایش کالا</p>
                <div
                  style={{
                    position: "relative",
                    left: "-540px",
                  }}
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
                style={{ left: "-107px", position: "relative" }}
                defaultValue={thumbnail}
                type="file"
                placeholder="تصویر کالا"
                accept="image/*"
                onChange={(event) => {
                  onImageChange(event);
                }}
              />

              <img
                style={{
                  left: "-70px",
                  position: "relative",
                  width: "50px",
                  height: "50px",
                }}
                src={`${URL}/${thumbnail}`}
                alt="تصویر کالا"
              />
              <p>نام کالا</p>
              <input
                defaultValue={name}
                required
                type="text"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <p>موجودی</p>
            <input
              defaultValue={quantity}
              required
              type="text"
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
            <p>دسته بندی</p>
            <select
              name="category"
              className="categoryInput"
              placeholder="دسته بندی"
              id={""}
              required
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option value={1} defaultValue={category} className="pant-fit">
                شلوار
              </option>
              <option value={2} defaultValue={category} className="t-shirt">
                لباس دخترانه تابستانی
              </option>
              <option value={3} defaultValue={category} className="hoodi">
                لباس دخترانه زمستانی
              </option>
            </select>
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
              <option value={1} className="pant">
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

            <p>قیمت کالا</p>
            <input
              defaultValue={price}
              required
              type="text"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <p>توضیحات</p>
            {/* -------------------------Text Edditor----------------------  */}
            <div dir="rtl" className="App" style={{ marginBottom: "20px" }}>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onReady={(editor) => {}}
                onChange={(event, editor) => {
                  const data = editor.getData();
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
              />
            </div>
            <Button
              size="sm"
              variant="success"
              type="submit"
              className="btn-save enter"
              onClick={(event) => {
                handleSave(event);
              }}
            >
              <FontAwesomeIcon icon={faSave} />
              ذخیره
            </Button>
            <Button
              size="sm"
              variant="info"
              type="reset"
              onClick={(e) => resetInputs(e)}
            >
              <FontAwesomeIcon icon={faUndo} /> ریست
            </Button>
          </div>
        ) : null}
      </div>
      <ReactPaginate
        previousLabel={"قبلی"}
        nextLabel={"بعدی"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};
