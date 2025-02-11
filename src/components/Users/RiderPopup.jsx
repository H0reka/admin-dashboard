import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
const RiderPopup = ({ popup, setPopup, id }) => {
  const token = Cookies.get("dev.admin.horeka");
  const [rider, setRider] = useState({});
  useEffect(() => {
    axios
      .get(`${server}/rider/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRider(res.data));
  }, []);
  const handleVerify = () => {
    //API call to verify rider
    try {
      axios.put(
        `${server}/admin/rider/${id}/verify`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Rider Verified successfully!");
      setPopup(false);
    } catch (err) {
      toast.error("Some Error Occurred");
      console.log(err.message);
    }
  };
  return (
    <>
      {popup && (
        <>
          <div
            className={`w-[200vw] md:w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20  "block" : "hidden"
            overflow-x-hidden`}
            onClick={() => setPopup(false)}
          ></div>
          <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[40%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
            <h1 className="text-lg text-white font-semibold">Rider Profile</h1>
            <div className="flex flex-row gap-2">
              <div className="">
                <h1 className="text-black font-semibold">
                  Name:
                  <span className="text-white font-normal"> {rider.name}</span>
                </h1>
                <h1 className="text-black font-semibold">
                  Phone Number:
                  <span className="text-white font-normal">
                    {" "}
                    {rider.phoneNum}
                  </span>
                </h1>
                <h1 className="text-black font-semibold">
                  Email:
                  <span className="text-white font-normal"> {rider.email}</span>
                </h1>
                <h1 className="text-black font-semibold">
                  Vehicle Number:{" "}
                  <span className="text-white font-normal">
                    {rider.vehicleNumber}
                  </span>
                </h1>
                <h1 className="text-black font-semibold">
                  Vehicle Model:{" "}
                  <span className="text-white font-normal">
                    {rider.vehicleModel}
                  </span>
                </h1>
                <h1 className="text-black font-semibold">
                  DL Number:{" "}
                  <span className="text-white font-normal">
                    {rider.drivingLicenseNumber}
                  </span>
                </h1>
              </div>
              <div>
                {" "}
                <img
                  src={rider.userImage}
                  className="w-32 rounded-lg"
                  alt="Rider Image"
                />
              </div>
            </div>
            <div
              className="cursor-pointer text-center bg-white w-fit text-black rounded-lg p-3 font-semibold hover:drop-shadow-xl transition-transform"
              onClick={handleVerify}
            >
              Verify Rider
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RiderPopup;
