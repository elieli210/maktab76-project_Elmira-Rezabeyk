import React, { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

const URL = "http://localhost:300/files";

export const PanelProduct = () => {
  //**********************pagination************************* */

  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

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
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
    // scroll to the top
    window.scrollTo(0, 0);
  };

  return (
    <div>
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
              <thead key={i}>
                <tr id={item.id}>
                  <td>
                    <img
                      src={`${URL}/${item.thumbnail}`}
                      alt="product pictures"
                      style={{ width: "40px", height: "50px" }}
                    />
                  </td>

                  <td>{item?.name}</td>
                  {item.category === 2 && item.subcategory === 1 ? (
                    <td>{`لباس دخترانه تابستانی/تی شرت`}</td>
                  ) : item.category === 1 && item.subcategory === 12 ? (
                    <td>{`لباس زمستانی تابستانی/ هودی`}</td>
                  ) : null}

                  <td>
                    <button type="button" class="enter">
                      ویرایش
                    </button>
                    <button type="button" class="enter">
                      حذف
                    </button>
                  </td>
                </tr>
              </thead>
            ))
          : null}
      </Table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
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
