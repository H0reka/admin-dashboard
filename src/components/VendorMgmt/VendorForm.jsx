import React, { createContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../common/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import InputField from "../../common/InputField";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FaPlus, FaTrash } from "react-icons/fa";
import TimePicker from "react-time-picker";
import { FaCirclePlus } from "react-icons/fa6";

// export const RestaurantContext = createContext();

const VendorForm = ({ initialData, submitForm }) => {
  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //     register,
  //   } = useForm({
  //     resolver: yupResolver(restaurantSchema),
  //     defaultValues: {
  //       name: initialData?.name || "",
  //       address: initialData?.address || "",
  //       floor: initialData?.floor || "Ground",
  //       pincode: initialData?.pincode || 0,
  //       city: initialData?.city || "",
  //       state: initialData?.state || "",
  //       lat: initialData?.latitude || 0,
  //       longitude: initialData?.longitude || 0,
  //       openingTime: initialData?.openingTime.substring(11, 16) || "",
  //       fssai: initialData?.fssai || "",
  //       gstNumber: initialData?.gstNumber || "",
  //       // outlets: initialData?.outlets || [],
  //     },
  //   });
  const onSubmit = (data) => {};
  return (
    <div className=" pt-4 text-black ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll no-scrollbar h-[90vh]">
        <header className="text-3xl text-brand font-bold mb-4">
        Add Vendor
      </header>
      <form
        className="col-span-12 grid grid-cols-12"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid md:grid-cols-12 gap-2 col-span-12 md:p-8 items-center">
          <InputField name="registeredName" label="Vendor Name" />
          <InputField name="businessAddress" label="Business Address" />
          <InputField name="contactPerson" label="City" />
          <InputField name="contactPerson" label="State" />
          <InputField name="contactPerson" label="Pin Code" />
          <InputField name="contactPerson" label="Latitude" />
          <InputField name="contactPerson" label="Longitude" />
          <InputField name="contactPerson" label="FSSAI Number" />
          <InputField name="contactPerson" label="Vendor Contact Number" />
          <InputField name="contactPerson" label="Contact Name" />
        </div>

        <button className="md:col-span-12 flex bg-white p-4 rounded-lg text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-200 justify-center">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VendorForm;
