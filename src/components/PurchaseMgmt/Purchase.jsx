import React, { useState, useEffect } from "react";
import PurchaseTable from "./PurchaseTable";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../common/Button";

const Purchase = () => {
  const token = Cookies.get("dev.admin.horeka");
  const [maxPages, setmaxPages] = useState(0);
  const [page, setPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    // axios
    //   .get(
    //     `/api/restaurants?page=${
    //       page - 1
    //     }&size=10&sortBy=name&sortDirection=asc`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) =>{
    //     setvendor(res.data.content);
    //     setmaxPages(res.data.totalPages);
    //   });
  }, [page]);
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <header className="text-3xl text-brand font-bold mb-4">Purchase</header>
      <div className="flex md:flex-row flex-col justify-between ">
        <div>
          <Button text="Add Purchase" link='/addpurchase'/>
        </div>
        <div>
          <select
            name="Status"
            id=""
            className="p-3 bg-slate-800 rounded-lg"
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="">Filter by Order Date</option>
          </select>
          <select
            name="Status"
            id=""
            className="p-3 bg-slate-800 rounded-lg"
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="">Filter by Amount</option>
          </select>
          <select
            name="Status"
            id=""
            className="p-3 bg-slate-800 rounded-lg"
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="">Descending</option>
          </select>
        </div>
      </div>
      <PurchaseTable data={vendors} />
      <div className="flex items-center justify-center mt-2 gap-2">
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page == 1 ? true : false}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>{page}</strong>
        </span>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page == maxPages ? true : false}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Purchase;
