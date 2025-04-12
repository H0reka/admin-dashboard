import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import DebouncedInput from "../../common/DebouncedInput";

const PaymentTable = (props) => {
  const columnHelper = createColumnHelper();
  const [data, setData] = useState([...props.data]);
  useEffect(() => {
    console.log(props.data);
  }, []);
  const columns = [
    columnHelper.accessor("number", {
      cell: (info) => <div className="w-4">{info.getValue()}</div>,
      header: "S. No.",
    }),
    columnHelper.accessor("date", {
      cell: (info) => <div className="w-32">{info.getValue()}</div>,
      header: "Date and Time",
    }),
    columnHelper.accessor("outlet", {
      cell: (info) => <div className="w-32">{info.getValue()}</div>,
      header: "Outlet",
    }),
    columnHelper.accessor("restaurant", {
      cell: (info) => <div className="w-40">{info.getValue()}</div>,
      header: "Restaurant",
    }),
    columnHelper.accessor("amount", {
      cell: (info) => <div className="w-16">{info.getValue()}</div>,
      header: "Amount",
    }),
    columnHelper.accessor("mode", {
      cell: (info) => <div className="w-40">{info.getValue()}</div>,
      header: "Mode",
    }),
    columnHelper.accessor("", {
      cell: ({ row }) => (
        <select
          defaultValue={"Pending"}
          className="text-white dark:bg-neutral-900 dark:border-neutral-700 rounded-lg py-3 px-2.5"
          onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
        >
          <option value="REJECT">Failed</option>
          <option value="ACCEPT">Success</option>
        </select>
      ),
      header: "Action",
    }),
  ];

  useEffect(() => {
    setData([...props.data]);
  }, [props.data]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400 ">
      <div className="flex justify-center items-center mb-2 ">
        <div className="w-full flex items-center justify-center md:justify-end gap-1">
          <FaSearch />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 sm:w-52 md:w-1/5 md:focus:w-1/3 focus:w-52 duration-300 border-indigo-500"
            placeholder="Search"
          />
        </div>
      </div>
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

export default PaymentTable;
