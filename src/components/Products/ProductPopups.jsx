import React, { useEffect, useState } from "react";
import InputField from "../../common/InputField";
import axios from "axios";
import Cookies from "js-cookie";
import { server } from "../../main";

const token = Cookies.get("dev.admin.horeka");

export const AddStorage = ({ popUp, setPopup }) => {
  const [storageName, setStorageName] = useState("");
  const [storageDescription, setStorageDescription] = useState("");
  const handleSubmit = () => {
    //API call to add storage
    try {
      const payload = { name: storageName, description: storageDescription };
      axios.post(`${server}/admin/storageTypes`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Storage Added Successfully!");
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
            onClick={setPopup}
          ></div>
          <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[45%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
            <h1 className="text-3xl font-bold text-white">Add Storage</h1>
            <InputField
              label="Name"
              onChange={(e) => setStorageName(e.target.value)}
              value={storageName}
            />
            <InputField
              label="Description"
              onChange={(e) => setStorageDescription(e.target.value)}
              value={storageDescription}
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
export const AddUnit = ({ popUp, setPopup }) => {
  const [unitName, setUnitName] = useState("");
  const [unitDescription, setUnitDescription] = useState("");
  const handleSubmit = () => {
    //API call to add unit
    try {
      const payload = { name: unitName, description: unitDescription };
      axios.post(`${server}/admin/units`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Unit Added Successfully!");
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
            onClick={setPopup}
          ></div>
          <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[45%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
            <h1 className="text-3xl font-bold text-white">Add Unit</h1>
            <InputField
              label="Name"
              onChange={(e) => setUnitName(e.target.value)}
              value={unitName}
            />
            <InputField
              label="Description"
              onChange={(e) => setUnitDescription(e.target.value)}
              value={unitDescription}
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
