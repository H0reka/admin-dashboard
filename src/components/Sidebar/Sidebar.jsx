import React, { useContext, useState } from "react";
import { BiSolidCategory, BiSolidPurchaseTag } from "react-icons/bi";
import { FaBars, FaUser } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";
import { IoCloseSharp, IoRestaurant, IoLogOut } from "react-icons/io5";
import { MdInventory } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Context } from "../../main";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const handleLogout = () => {
    Cookies.remove("dev.admin.horeka");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="fixed flex items-center justify-center z-50 ">
      <div
        className={`overflow-y-scroll no-scrollbar h-[90vh] lg:w-40 bg-indigo-600/30 backdrop-blur-lg md:h-[100vh] rounded-r-2xl text-white transition-all duration-300 ${
          openSidebar ? "w-40" : "w-16"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <button
            className={`lg:hidden block transition-transform duration-300`}
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            {openSidebar ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div className="flex justify-between items-center p-4">
          <h1
            className={`text-brand lg:opacity-100 font-bold text-xl transition-opacity duration-100 ${
              openSidebar ? "opacity-100 delay-100" : "opacity-0 delay-0"
            }`}
          >
            horeka.app
          </h1>
        </div>

        <nav className="mt-4">
          <ul>
            <Link to="/">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <GiChickenLeg size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Products
                </span>
              </li>
            </Link>
            <Link to="/categories">
              <li className="flex items-center p-4 gap-2 hover:bg-indigo-700 cursor-pointer transition-all duration-300">
                <BiSolidCategory size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Categories
                </span>
              </li>
            </Link>
            <Link to="/orders">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <TbTruckDelivery size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Orders
                </span>
              </li>
            </Link>
            <Link to="/restaurants">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <IoRestaurant size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Restaurants
                </span>
              </li>
            </Link>
            <Link to="/vendors">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <BsPeopleFill size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Vendors
                </span>
              </li>
            </Link>
            <Link to="/purchase">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <BiSolidPurchaseTag size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Purchase
                </span>
              </li>
            </Link>
            <Link to="/inventory">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <MdInventory size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Inventory
                </span>
              </li>
            </Link>
            <Link to="/expenses">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <MdInventory size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Expenses
                </span>
              </li>
            </Link>
            <Link to="/claimedpayments">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <MdInventory size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Claimed Payments
                </span>
              </li>
            </Link>
            <Link to="users">
              <li className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300">
                <FaUser size={24} />
                <span
                  className={`lg:block ${openSidebar ? "block" : "hidden"}`}
                >
                  Users
                </span>
              </li>
            </Link>
          </ul>
        </nav>
        <button
          className="flex items-center w-full p-4 hover:bg-indigo-700 cursor-pointer gap-2 transition-all duration-300 mt-24"
          onClick={handleLogout}
        >
          <IoLogOut size={24} />
          <span className={`lg:block ${openSidebar ? "block" : "hidden"}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
