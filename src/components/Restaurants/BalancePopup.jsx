import React, { useContext, useState } from "react";
import axios from "axios";
import { OutletContext } from "./OutletForm";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { server } from "../../main";

const BalancePopup = ({ id, walletBalance, creditLimit }) => {
  //newBalance is the amount added in wallet/ previous dues
  const [newBalance, setNewBalance] = useState(0);
  //onboardingCreditLimit is the amount set as onboarding credit limit
  const [onboardingCreditLimit, setOnboardingCreditLimit] = useState(0);
  const { popUp, setPopUp, previousDues } = useContext(OutletContext);
  const token = Cookies.get("dev.admin.horeka");
  const handleSubmit = async () => {
    if (previousDues) {
      const payload = {
        outletId: id,
        creditLimit: onboardingCreditLimit,
        walletBalance: onboardingCreditLimit - newBalance,
      };
      //API call to set onboarding balance
      try {
        const res = await axios.put(
          `${server}/admin/payment/outlet/wallet`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status == 200) toast.success("Limit Set!");
        else throw new Error();
      } catch (err) {
        toast.error("Some Error occurred");
      }
    } else {
      const payload = { outletId: id, amount: newBalance };
      console.log(payload);
      //API call to add balance
      try {
        const res = await axios.post(
          `${server}/admin/payment/outlet/cash`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Balance Updated!");
      } catch (err) {
        toast.error("Some Error occurred");
      }
    }
    setPopUp(false);
  };
  return (
    <>
      {popUp && (
        <>
          <div
            className={`w-[200vw] md:w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20  "block" : "hidden"
          overflow-x-hidden`}
            onClick={() => setPopUp(false)}
          ></div>
          {/* Conditionally check which popup box to display */}
          {!previousDues ? (
            <div className="absolute z-30 justify-center top-[30%] flex flex-col gap-3 left-[40%] h-72 w-72 backdrop-blur-xl bg-indigo-500/50 p-4 rounded-lg">
              <h1 className="font-bold text-2xl">Add Balance</h1>
              <h1>
                <span className="font-semibold">Current Balance:</span> ₹
                {walletBalance}
              </h1>
              <h1>
                <span className="font-semibold">Credit limit: </span>₹
                {creditLimit}
              </h1>
              <input
                placeholder="Balance"
                className="p-3 bg-neutral-900 rounded-xl text-white"
                type="number"
                onChange={(e) => setNewBalance(Number(e.target.value))}
              />
              <h1>
                <span className="font-semibold">New Balance:</span> ₹
                {newBalance + walletBalance}
              </h1>
              <div className="flex flex-row justify-end gap-2">
                <input
                  type="button"
                  className="p-2 font-bold text-white"
                  onClick={() => setPopUp(false)}
                  value="Cancel"
                />
                <input
                  type="button"
                  className="p-2 font-bold text-white"
                  onClick={handleSubmit}
                  value="Submit"
                />
              </div>
            </div>
          ) : (
            <div className="absolute z-30 justify-center top-[30%] flex flex-col gap-3 left-[40%] h-72  backdrop-blur-xl bg-indigo-500/50 p-4 rounded-lg">
              <h1 className="font-bold text-2xl">Set Onboarding Balance</h1>
              <input
                placeholder="Limit"
                className="p-3 bg-neutral-900 rounded-xl text-white"
                type="number"
                onWheel={() => document.activeElement.blur()}
                onChange={(e) =>
                  setOnboardingCreditLimit(Number(e.target.value))
                }
              />
              <input
                placeholder="Previous Dues"
                className="p-3 bg-neutral-900 rounded-xl text-white"
                type="number"
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => setNewBalance(Number(e.target.value))}
              />
              <h1>
                <span className="font-semibold">New Onboarding Balance:</span> ₹
                {onboardingCreditLimit - newBalance}
              </h1>
              <div className="flex flex-row justify-end gap-2">
                <input
                  type="button"
                  className="p-2 font-bold text-white"
                  onClick={() => setPopUp(false)}
                  value="Cancel"
                />
                <input
                  type="button"
                  className="p-2 font-bold text-white"
                  onClick={handleSubmit}
                  value="Submit"
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BalancePopup;
