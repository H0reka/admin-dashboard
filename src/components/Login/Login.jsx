import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } =
    useContext(Context);
  const [phoneNum, setPhoneNum] = useState("");
  const [otp, setOtp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //API call to request OTP
      const res = await axios.post(
        "/noadminapi/auth/admin/otp/send",
        { phoneNum: "+91".concat(phoneNum) },
        { withCredentials: true }
      );
      toast.success("OTP sent successfully", { theme: "dark" });
      //Set submitted to true and display OTP field
      setSubmitted(true);
    } catch (error) {
      //Catch and display error
      toast.error("Error: " + error.response.data.message, { theme: "dark" });
    }
  };
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to verify OTP
      const res = await axios.put("/noadminapi/auth/signin/admin", {
        phoneNum: "+91".concat(phoneNum),
        otp: otp,
      });
      toast.success("Logged In", { theme: "dark" });
      //set token and isAuthenticated to true
      Cookies.set("dev.admin.horeka",res.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      //Catch and display error
      toast.error("Error: " + error.response.data.message, { theme: "dark" });
    }
  };
  if (isAuthenticated) return <Navigate to="/products" />;
  
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <header className="text-3xl text-brand font-bold mb-4">Horeka.app Dashboard</header>
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
      
      <form
        method="POST"
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="phone-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone number:
        </label>
        <div className="relative">
          <div className="absolute text-sm inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            +91
          </div>
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            pattern="[0-9]{10}"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            required
          />
        </div>
        {!submitted && (
          <button
            type="submit"
            className="px-2.5 py-2 relative bg-indigo-50 text-indigo-600 cursor-pointer rounded group overflow-hidden font-medium flex justify-center"
          >
            Request OTP
          </button>
        )}
      </form>
      {submitted && (
        <form
          method="PUT"
          className="flex flex-col gap-2"
          onSubmit={handleFinalSubmit}
        >
          <label
            htmlFor="phone-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            OTP:
          </label>
          <div className="relative">
            <input
              // type="text"
              id="otp-input"
              aria-describedby="login-otp"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // pattern="[1-9]{6}"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="px-2.5 py-2 relative bg-indigo-50 text-indigo-600 cursor-pointer rounded group overflow-hidden font-medium flex justify-center"
          >
            Submit
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default Login;
