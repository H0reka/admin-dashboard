import React, { useContext, useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import Button from "../../common/Button";
import Select from "../../common/Select";
import axios from "axios";
import Cookies from "js-cookie";
import DebouncedInput from "../../common/DebouncedInput";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  const [category, setCategory] = useState(id || 0);
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [column, setColumn] = useState("name");
  const [filter, setFilter] = useState(false);
  const [productList, setProductList] = useState([]);
  const [maxPages, setmaxPages] = useState(0);
  const token = Cookies.get("dev.admin.horeka");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!search) {
      const apiURL =
        category == 0
          ? `${server}/admin/products`
          : `${server}/products/categories/${category}`;
      axios
        .get(
          `${apiURL}?page=${page - 1}&sortBy=${column}&sortDirection=${order}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const data = res.data.content;
          setmaxPages(res.data.totalPages);
          setProductList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `${server}/products/search?keywords=${search}&page=${
            page - 1
          }&sortBy=${column}&sortDirection=${order}`
        )
        .then((res) => {
          const data = res.data.content;
          setmaxPages(res.data.totalPages);
          setProductList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search, page, column, order]);
  useEffect(() => {
    setPage(1);
    const apiURL =
      category == 0
        ? `${server}/products`
        : `${server}/products/categories/${category}`;
    axios
      .get(
        `${apiURL}?page=${page - 1}&sortBy=${column}&sortDirection=${order}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data.content;
        setmaxPages(res.data.totalPages);
        setProductList(data);
      });
  }, [category]);
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
          {/* <DownloadBtn data={data} fileName={"peoples"} /> */}
        </div>
        {/* Pagination */}
      </div>

      <div className="items-center justify-center">
        {/* {productList.length == 0 ? (
          "Loading..."
        ) : (
          <ProductTable data={productList} />
        )} */}
        {productList && <ProductTable data={productList} />}
      </div>
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
              func={setCategory}
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
