import React from "react";
import RestaurantForm from "./RestaurantForm";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FaPlus } from "react-icons/fa";

export const AddRestaurant = () => {
  const handleSubmission = () => {};
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <header className="text-3xl text-brand font-bold">Add Restaurant</header>
      <RestaurantForm submitForm={handleSubmission} />
    </div>
  );
};

export const EditRestaurant = () => {
  const token = Cookies.get("dev.admin.horeka");
  const location = useLocation();
  const initialData = location.state?.initialData;
  const handleSubmission = () => {};
  if (!initialData) return <div>Loading....</div>;
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll no-scrollbar h-[90vh]">
      <header className="text-3xl text-brand font-bold">Edit Restaurant</header>
      <RestaurantForm initialData={initialData} submitForm={handleSubmission} />
      <div>
        {initialData ? (
          <div className=" text-white p-4 rounded-lg">
            <p className="font-semibold col-span-12">OUTLETS</p>
            <div className="flex flex-row gap-3 flex-wrap">
              <Link
                type="button"
                className="flex rounded-lg border-2 h-32 w-32 items-center justify-center"
                to={{ pathname: "/addoutlet" }}
              >
                <div className="flex flex-col justify-center items-center">
                  <FaPlus />
                  Add Outlet
                </div>
              </Link>
              {initialData.outlets.map((outlet, index) => {
                return (
                  <Link
                    to="/addoutlet"
                    state={{
                      data: initialData.outlets[index],
                      restaurantId: initialData.id,
                    }}
                    className="rounded-lg border-2 h-32 max-h-32 w-32 flex  overflow-y-hidden"
                  >
                    <div className="flex flex-col justify-center items-center text-center">
                      <span className="font-semibold text-sm">
                        {outlet.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {outlet.address}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
