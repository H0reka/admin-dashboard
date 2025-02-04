import React, { useState, useEffect } from "react";
import RestaurantTable from "./RestaurantTable";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../common/Button";

const Restaurants = () => {
  const token = Cookies.get("dev.admin.horeka");
  const [maxPages, setmaxPages] = useState(0);
  const [page, setPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    axios
      .get(
        `/api/restaurants?page=${
          page - 1
        }&size=10&sortBy=name&sortDirection=asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) =>{ 
        setRestaurants(res.data.content);
        setmaxPages(res.data.totalPages);
      });
  }, [page]);
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <header className="text-3xl text-brand font-bold mb-4">
        Restaurants
      </header>
      <div className="flex md:flex-row flex-col justify-between ">
              <Button text="Add Restaurant" link="/addrestaurant"/>
              {/* <Button text="Update Chicken Prices" link="www.oogll.com" /> */}
              {/* <button
                onClick={() => {
                  // setFilter(!filter);
                }}
                className="px-2.5 py-2 relative rounded group overflow-hidden font-medium bg-indigo-50 text-indigo-600 flex justify-center"
              >
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-indigo-600 group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white">
                  Filters and Sorting
                </span>
              </button> */}
            </div>
      <RestaurantTable data={restaurants} />
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
    </div>
  );
};

export default Restaurants;
