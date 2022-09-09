import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete({
  tempItem,
  setIsModalOpen,
  isModalOpen,
  setShowToast,
  handleCancel,
}) {
  const handleRemove = (id) => {
    const carts = JSON.parse(localStorage.getItem("cartItems"));
    const filtered = carts.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(filtered));
    setIsModalOpen(false);
    JSON.parse(localStorage.getItem("cartItems"));
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
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

export default ModalDelete;
