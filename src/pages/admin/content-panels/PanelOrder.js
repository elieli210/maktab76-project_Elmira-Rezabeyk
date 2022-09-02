import React, { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ModalOrder from "./ModalOrder";
const URL_delivered = "http://localhost:300/orders?delivered=true";
const URL_notdelivered = "http://localhost:300/orders?delivered=false";

export const PanelOrder = () => {
  //const [value, setValue] = useState("");

  /*********************pagination*********************/
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pageCount, setpageCount] = useState(0);
  const [tempItem, setTempItem] = useState("");
  let limit = 6;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://localhost:300/orders?_page=1&_limit=${limit}`
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
      `http://localhost:300/orders?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
    // scroll to the top
    window.scrollTo(0, 0);
  };
  /**************************filtering*****************************/
  const handleChange = (event) => {
    if (event.target.value === "false") {
      const fetchData = async () => {
        const DataResource = await fetch(URL_notdelivered);
        const data = await DataResource.json();
        setItems(data);
      };
      fetchData();
    } else if (event.target.value === "true") {
      const fetchData = async () => {
        const DataResource = await fetch(URL_delivered);
        const data = await DataResource.json();
        setItems(data);
      };
      fetchData();
    }
  };
  /******************************************** */
  const handleOrdering = (item) => {
    setTempItem(item);
    setShowModal(true);
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          top: "80px",
          position: "fixed",
          left: 0,
          gap: "10px",
          margin: "8px",
        }}
       
        onChange={(event) => handleChange(event)}
      >
        <input className="px-2" value="false" type="radio" name="radio" />
        در انتظار ارسال
        <input className="px-2" value="true" type="radio" name="radio" />
        تحویل شده
      </form>
      <Table
        striped
        bordered
        hover
        size="sm"
        className="w-50 p-3 text-center"
        style={{ margin: " 50px 330px " }}
      >
        <thead>
          <tr className="bg-light">
            <th>نام کاربر</th>

            <th>مجموع مبلغ</th>
            <th>زمان ثبت سفارش</th>
            <th>بررسی سفارش ها</th>
            <th> وضعیت تحویل سفارش ها</th>
          </tr>
        </thead>

        {items.length > 0
          ? items?.map((item, i) => (
              <>
                <thead key={i}>
                  <tr id={item.id}>
                    <td>{`${item?.username} ${item?.lastname}`}</td>
                    <td>
                      {item?.prices
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>{`${new Date(item?.expectAt).toLocaleDateString(
                      "fa-IR"
                    )}`}</td>
                    <td>
                      <button
                        className="enter"
                        onClick={() => handleOrdering(item)}
                      >
                        بررسی سفارش
                      </button>
                    </td>
                    {/* <td>{item.delivered}</td> */}

                    {item.delivered === "true" ? (
                      <td> {`تحویل شده`}</td>
                    ) : (
                      <td>{` در انتظار ارسال `}</td>
                    )}
                  </tr>
                </thead>
                {showModal && (
                  <ModalOrder
                    tempItem={tempItem}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleCancel={() => setShowModal(false)}
                  />
                )}
              </>
            ))
          : null}
      </Table>
      <div
        style={{
          display: "flex",
          bottom: "0px",
          position: "fixed",
          left: "45%",
        }}
      >
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
    </div>
  );
};
