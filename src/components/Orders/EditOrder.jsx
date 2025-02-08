import React, { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OrderTransacTable from "./OrderTransacTable";
import OrderItems from "./OrderItems";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { DiscountPopup, RiderPopup } from "./OrderPopups";

const EditOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [discountPopUp, setDiscountPopUp] = useState(false);
  const [riderPopUp, setRiderPopUp] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [outletOwner, setOutletOwner] = useState(null);
  const token = Cookies.get("dev.admin.horeka");
  {
    /* API call to fetch the data for a particular order id */
  }
  useEffect(() => {
    axios
      .get(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .then((data) => {
        if (data?.outlet?.id) {
          axios
            .get(`/api/owner/outlet/${data.outlet.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => setOutletOwner(res.data));
        }
      });
  }, [id, refresh]);
  {
    /* Function to correctly format the dates*/
  }
  const formatDate = (timestamp) => {
    if (timestamp == null) return "null";
    // Convert to Date object
    const date = new Date(timestamp);

    // Format to include the day of the week
    const options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };
  {
    /*Function to handle order status change */
  }
  const handleStatusChange = async (status, id) => {
    //API Call to update order status
    try {
      await axios.put(
        `/api/orders/${id}?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Changed Order Status");
      setRefresh(!refresh);
    } catch (err) {
      toast.error("Some Error Occurred");
    }
  };
  while (!data || !outletOwner) return <></>;
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll no-scrollbar h-[97vh]">
      {/* Section to display the Order Details */}
      <div className="grid grid-cols-12 p-10 gap-3">
        {/* Displaying the Outlet Details */}
        <div className="bg-white/30 backdrop-blur-3xl text-black col-span-12 md:col-span-6 p-3 rounded-lg flex flex-col gap-2 h-fit">
          <h1 className="text-2xl font-bold">Outlet</h1>
          <div>
            <h1>
              <span className="font-semibold">ID: </span>
              {data.outlet.id}
            </h1>
            <h1>
              <span className="font-semibold">Name: </span>
              {data.outlet.name}
            </h1>
            <h1>
              <span className="font-semibold">
                {data.outlet.managers.length > 0 ? "Manager: " : "Owner: "}
              </span>
              {data.outlet.managers.length > 0 ? (
                <span>
                  {data.outlet.managers[0].profile.name}{" "}
                  {data.outlet.managers[0].phoneNum}
                </span>
              ) : (
                <span>
                  {outletOwner.name} ({outletOwner.phoneNum})
                </span>
              )}
            </h1>
            <h1>
              <span className="font-semibold">Address: </span>
              {data.outlet.address}
            </h1>
            <div className="flex flex-row justify-between">
              <h1>
                <span className="font-semibold">Balance: </span>₹
                {data.outlet.wallet.walletBalance}
              </h1>
              <h1>
                <span className="font-semibold">Limit: </span>₹
                {data.outlet.wallet.creditLimit}
              </h1>
            </div>
          </div>
        </div>
        {/* Displaying the Rider Details*/}
        <div className="bg-white/30 backdrop-blur-3xl text-black rounded-lg p-3 col-span-12 md:col-span-6 flex flex-col gap-2 h-fit">
          <h1 className="text-2xl font-bold">Rider</h1>
          <div>
            <h1>
              <span className="font-semibold">ID: </span>
              {data.rider?.id}
            </h1>
            <h1>
              <span className="font-semibold">Name: </span>
              {data.rider?.profile.name}
            </h1>
            <h1>
              <span className="font-semibold">Phone: </span>
              {data.rider?.phoneNum}
            </h1>
          </div>
          <button
            className="bg-white drop-shadow-lg rounded-lg shadow-black disabled:bg-neutral-700 disabled:text-neutral-800 disabled:shadow-none"
            onClick={() => setRiderPopUp(true)}
            disabled={data.rider == null ? false : true}
          >
            Assign Rider
          </button>
        </div>
        {riderPopUp && (
          <RiderPopup setPopUp={setRiderPopUp} popUp={riderPopUp} />
        )}
        {/* Displaying the Amount Details */}
        <div className=" text-white col-span-12 md:col-span-6 p-3 flex flex-col gap-2">
          <div>
            <span className="font-bold">Order Status: </span>
            {data.orderStatus}
            <select
              className="text-black ml-2 bg-slate-400  p-3 rounded-lg appearance-none"
              onChange={(e) => handleStatusChange(e.target.value, data.id)}
              defaultValue={data.orderStatus}
            >
              <option disabled>Change Status</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
              <option value="DELIVERED">Delivered</option>
              <option value="PARTIALLY_DELIVERED">Partially Delivered</option>
            </select>
          </div>
          <h1>
            <span className="font-bold">Items Total: </span>₹{data.itemsTotal}
          </h1>
          <div className="flex flex-row gap-3 items-center">
            <h1>
              <span className="font-bold">Discount: </span>
              {data.discount ? data.discount : 0}
            </h1>
            <FaEdit
              size={20}
              onClick={() => setDiscountPopUp(true)}
              className="cursor-pointer"
            />
            {discountPopUp && (
              <DiscountPopup
                setPopUp={setDiscountPopUp}
                popUp={discountPopUp}
                order={data}
              />
            )}
          </div>
          <h1>
            <span className="font-bold">Total Amount: </span>₹{data.amount}
          </h1>
        </div>
        {/* Displaying the Delivery Details*/}
        <div className=" text-white col-span-12 md:col-span-6 p-3 rounded-lg flex flex-col gap-2 items-end">
          <h1>
            <span className="font-bold">Created At: </span>
            {formatDate(data.createdAt)}
          </h1>
          <h1>
            <span className="font-bold">Delivery Slot: </span>
            {formatDate(data.slotStartTime)}
          </h1>
          <h1>
            <span className="font-bold">Delivered At: </span>
            {formatDate(data.deliveredAt)}
          </h1>
        </div>
      </div>
      <div className="w-full h-1 bg-white/30"></div>
      {/* Section to display the Order Items */}
      <div className="flex flex-col justify-center items-center gap-2 p-2">
        <h1 className="text-xl font-semibold">Order Items</h1>
        <OrderItems data={data.orderItems} />
      </div>
      <div className="w-full h-1 bg-white/30"></div>
      {/* Section to display the Order Transactions */}
      <div className="flex flex-col justify-center items-center gap-2 p-2">
        <h1 className="text-xl font-semibold">Order Transactions</h1>
        <OrderTransacTable data={data.orderTransactions} />
      </div>
      <div className="w-full h-1 bg-white/30"></div>
      {/* Section to display the Order Images */}
      <div className="flex flex-col justify-center items-center gap-2 p-2">
        <h1 className="text-xl font-semibold">Order Images</h1>
        <div className="flex flex-row gap-2 flex-wrap">
          {data.images.length > 0
            ? data.images.map((image, index) => (
                <img src={image.imageUrl} alt="" className="w-28 rounded-lg" />
              ))
            : "No images to be shown."}
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
