import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

export const PanelStock = () => {
  //***********************pagination*************************//

  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState();
  const [pageCount, setpageCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  let limit = 7;

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
    // scroll to the top
    window.scrollTo(0, 0);
  };
  ///////////////////
  useEffect(() => {
    const _editMode = items.some((item) => item.editMode === true);
    setEditMode(_editMode);
  }, [items]);

  function changeEditMode(item, isEditMode) {
    const index = items.findIndex((f) => f.id == item.id);
    items[index].editMode = isEditMode;

    setItems([...items]);
  }

  function setInputValue(item, input) {
    const { value } = input.target;

    const index = items.findIndex((f) => f.id == item.id);
    items[index].price = value;
    //items[index].quantity = value;

    setItems(items);
  }
  function setInputQuantity(item, input) {
    const { value } = input.target;

    const index = items.findIndex((f) => f.id == item.id);
    items[index].quantity = value;
    //items[index].quantity = value;

    setItems(items);
  }

  function save() {
    const _items = items.map((item) => ({ ...item, editMode: false }));
    setItems(_items);
  }

  return (
    <div>
      {editMode && (
        <button className="enter" onClick={() => save()} type="button">
          ذخیره
        </button>
      )}

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
            <th>کالا</th>
            <th>قیمت </th>
            <th>موجودی </th>
          </tr>
        </thead>

        {items.length > 0 &&
          items?.map((item, i) => (
            <thead key={i}>
              <tr id={item.id}>
                <td>{item?.name}</td>

                {!item.editMode && (
                  <td
                    dir="rtl"
                    onClick={() => changeEditMode(item, true)}
                  >{`${item?.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}</td>
                )}
                {item.editMode && (
                  <input
                    type="text"
                    autoFocus
                    defaultValue={item.price}
                    onChange={(e) => setInputValue(item, e)}
                    style={{
                      width: " 86px",
                      position: "relative",
                      left: "-126px",
                    }}
                    className="form-control"
                  />
                )}
                {!item.editMode && (
                  <td
                    dir="rtl"
                    onClick={() => changeEditMode(item, true)}
                  >{`${item?.quantity}`}</td>
                )}
                {item.editMode && (
                  <input
                    type="text"
                    autoFocus
                    defaultValue={item.quantity}
                    onChange={(e) => setInputValue(item, e)}
                    className="form-control"
                    style={{
                      position: "relative",
                      left: "-290px",
                      width: "32px",
                    }}
                  />
                )}
              </tr>
            </thead>
          ))}
      </Table>
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
