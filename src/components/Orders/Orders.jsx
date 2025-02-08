import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OrderTable from "./OrderTable";
import Datepicker from "react-tailwindcss-datepicker";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

const Orders = () => {
  const token = Cookies.get("dev.admin.horeka");
  const [maxPages, setmaxPages] = useState(0);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [orderStatus, setOrderStatus] = useState("");
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fromDate = value.startDate
      ? new Date(value.startDate).toISOString()
      : null;
    const toDate = value.endDate ? new Date(value.endDate).toISOString() : null;
    axios
      .get(
        `/api/orders/all?page=${
          page - 1
        }&sortDirection=${sortDirection}&sortBy=${sortBy}&${
          orderStatus == "" ? "" : `orderStatus=${orderStatus}`
        }&${fromDate && toDate ? `from=${fromDate}&to=${toDate}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOrders(res.data.content);
        setmaxPages(res.data.totalPages);
      });
  }, [value, page, sortDirection, sortBy, orderStatus]);
  const resetFilters = () => {
    setOrderStatus("");
    setSortDirection("desc");
    setSortBy("createdAt");
    setValue({ startDate: null, endDate: null });
  };
  const handlePoolClick = () => {
    navigate("/poolorders", {
      state: { value: value, orderStatus: orderStatus },
    });
  };
  const handleInvoiceClick = () => {
    navigate("/outletbills", { state: { orders: orders } });
  };
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-scroll no-scrollbar h-[90vh]">
      <header className="text-3xl text-brand font-bold mb-4">Orders</header>
      <div className="flex md:flex-row flex-col justify-between">
        <select
          name="Order"
          id=""
          className="p-3 bg-slate-800 rounded-lg"
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <div
          className="z-50
        "
        >
          <Datepicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            showShortcuts={true}
          />
        </div>
        <select
          name="Status"
          id=""
          className="p-3 bg-slate-800 rounded-lg"
          onChange={(e) => setOrderStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="PARTIALLY_DELIVERED">Partially Delivered</option>
          <option value="DELIVERED">Delivered</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select
          name="Created At"
          id=""
          className="p-3 bg-slate-800 rounded-lg"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Created At</option>
          <option value="deliveredAt">Delivered At</option>
          <option value="amount">Amount</option>
        </select>
        <button
          onClick={() => resetFilters()}
          className="flex flex-row justify-center items-center"
        >
          <IoClose />
          Clear
        </button>
      </div>
      <OrderTable data={orders} />
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
      <div className="flex md:flex-row flex-col justify-end gap-4 p-2">
        <div onClick={handlePoolClick}>
          <Button text="Pool Orders" />
        </div>
        <div onClick={handleInvoiceClick}>
          <Button text="Download Invoices" />
        </div>
      </div>
    </div>
  );
};

export default Orders;
