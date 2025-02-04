import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const TransacTable = (props) => {
  const columnHelper = createColumnHelper();
  const [id, setId] = useState(props.id);
  const [data, setData] = useState([]);
  const token = Cookies.get("dev.admin.horeka");
  useEffect(() => {
    axios
      .get(`/api/payment/outlet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      });
      console.log(data);
  }, []);
  {/*function to correctly format the date*/}
  const handleCreatedAt = (timestamp) => {
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
  const handleStatusChange = async (id, status) =>{
    try{
        const res = await axios.put(`api/payment/${id}?status=${status}`,{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        if(res.status == 200) toast.success("Status Updated");
        else throw new Error();
    }
    catch(err){
        toast.error("Failed to update status");
    }
  }
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <div>{info.getValue()}</div>,
      header: "ID",
    }),
    columnHelper.accessor("amount", {
      cell: (info) => <div>{info.getValue()}</div>,
      header: "Amount",
    }),
    columnHelper.accessor("transactionType", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Transaction Type",
    }),
    columnHelper.accessor("transactionStatus", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Transaction Status",
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => <span>{handleCreatedAt(info.getValue())}</span>,
      header: "Created At",
    }),
    columnHelper.accessor("transactionImage", {
      cell: (info) => <img src={info.getValue() || "https://placehold.co/40"}/>,
      header: "Image",
    }),
    columnHelper.accessor("", {
      cell: ({row}) => (
        <select defaultValue={row.original.transactionStatus=='FAILED'?'REJECT':"ACCEPT"} className="text-white dark:bg-neutral-900 dark:border-neutral-700 rounded-lg py-3 px-2.5" onChange={(e)=>handleStatusChange(row.original.id,e.target.value)}>
          <option value="ACCEPT">Success</option>
          <option value="REJECT">Failed</option>
        </select>
      ),
      header: "Action",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400 ">
      {/* Table */}
      <div className="overflow-y-scroll no-scrollbar grid">
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
              <tr className="text-center max-h-32">
                <td colSpan={12}>No Record Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransacTable;
