import React, { useState } from "react";
import InventoryTransacTable from "./InventoryTransacTable";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import InputField from "../../common/InputField";
import Button from "../../common/Button";
const InventoryDetails = () => {
  const [popUp, setPopup] = useState(false);
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll no-scrollbar h-[90vh] flex flex-col flex-wrap">
      <header className="text-3xl text-brand font-bold mb-4">
        Inventory Details
      </header>
      <div className="flex flex-row gap-2">
        <div onClick={(e) => setPopup(true)}>
          <Button text="Add Stock" />
        </div>
        <div onClick={(e) => setPopup(true)}>
          <Button text="Reduce Stock" />
        </div>
      </div>
      {popUp && (
        <>
          <div
            onClick={(e) => setPopup(false)}
            className={`w-[200vw] md:w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20  "block" : "hidden"
                overflow-x-hidden`}
          ></div>
          <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[45%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
            <h1 className="text-3xl font-bold text-white">Add Stock</h1>
            <div className="flex flex-col gap-2">
              <InputField label="Quantity" />
              <InputField label="Price" />
            </div>
            <button onClick={(e) => setPopup(false)}>Submit</button>
          </div>
        </>
      )}
      {/*In transactions table:
1. Status is either COMPLETE or UNPAID
2. ⁠Let’s say the amount of order was 1000. The user entered a transaction of 500. The balance amount is now 500. In this case 1 transaction will be shown which will be of 500 and the balance amount will be shown as 500. There should be an option for setting the balance amount which is as shown in the popup below */}
      <div className="flex flex-col justify-center items-center gap-2 p-2">
        <h1 className="text-xl font-semibold">Stock Transactions</h1>
        <InventoryTransacTable />
      </div>
    </div>
  );
};

export default InventoryDetails;
