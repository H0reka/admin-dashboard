import React, { createContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextInput from "../../common/TextInput";
import NumberInput from "../../common/NumberInput";
import Cookies from "js-cookie";
import InputField from "../../common/InputField";
import TransacTable from "./TransactionTable";
import BalancePopup from "./BalancePopup";
import { toast } from "react-toastify";
import { server } from "../../main";

const outletSchema = yup.object().shape({
  name: yup.string().required().min(1),
  shippingAddress: yup.string().required(),
  floor: yup.string().required(),
  pincode: yup.number().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  openingTime: yup.string(),
  // purchasePrice: yup.number().typeError("Purchase Price is required"),
  paymentWindow: yup.string().required(),
});
export const OutletContext = createContext();
const AddOutlet = () => {
  const location = useLocation();
  const rowData = location.state?.data;
  const restaurantId = location.state?.restaurantId;
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(outletSchema),
    defaultValues: {
      name: rowData?.name || "",
      shippingAddress: rowData?.address || "",
      floor: rowData?.floor || "",
      pincode: rowData?.pincode || 0,
      city: rowData?.city || "",
      state: rowData?.state || "",
      latitude: rowData?.latitude || 0,
      longitude: rowData?.longitude || 0,
      kitchenStartTime: rowData?.kitchenStartTime.substring(11, 16) || "",
      paymentWindow: rowData?.paymentWindow || "PW_0_1",
      wallet: {
        creditLimit: rowData?.wallet.creditLimit || 0,
        walletBalance: rowData?.wallet.walletBalance || 0,
      } || { creditLimit: 0, walletBalance: 0 },
    },
  });
  const [POD, setPOD] = useState(rowData?.podAvailable);
  const [paymentWindows, setPaymentWindows] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [previousDues, setPreviousDues] = useState(false);
  const token = Cookies.get("dev.admin.horeka");
  const convertTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);

    // Get the current date
    const dateObj = new Date();

    // Set the current date's time to the provided time (hours and minutes)
    dateObj.setHours(hours, minutes, 0, 0);

    // Get the local time offset (in minutes) for IST (GMT+5:30)
    const timezoneOffset = 5 * 60 + 30; // 5 hours 30 minutes offset

    // Create an ISO 8601 string with the correct time and date
    // First, generate the UTC ISO string
    let isoString = dateObj.toISOString();

    // Adjust the time to reflect the IST time zone (by adding the offset)
    const offsetDate = new Date(dateObj.getTime() + timezoneOffset * 60 * 1000);

    // Return the string in ISO format for IST (without 'Z' or timezone offset adjustment)
    return offsetDate.toISOString().slice(0, 19);
  };
  const onSubmit = async (data) => {
    if (rowData) {
      const payload = {
        ...data,
        id: rowData.id,
        restaurantId,
        kitchenStartTime: convertTime(data.kitchenStartTime),
      };
      console.log(payload.kitchenStartTime);
      const paymentWindowPayload = {
        outletId: rowData.id,
        paymentWindow: data.paymentWindow,
      };
      try {
        //API Call to PUT the data
        await axios.put(`${server}/admin/outlets`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        //API call to update payment window
        await axios.put(
          `${server}/admin/outlets/paymentwindow`,
          paymentWindowPayload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        //API call to update POD status
        await axios.put(
          `${server}/admin/outlet/${rowData.id}/paymentondelivery?status=${
            POD ? "ENABLE" : "DISABLE"
          }`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Outlet Updated Successfully!");
      } catch (err) {
        toast.error("Some Error Occurred");
      }
    } else {
      const payload = { restaurantId, ...data };
      console.log(payload);
      try {
        //API Call to POST a new outlet
        axios.post(`${server}/admin/outlets`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Outlet Added Successfully!");
      } catch (err) {
        toast.error("Some Error Occurred");
      }
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/admin/paymentwindow`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPaymentWindows(res.data));
  }, []);
  const floors = ["Basement", "Ground", "1st", "2nd", "3rd or Above"];
  const getDay = (day) => {
    switch (day) {
      case "M":
        return "Mon";
      case "W":
        return "Wed";
      case "T":
        return "Thurs";
      case "S":
        return "Sun";
    }
  };
  const handlePaymentWindow = (window) => {
    let ch = window.charAt(3);
    let paymentWeekStart = "";
    let paymentWeekDay = "";
    let paymentDays = "";
    let paymentPayDay = "";
    for (let i = 3; i < window.length; i++) {
      if (/^[a-zA-Z]$/.test(window.charAt(i))) {
        if (paymentWeekStart == "") paymentWeekStart = getDay(window.charAt(i));
        else paymentWeekDay = getDay(window.charAt(i));
      } else if (/^[0-9]$/.test(window.charAt(i))) {
        if (paymentDays == "") {
          while (window.charAt(i) != "_") {
            paymentDays += window.charAt(i);
            i++;
          }
        } else {
          while (i < window.length) {
            paymentPayDay += window.charAt(i);
            i++;
          }
        }
      }
    }
    return `${paymentDays} + ${paymentPayDay} ${
      paymentWeekStart === "" ? "" : `(${paymentWeekStart} - ${paymentWeekDay})`
    }`;
  };
  return (
    <OutletContext.Provider
      value={{ control, errors, popUp, setPopUp, previousDues }}
    >
      <div className="ml-[4.2rem] lg:ml-[10.3rem]">
        <header className="text-3xl text-brand font-bold">
          {rowData ? "Edit" : "Add"} Outlet
        </header>
        <div className="text-black overflow-y-scroll no-scrollbar h-[90vh]">
          <form
            className="col-span-12 grid grid-cols-12 gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid md:grid-cols-12 col-span-12 gap-3 md:p-28 justify-between items-center">
              <InputField
                label="Outlet ID"
                value={rowData?.id}
                disabled={true}
              />
              <TextInput name="name" label="Name" context="outlet" />
              <TextInput
                name="shippingAddress"
                label="Address"
                context="outlet"
              />
              {/*Select option for floor*/}
              <div className="col-span-6">
                <Controller
                  name="floor"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="px-2.5 py-4 w-full rounded group overflow-hidden font-medium bg-neutral-900 border-neutral-700 text-white flex justify-center items-center"
                      {...field}
                    >
                      {floors.map((floor, index) => (
                        <option key={index} value={floor}>
                          {floor}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>

              <TextInput name="city" label="City" context="outlet" />
              <TextInput name="state" label="State" context="outlet" />
              <NumberInput name="pincode" label="Pincode" context="outlet" />
              <NumberInput name="latitude" label="Latitude" context="outlet" />
              {/* Select Time */}
              <div className="col-span-6 flex flex-row items-center justify-left gap-2">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Opening Hour:
                </label>
                <input
                  type="time"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-neutral-900 dark:border-neutral-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={rowData?.kitchenStartTime.substring(11, 16)}
                  {...register("kitchenStartTime")}
                />
              </div>

              <NumberInput
                name="longitude"
                label="Longitude"
                context="outlet"
              />
              {/* Select Payment Due Window */}
              <div className="col-span-6">
                <Controller
                  name="paymentWindow"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-row items-center gap-2">
                      <label className="text-white">Payment Due Window: </label>
                      <select
                        className="px-2.5 py-3 rounded group overflow-hidden font-medium bg-neutral-900 border-neutral-700 text-white flex justify-center items-center"
                        {...field}
                      >
                        {paymentWindows.map((window, index) => (
                          <option key={index} value={window.paymentWindow}>
                            {handlePaymentWindow(window.paymentWindow)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                />
              </div>
              {/* Section to show when the outlet has already been created/Edit outlet */}
              {/* Credit Limit */}
              {rowData ? (
                <>
                  <Controller
                    name="wallet.creditLimit"
                    control={control}
                    render={({ field }) => {
                      return <InputField label="Credit Limit" {...field} />;
                    }}
                  />
                  <div className="text-white flex flex-row gap-8 items-center col-span-6">
                    <label htmlFor="">Pay on Delivery: </label>
                    <label className="flex items-center cursor-pointer col-span-6  gap-2">
                      <span className="font-medium">Disabled</span>
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={rowData.podAvailable}
                        onChange={(e) => setPOD(e.target.checked)}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-green-400  dark:peer-focus:ring-red-800 rounded-full peer dark:bg-red-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700"></div>
                      <span className="font-medium">Enabled</span>
                    </label>
                  </div>
                  <div className="text-white flex flex-row justify-between items-center col-span-6">
                    <p>
                      Balance: ₹
                      <span className="font-semibold text-lg">
                        {rowData?.wallet.walletBalance}
                      </span>
                    </p>
                    {rowData?.wallet.walletBalance !== 0 ? (
                      <input
                        type="button"
                        className="text-lg font-semibold text-brand uppercase cursor-pointer"
                        value="Add Balance"
                        onClick={() => setPopUp(true)}
                      />
                    ) : (
                      <input
                        type="button"
                        className="text-lg font-semibold text-brand uppercase cursor-pointer"
                        value="Set Previous Dues"
                        onClick={() => {
                          setPreviousDues(true);
                          setPopUp(true);
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <BalancePopup
              id={rowData?.id}
              walletBalance={rowData?.wallet.walletBalance}
              creditLimit={rowData?.wallet.creditLimit}
            />
            <button className="md:col-span-12 mb-4 flex bg-white p-4 rounded-lg text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-200 justify-center">
              Submit
            </button>
          </form>
          {rowData ? <TransacTable id={rowData?.id} /> : ""}
        </div>
      </div>
    </OutletContext.Provider>
  );
};

export default AddOutlet;
