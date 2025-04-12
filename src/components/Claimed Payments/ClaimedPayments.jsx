import React from "react";
import PaymentTable from "./PaymentTable";
const transactions = [
  {
    number: 1,
    date: "2025-02-25 10:30 AM",
    outlet: "Outlet A",
    restaurant: "Restaurant X",
    amount: "$25.50",
    mode: "Credit Card",
    status: "Success",
  },
  {
    number: 2,
    date: "2025-02-24 02:15 PM",
    outlet: "Outlet B",
    restaurant: "Restaurant Y",
    amount: "$40.00",
    mode: "Debit Card",
    status: "Pending",
  },
  {
    number: 3,
    date: "2025-02-23 06:45 PM",
    outlet: "Outlet C",
    restaurant: "Restaurant Z",
    amount: "$15.75",
    mode: "UPI",
    status: "Failed",
  },
  {
    number: 4,
    date: "2025-02-22 08:10 AM",
    outlet: "Outlet D",
    restaurant: "Restaurant A",
    amount: "$60.20",
    mode: "Cash",
    status: "Success",
  },
  {
    number: 5,
    date: "2025-02-21 09:30 PM",
    outlet: "Outlet E",
    restaurant: "Restaurant B",
    amount: "$32.80",
    mode: "Net Banking",
    status: "Success",
  },
  {
    number: 6,
    date: "2025-02-20 11:00 AM",
    outlet: "Outlet F",
    restaurant: "Restaurant C",
    amount: "$20.00",
    mode: "Credit Card",
    status: "Pending",
  },
  {
    number: 7,
    date: "2025-02-19 07:20 PM",
    outlet: "Outlet G",
    restaurant: "Restaurant D",
    amount: "$45.60",
    mode: "UPI",
    status: "Success",
  },
  {
    number: 8,
    date: "2025-02-18 12:40 PM",
    outlet: "Outlet H",
    restaurant: "Restaurant E",
    amount: "$10.50",
    mode: "Debit Card",
    status: "Failed",
  },
  {
    number: 9,
    date: "2025-02-17 04:30 PM",
    outlet: "Outlet I",
    restaurant: "Restaurant F",
    amount: "$28.90",
    mode: "Cash",
    status: "Success",
  },
  {
    number: 10,
    date: "2025-02-16 05:50 PM",
    outlet: "Outlet J",
    restaurant: "Restaurant G",
    amount: "$50.00",
    mode: "Net Banking",
    status: "Pending",
  },
];

const ClaimedPayments = () => {
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <header className="text-3xl text-brand font-bold">
        Claimed Payments
      </header>
      <div className="flex md:flex-row flex-col justify-end p-3">
        <select name="Created At" id="" className="p-3 bg-slate-800 rounded-lg">
          <option value="createdAt">Pending</option>
          <option value="deliveredAt">Failed</option>
          <option value="amount">Success</option>
        </select>
      </div>
      <PaymentTable data={transactions} />
    </div>
  );
};

export default ClaimedPayments;
