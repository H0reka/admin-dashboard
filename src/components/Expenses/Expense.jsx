import React, { useState } from "react";
import InputField from "../../common/InputField";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Expense = () => {
  const [popUp, setPopUp] = useState(false);
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <header className="text-3xl text-brand font-bold">Add Expense</header>
      <div className="text-black overflow-y-scroll no-scrollbar h-[90vh]">
        <form
          className="col-span-12 grid grid-cols-12 gap-3"
          // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-12 col-span-12 gap-3 md:p-28 justify-between items-center">
            <InputField label="Date" />
            <div
              className="col-span-6 flex flex-row items-center gap-3 "
              context="product"
            >
              <select className="px-2.5 py-4 relative text-sm rounded-md group overflow-hidden font-medium dark:bg-neutral-900 dark:border-neutral-700 text-white flex justify-center items-center">
                <option>Select Category</option>
                <option>OpEx</option>
                <option>CapEx</option>
              </select>
              <Link
                to="/addcategory"
                className="text-brand font-semibold text-lg"
              >
                ADD CATEGORY
              </Link>
            </div>
            <div className="col-span-12 m-3 text-white flex flex-col gap-2">
              <div className="flex flex-row items-center gap-72">
                <p className="font-semibold">ITEMS</p>
                <button type="button" className="block rounded-lg">
                  <FaPlus />
                </button>
              </div>
              <div className="grid grid-cols-12 gap-1 items-center">
                <select
                  className="p-4 bg-neutral-900 rounded-lg col-span-3"
                  defaultValue={"Select"}
                >
                  <option value="Select">Select Item</option>
                </select>
                <InputField label="Qty" addclass={"col-span-4 lg:col-span-2"} />
                <InputField
                  label="Price/Unit"
                  addclass={"col-span-4 lg:col-span-3"}
                  onChange={() => {}}
                />
                <button>
                  <FaMinus />
                </button>
              </div>
            </div>
            <div className="col-span-12 m-3 text-white flex flex-col gap-2">
              <div className="flex flex-row items-center gap-72">
                <p className="font-semibold">TRANSACTION</p>
                <button type="button" className="block rounded-lg">
                  <FaPlus />
                </button>
              </div>
              <div className="grid grid-cols-12 gap-1 items-center">
                <select
                  className="p-4 bg-neutral-900 rounded-lg col-span-3"
                  defaultValue={"Select"}
                >
                  <option value="Select">Select Payment Method</option>
                  <option value="Select">Cash</option>
                  <option value="Select">Credit</option>
                  <option value="Select">NEFT</option>
                  <option value="Select">UPI</option>
                </select>
                <InputField
                  label="Amount"
                  addclass={"col-span-4 lg:col-span-3"}
                  onChange={() => {}}
                />
                <button>
                  <FaMinus />
                </button>
              </div>
            </div>
          </div>
          <button className="md:col-span-12 mb-4 flex bg-white p-4 rounded-lg text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-200 justify-center">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Expense;
