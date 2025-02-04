import React from "react";
import InventoryTable from "./InventoryTable";
import DebouncedInput from "../../common/DebouncedInput";
import { FaSearch } from "react-icons/fa";

const Inventory = () => {
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll h-[100vh] no-scrollbar">
      <header className="text-3xl text-brand font-bold mb-4">Inventory</header>
      <div className="flex justify-center items-center mb-2 ">
        <div className="w-full flex items-center justify-center md:justify-end gap-1">
          <FaSearch />
          <DebouncedInput
            // onChange={(value) => setSearch(value)}
            className="p-2 bg-transparent outline-none border-b-2 sm:w-52 md:w-1/5 md:focus:w-1/3 focus:w-52 duration-300 border-indigo-500"
            placeholder="Search Item"
          />
        </div>
        {/* <DownloadBtn data={data} fileName={"peoples"} /> */}
      </div>
      <InventoryTable
        data={[{ name: "ABC", purchasePrice: 200, salePrice: 250, stock: 2.0 }]}
      />
    </div>
  );
};

export default Inventory;
