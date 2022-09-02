import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalOrder({ tempItem, showModal, handleCancel }) {
  console.log("tempItem", tempItem);
  return (
    <Modal show={showModal} onHide={handleCancel} dir={"rtl"}>
      <Modal.Header closeButton style={{ gap: "280px" }}>
        <Modal.Title>نمایش سفارش </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <>
          <p>
            نام مشتری: {tempItem.username} {tempItem.lastname}
          </p>
          <p>آدرس:{tempItem.address}</p>
          <p>تلفن:{tempItem.phone}</p>
          <p>زمان تحویل:{tempItem.expectAt}</p>
          <p>زمان سفارش:{tempItem.createdAt}</p>{" "}
        </>

        <Table>
          <thead>
            <tr className="bg-light">
              <th> کالا</th>
              <th> قیمت</th>
              <th>تعداد</th>
            </tr>
          </thead>
          {tempItem.products.map((elem) => {
            return (
              <thead key={elem.id}>
                <tr>
                  <td>{`${elem.name}`}</td>
                  <td>{`${elem.price}`}</td>
                  <td>{`${elem.count}`}</td>
                </tr>
              </thead>
            );
          })}
        </Table>
      </Modal.Body>

      <Modal.Footer style={{ gap: "305px" }}>
        <Button variant="secondary">تحویل شد</Button>
        <Button variant="danger" onClick={(e) => handleCancel(e)}>
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOrder;
