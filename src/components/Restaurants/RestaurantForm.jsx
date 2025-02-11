import React, { createContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import TextInput from "../../common/TextInput";
import NumberInput from "../../common/NumberInput";
import Cookies from "js-cookie";
import SearchSelect from "./SearchSelect";
import { toast } from "react-toastify";
import { server } from "../../main";

export const RestaurantContext = createContext();
const restaurantSchema = yup.object().shape({
  name: yup.string().required().min(1),
  address: yup.string().required(),
  floor: yup.string().required(),
  pincode: yup.number().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  lat: yup.number().required(),
  longitude: yup.number().required(),
  openingTime: yup.string(),
  fssai: yup.string(),
  gstNumber: yup.string(),
  // purchasePrice: yup.number().typeError("Purchase Price is required"),
  outlets: yup.array().of(
    yup.object({
      name: yup.string(),
      shippingAddress: yup.string(),
      floor: yup.string(),
      pincode: yup.number(),
      latitude: yup.number(),
      longitude: yup.number(),
      kitchenStartTime: yup.string(),
    })
  ),
});

const RestaurantForm = ({ initialData, submitForm }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(restaurantSchema),
    defaultValues: {
      name: initialData?.name || "",
      address: initialData?.address || "",
      floor: initialData?.floor || "Ground",
      pincode: initialData?.pincode || 0,
      city: initialData?.city || "",
      state: initialData?.state || "",
      lat: initialData?.latitude || 0,
      longitude: initialData?.longitude || 0,
      openingTime: initialData?.openingTime.substring(11, 16) || "",
      fssai: initialData?.fssai || "",
      gstNumber: initialData?.gstNumber || "",
    },
  });
  const [owners, setOwners] = useState([]);
  const [paymentWindows, setPaymentWindows] = useState([]);
  const [phoneNum, setPhoneNum] = useState(initialData?.owner.phoneNum || "");
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
    if (initialData) {
      const payload = {
        ...data,
        id: initialData.id,
        openingTime: convertTime(data.openingTime),
      };
      try {
        //API Call to PUT and update a restaurant
        const res = await axios.put(`${server}/admin/restaurants`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status == 200)
          toast.success("Restaurant Updated Successfully!");
        else throw new Error();
      } catch (err) {
        toast.error("Some Error Occurred");
      }
    } else {
      const payload = { ...data, openingTime: convertTime(data.openingTime) };
      try {
        //API Call to POST a new restaurant
        const res = await axios.post(
          `${server}/admin/restaurants?phoneNum=${phoneNum.substring(1)}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.status == 200)
          toast.success("Restaurant Created Successfully!");
        else throw new Error();
      } catch (err) {
        toast.error("Some Error Occurred");
      }
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/admin/users?role=OWNER`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwners(res.data));
    axios
      .get(`${server}/admin/paymentwindow`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPaymentWindows(res.data));
  }, []);
  const floors = ["Basement", "Ground", "1st", "2nd", "3rd or Above"];
  return (
    <RestaurantContext.Provider
      value={{
        control,
        errors,
        phoneNum,
      }}
    >
      <div className=" pt-4 text-black  ">
        <form
          className="col-span-12 grid grid-cols-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-12 gap-2 col-span-12 md:p-8 items-center">
            <TextInput name="name" label="Name" />
            <TextInput name="address" label="Address" />
            {/*Select option for floor*/}
            <div className="col-span-6">
              <Controller
                name="floor"
                control={control}
                render={({ field }) => (
                  <select
                    className="px-2.5 w-full py-4 rounded-lg group overflow-hidden font-medium bg-neutral-900 border-neutral-700 text-white flex justify-center items-center"
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

            <TextInput name="city" label="City" />
            <TextInput name="state" label="State" />
            <NumberInput name="pincode" label="Pincode" />
            <NumberInput name="lat" label="Latitude" />
            <NumberInput name="longitude" label="Longitude" />
            <TextInput name="fssai" label="FSSAI Number" />
            <TextInput name="gstNumber" label="GST Number" />

            {/* Select Owner */}
            {owners.length > 0 && (
              <SearchSelect
                options={owners}
                setPhoneNum={setPhoneNum}
                value={phoneNum}
              />
            )}
            {/* Select Time */}
            <div className="col-span-4 flex flex-row items-center justify-left gap-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Opening Hour:
              </label>
              <input
                type="time"
                className="bg-gray-50 py-3 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-neutral-900 dark:border-neutral-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={initialData?.openingTime.substring(11, 16) || ""}
                {...register("openingTime")}
              />
            </div>
          </div>

          <button className="md:col-span-12 flex bg-white p-4 rounded-lg text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-200 justify-center">
            Submit
          </button>
        </form>
      </div>
    </RestaurantContext.Provider>
  );
};

export default RestaurantForm;
