import React from "react";
import PurchaseItems from "./PurchaseItems";
import PurchaseTransacTable from "./PurchaseTransacTable";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import InputField from "../../common/InputField";
const PurchaseDetails = () => {
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll no-scrollbar h-[90vh] flex flex-col flex-wrap">
      <header className="text-3xl text-brand font-bold mb-4">
        Purchase Details
      </header>
      <div className="flex flex-row mt-4 justify-between p-3">
        <div className="text-black bg-white font-semibold text-2xl rounded-lg flex flex-row p-3 gap-4">
          <div className="flex flex-col text-lg">
            Purchase ID <span>ID</span>
          </div>
          <div className="h-full border-2 border-gray-900"></div>
          <div className="flex flex-col text-lg">
            Purchase Date <span>Date</span>
          </div>
        </div>
        <div className="text-black bg-white font-semibold text-2xl rounded-lg flex flex-row p-3 gap-4">
          <div className="flex flex-col text-lg">
            Total Items<span>10</span>
          </div>
          <div className="h-full border-2 border-gray-900"></div>
          <div className="flex flex-col text-lg">
            Total Amount<span>1000</span>
          </div>
          <div className="h-full border-2 border-gray-900"></div>
          <div className="flex flex-col text-lg">
            Balance <span>500</span>
            <IoPencil />
          </div>
        </div>
      </div>
      {/*In transactions table:
1. Status is either COMPLETE or UNPAID
2. ⁠Let’s say the amount of order was 1000. The user entered a transaction of 500. The balance amount is now 500. In this case 1 transaction will be shown which will be of 500 and the balance amount will be shown as 500. There should be an option for setting the balance amount which is as shown in the popup below */}
      <>
        <div
          className={`w-[200vw] md:w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20  "block" : "hidden"
          overflow-x-hidden`}
        ></div>
        <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[20%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
          <h1 className="text-3xl font-bold text-white">Settle Payment</h1>
          <div className="m-3 text-white flex flex-col gap-2">
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
      </>
      <div className="bg-white text-black m-3 rounded-lg p-2">
        <h1 className="font-semibold text-2xl">Vendor Details</h1>
        <div className="flex flex-col">
          <span>Name</span>
          <span>Address</span>
          <span>Registration Number</span>
          <span>Contact Number</span>
        </div>
      </div>
      <div className="w-full h-1 bg-white/30"></div>
      <div className="flex flex-col justify-center items-center gap-2 p-2">
        <h1 className="text-xl font-semibold">Purchase Items</h1>
        <PurchaseItems />
      </div>
      <div className="w-full h-1 bg-white/30"></div>
      <div className="flex flex-col justify-center items-center gap-2 p-2">
        <h1 className="text-xl font-semibold">Purchase Transactions</h1>
        <PurchaseTransacTable />
      </div>
    </div>
  );
};

export default PurchaseDetails;
