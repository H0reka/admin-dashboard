import React, { useContext, useEffect, useState } from "react";
import InputField from "../../common/InputField";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { server } from "../../main";

export const DiscountPopup = ({ setPopUp, popUp, order }) => {
  // const { popUp, setPopUp, previousDues } = useContext(OutletContext);
  const total = order.itemsTotal;
  const token = Cookies.get("dev.admin.horeka");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const handleDiscountPercentChange = (e) => {
    setDiscountPercent(e.target.value);
    setDiscountAmount((e.target.value * total) / 100);
  };
  const handleDiscountAmountChange = (e) => {
    setDiscountAmount(e.target.value);
    setDiscountPercent((e.target.value * 100) / total);
  };
  const handleSubmit = () => {
    const payload = {
      ...order,
      discount: Number(discountPercent),
      orderId: order.id,
    };
    //API call to update order (Discount)
    axios.put(`${server}/admin/orders`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPopUp(false);
  };
  return (
    <>
      {popUp && (
        <>
          <div
            className={`w-[200vw] md:w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20  "block" : "hidden"
          overflow-x-hidden`}
            onClick={() => setPopUp(false)}
          ></div>
          <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[45%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
            <h1 className="text-3xl font-bold">Edit Discount</h1>
            <p>
              <span className="font-bold">Item Total: </span>
              <span>{total}</span>
            </p>
            <InputField
              label="Discount %"
              onChange={(e) => handleDiscountPercentChange(e)}
              value={discountPercent}
            />
            <InputField
              label="Discount Amount"
              onChange={(e) => handleDiscountAmountChange(e)}
              value={discountAmount}
            />
            <p>
              <span className="font-bold">New Total: </span>
              <span>{total - discountAmount}</span>
            </p>
            <input
              type="button"
              className="p-3 bg-white rounded-lg cursor-pointer text-black"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </>
  );
};

export const RiderPopup = ({ popUp, setPopUp, orderId }) => {
  const [riderList, setRiderList] = useState([]);
  const [rider, setRider] = useState(null);
  const { id } = useParams();
  const token = Cookies.get("dev.admin.horeka");
  useEffect(() => {
    axios
      .get(`${server}/admin/users?role=RIDER`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRiderList(res.data));
  }, []);
  const handleSubmit = async () => {
    //API call to assign order to rider
    const payload = { orderId: id || orderId, riderId: rider };
    console.log(payload);
    try {
      await axios.put(`${server}/admin/rider/order/assign`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Rider assigned successfully!");
      setPopUp(false);
    } catch (err) {
      toast.error("Some Error Occurred");
    }
  };
  return (
    <>
      {popUp && (
        <>
          <div
            className={`w-[200vw] md:w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20  "block" : "hidden"
          overflow-x-hidden`}
            onClick={() => setPopUp(false)}
          ></div>
          <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[45%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
            <h1 className="text-3xl font-bold">Assign Rider</h1>
            <select
              onChange={(e) => setRider(e.target.value)}
              className="text-white bg-slate-800 rounded-lg p-3"
              defaultValue="Select Rider"
            >
              <option disabled>Select Rider</option>
              {riderList.map((rider, index) => (
                <option key={index} value={rider.id}>
                  {rider.name} {rider.phoneNum}
                </option>
              ))}
            </select>
            <input
              type="button"
              className="p-3 bg-white rounded-lg cursor-pointer text-black"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </>
  );
};

export const QuantityPopup = ({ popUp, setPopUp, order }) => {
  const { id } = useParams();
  const [delivered, setDelivered] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const handleSubmit = () => {
    //API call to assign order to rider
    setPopUp(false);
    console.log(order);
    console.log({ id, delivered, cancelled });
    // toast.success("Rider assigned successfully!")
  };
  return (
    <>
      {popUp && (
        <>
          <div
            className={`w-[200vw] md:w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20  "block" : "hidden"
          overflow-x-hidden`}
            onClick={() => setPopUp(false)}
          ></div>
          <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[45%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
            <h1 className="text-3xl font-bold">Edit Item Quantity</h1>
            <InputField
              label="Delivered"
              onChange={(e) => setDelivered(e.target.value)}
              value={delivered}
            />
            <InputField
              label="Cancelled"
              onChange={(e) => setCancelled(e.target.value)}
              value={cancelled}
            />
            <input
              type="button"
              className="p-3 bg-white rounded-lg cursor-pointer text-black"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </>
  );
};
