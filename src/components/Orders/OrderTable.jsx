import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaEdit, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiderPopup } from "./OrderPopups.jsx";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const OrderTable = (props) => {
  const token = Cookies.get("dev.admin.horeka");
  const handleStatusChange = (status, id) => {
    //API Call to update order status
    try {
      axios.put(`/api/orders/${id}?status=${status}`,{}, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Changed Order Status");
    } catch (err) {
      toast.error("Some Error Occurred");
    }
  };
  {
    /* Function to convert date into desired format */
  }
  const handleCreatedAt = (timestamp) => {
    if (timestamp == null) return "null";
    // Convert to Date object
    const date = new Date(timestamp);

    // Format to include the day of the week
    const options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };
  const columnHelper = createColumnHelper();
  const [data, setData] = useState([...props.data]);
  const [popUp, setPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <div>{info.getValue()}</div>,
      header: "ID",
    }),
    columnHelper.accessor("outlet", {
      cell: (info) => <div className="w-40">{info.getValue().name}</div>,
      header: "Outlet",
    }),
    columnHelper.accessor("orderStatus", {
      cell: ({ row }) => (
        <div className="w-40 flex flex-col items-start gap-2">
          {row.original.orderStatus}
          <select
            className="text-black bg-slate-400  p-3 rounded-lg appearance-none"
            onChange={(e) =>
              handleStatusChange(e.target.value, row.original.id)
            }
            defaultValue={row.original.orderStatus}
          >
            <option disabled>Change Status</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
            <option value="DELIVERED">Delivered</option>
            <option value="PARTIALLY_DELIVERED">Partially Delivered</option>
          </select>
        </div>
      ),
      header: "Order Status",
    }),
    columnHelper.accessor("paymentStatus", {
      cell: (info) => <div>{info.getValue()}</div>,
      header: "Payment Status",
    }),
    columnHelper.accessor("", {
      cell: ({row}) => <div className="w-40">{row.original.rider?.profile.name || "Unassigned"}</div>,
      header: "Rider",
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <div className="w-40">{handleCreatedAt(info.getValue())}</div>
      ),
      header: "Created At",
    }),
    columnHelper.accessor("", {
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/editorder/${row.original.id}`}>
            <FaEdit className="cursor-pointer" size={24} />
          </Link>
          <FaUser
            className="cursor-pointer"
            size={24}
            onClick={() => {
              setPopup(true);
              setOrderId(row.original.id);
            }}
          />
        </div>
      ),
      header: "Actions",
    }),
  ];

  useEffect(() => {
    setData([...props.data]);
  }, [props.data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400 ">
      {popUp && <RiderPopup setPopUp={setPopup} popUp={popUp} orderId={orderId} />}
      {/* Table */}
      <div className="h-[23em] md:h-[35em] lg:h-[23em] overflow-y-scroll no-scrollbar grid">
        <table className="border-collapse border-gray-700 w-auto text-left">
          <thead className="bg-indigo-600 sticky z-10 top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                    ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                    `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Record Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
