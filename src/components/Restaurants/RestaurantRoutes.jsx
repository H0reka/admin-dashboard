import React, { useEffect, useState } from "react";
import RestaurantForm from "./RestaurantForm";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FaPlus } from "react-icons/fa";
import { server } from "../../main";
import axios from "axios";

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
  const { id } = useParams();
  const [initialData, setInitialData] = useState();
  useEffect(() => {
    if (!id) {
      console.error("restaurantId is undefined");
      return;
    }
    axios
      .get(`${server}/admin/restaurants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInitialData(res.data); // Assuming you want to store the data
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  const handleSubmission = () => {};
  if (!initialData) return <div>Loading....</div>;
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll no-scrollbar h-[90vh]">
      <header className="text-3xl text-brand font-bold">Edit Restaurant</header>
      {initialData && (
        <RestaurantForm
          initialData={initialData}
          submitForm={handleSubmission}
        />
      )}
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
                    to={`/editoutlet/${initialData.id}/${initialData.outlets[index].id}`}
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
