import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RestaurantTable from "./RestaurantTable";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../common/Button";
import { server } from "../../main";

const Restaurants = () => {
  const token = Cookies.get("dev.admin.horeka");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page number from URL or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get("page")) || 1;

  const [page, setPage] = useState(initialPage);
  const [maxPages, setMaxPages] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [pageInput, setPageInput] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${server}/admin/restaurants?page=${
          page - 1
        }&size=10&sortBy=name&sortDirection=asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRestaurants(res.data.content);
        setMaxPages(res.data.totalPages);
      });

    // Update URL when page changes
    navigate(`?page=${page}`, { replace: true });
  }, [page]);

  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <header className="text-3xl text-brand font-bold mb-4">
        Restaurants
      </header>
      <div className="flex md:flex-row flex-col justify-between">
        <Button text="Add Restaurant" link="/addrestaurant" />
      </div>
      <RestaurantTable data={restaurants} />
      {/* Pagination */}
      <div className=" flex items-center justify-center flex-wrap">
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
            <strong>
              {page} of {maxPages}
            </strong>
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
        <div className="flex items-center gap-2 p-4">
          <span className="text-white font-medium">Go to page:</span>
          <input
            type="number"
            className="w-10 p-2 border rounded-md text-center text-black outline-none focus:ring-2 focus:ring-blue-500"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
          />
          <button
            onClick={() => setPage(pageInput)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
