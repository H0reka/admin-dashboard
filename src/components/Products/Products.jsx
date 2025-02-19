import React, { useContext, useEffect, useRef, useState } from "react";
import ProductTable from "./ProductTable";
import Button from "../../common/Button";
import Select from "../../common/Select";
import axios from "axios";
import Cookies from "js-cookie";
import DebouncedInput from "../../common/DebouncedInput";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { server } from "../../main";

const categoryOptions = [
  { All: 0 },
  { Dairy: 5 },
  { "Chilled Chicken": 8 },
  { "Sauces & Seasoning": 9 },
  { Vegetables: 10 },
  { "Fish & Prawn": 1 },
  { "Instant Snacks": 2 },
  { "Mutton Frozen": 4 },
];
const orderOptions = [{ Ascending: "asc" }, { Descending: "desc" }];
const columnOptions = [
  { Name: "name" },
  { Created: "createdAt" },
  { Updated: "updatedAt" },
  { MRP: "mrp" },
  { "MOQ Sale Price": "moq" },
];
const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Get initial state from URL
  const initialCategory = Number(queryParams.get("category")) || 0;
  const initialPage = Number(queryParams.get("page")) || 1;
  const firstRender = useRef(true);
  const manualCategoryChange = useRef(false);
  const firstSearchRender = useRef(true);

  // State
  const [category, setCategory] = useState(initialCategory);
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [column, setColumn] = useState("name");
  const [productList, setProductList] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const token = Cookies.get("dev.admin.horeka");
  const [page, setPage] = useState(initialPage);
  const [pageInput, setPageInput] = useState(1);
  const [filter, setFilter] = useState(false);

  // 🔥 Sync state with URL (for Back button functionality)
  useEffect(() => {
    const categoryFromUrl = Number(queryParams.get("category")) || 0;
    const pageFromUrl = Number(queryParams.get("page")) || 1;
    if (category !== categoryFromUrl) {
      setCategory(categoryFromUrl);
      manualCategoryChange.current = false;
    }
    if (page !== pageFromUrl) {
      setPage(pageFromUrl);
    }
  }, [location.search]);

  // 🔥 Reset page to 1 when category changes via UI (not Back button)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (manualCategoryChange.current) {
      setPage(1);
    }
  }, [category]);

  // 🔥 API Fetch when search is EMPTY or category/page changes
  useEffect(() => {
    if (search) return; // If search is active, this should not run

    let apiURL =
      category === 0
        ? `${server}/admin/products`
        : `${server}/products/categories/${category}`;

    axios
      .get(
        `${apiURL}?page=${page - 1}&sortBy=${column}&sortDirection=${order}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      )
      .then((res) => {
        setMaxPages(res.data.totalPages);
        setProductList(res.data.content);
      })
      .catch((err) => console.error("API Fetch Error:", err));

    // Update URL only if needed
    const newUrl = `?page=${page}${
      category !== 0 ? `&category=${category}` : ""
    }`;
    if (location.search !== newUrl) {
      navigate(newUrl, { replace: true });
    }
  }, [category, page, column, order, search]); // 🔥 `search` in dependency ensures normal fetch when `search` is cleared

  // 🔥 API Fetch when search is active
  useEffect(() => {
    if (!search) return; // If search is empty, don't run this (normal fetch will run)

    if (firstSearchRender.current) {
      firstSearchRender.current = false;
      setPage(1); // 🔥 Reset to page 1 on first search call
      return;
    }

    axios
      .get(`${server}/products/search?keywords=${search}&page=${page - 1}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => {
        setMaxPages(res.data.totalPages);
        setProductList(res.data.content);
      })
      .catch((err) => console.error("Search API Fetch Error:", err));

    // Update URL to reflect search state & page number
    const newUrl = `?search=${encodeURIComponent(search)}&page=${page}`;
    if (location.search !== newUrl) {
      navigate(newUrl, { replace: true });
    }
  }, [search, page]);

  // Function to manually change category (set flag)
  const handleCategoryChange = (newCategory) => {
    manualCategoryChange.current = true;
    setCategory(newCategory);
  };
  useEffect(() => {
    if (!search) {
      firstSearchRender.current = true;
    }
  }, [search]);
  // Function to handle search input change
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };

  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll h-[100vh] no-scrollbar">
      <header className="text-3xl text-brand font-bold mb-4">Products</header>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 ">
        <Button text="Add products" link="/addproduct" />
        <Button text="Update Chicken Prices" link="/updatechicken" />
        <button
          onClick={() => {
            setFilter(!filter);
          }}
          className="px-2.5 py-2 relative rounded group overflow-hidden font-medium bg-indigo-50 text-indigo-600 flex justify-center"
        >
          <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-indigo-600 group-hover:h-full opacity-90"></span>
          <span className="relative group-hover:text-white">
            Filters and Sorting
          </span>
        </button>
      </div>
      <div className="grid mb-2">
        {/* Search */}
        <div className="flex justify-center items-center mb-2 ">
          <div className="w-full flex items-center justify-center md:justify-end gap-1">
            <FaSearch />
            <DebouncedInput
              onChange={(value) => setSearch(value)}
              className="p-2 bg-transparent outline-none border-b-2 sm:w-52 md:w-1/5 md:focus:w-1/3 focus:w-52 duration-300 border-indigo-500"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <div className="items-center justify-center">
        {productList && <ProductTable data={productList} />}
      </div>
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
      {/*Section for filters */}
      {filter && (
        <div
          className={`w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20 ${
            filter ? "block" : "hidden"
          } overflow-x-hidden`}
          onClick={() => setFilter(false)}
        ></div>
      )}
      {filter && (
        <div
          className={`rounded-l-xl absolute grid grid-rows-12 top-0  md:right-0 w-80 h-full bg-indigo-700/50 backdrop-blur-lg z-30`}
        >
          <div className="p-4 row-span-3 grid grid-cols-1 gap-4">
            <h1 className="text-xl font-semibold">FILTER</h1>
            <Select
              text="All"
              options={categoryOptions}
              func={handleCategoryChange}
              init={category}
            />
          </div>
          <div className="p-4 row-span-4 grid grid-cols-1 gap-4">
            <h1 className="text-xl font-semibold">SORT</h1>
            <Select options={columnOptions} func={setColumn} init={column} />
            <Select options={orderOptions} func={setOrder} init={order} />
          </div>
          <div className="p-4 row-span-5 row-end-[15] flex flex-col gap-2">
            <button
              onClick={() => {
                setFilter(false);
              }}
              className="px-2.5 py-2 relative rounded group overflow-hidden font-medium bg-indigo-50 text-indigo-600 flex justify-center items-center w-full"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-indigo-600 group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white">Apply</span>
            </button>
            <button
              onClick={() => {
                setCategory(0);
                setColumn("Name");
                setOrder("asc");
                setFilter(false);
              }}
              className="px-2.5 py-2 relative rounded group overflow-hidden font-medium bg-indigo-50 text-indigo-600 flex justify-center items-center w-full"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-indigo-600 group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white">Clear</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
