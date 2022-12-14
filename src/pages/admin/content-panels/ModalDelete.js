import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  getProduct,
} from "../../../redux/productSlice/ProductSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function DeleteModal({
  tempItem,
  setIsModalOpen,
  isModalOpen,
  setShowToast,
  handleCancel,
  currentPage,
  fetchProducts,
}) {

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(deleteProduct(id))
      .then(unwrapResult)
      .then(() => {
        fetchProducts(currentPage);
        //setLoading(false);
        handleCancel();
      })
      .catch((e) => {
        console.log(e?.Message);
        //setLoading(false);
      });
    dispatch(getProduct());
    setIsModalOpen(false);
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      dispatch(getProduct());
    }, 1000);
  };

  return (
    <Modal show={isModalOpen} onHide={handleCancel}>
      <Modal.Header closeButton dir={"ltr"}></Modal.Header>

      <Modal.Body dir={"rtl"}>
        <Button
          variant="danger"
          onClick={() => setIsModalOpen(false)}
        >{`آیا از پاک کردن ${tempItem.name} مطمئن هستید؟`}</Button>
      </Modal.Body>

      <Modal.Footer style={{ gap: "315px" }}>
        <Button
          variant="danger"
          onClick={(e) => {
            handleCancel(e);
          }}
        >
          انصراف
        </Button>
        <Button variant="secondary" onClick={() => handleRemove(tempItem.id)}>
          حذف
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
