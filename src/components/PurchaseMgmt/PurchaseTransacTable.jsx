import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const PurchaseTransacTable = (props) => {
  const columnHelper = createColumnHelper();
  const [data, setData] = useState();
  const columns = [
    columnHelper.accessor("", {
      cell: (info) => <div>{info.getValue()}</div>,
      header: "ID",
    }),
    columnHelper.accessor("", {
      cell: (info) => <div>₹{info.getValue()}</div>,
      header: "Amount",
    }),
    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Method",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        <img src={info.getValue() || "https://placehold.co/40"} />
      ),
      header: "Transaction Status",
    }),
    columnHelper.accessor("", {
      cell: ({ row }) => (
        <select
          defaultValue={row.original.transaction.transactionStatus}
          className="text-white dark:bg-neutral-900 dark:border-neutral-700 rounded-lg py-3 px-2.5"
          onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
        >
          <option value="INITIATED">Initiated</option>
          <option value="PROCESSING">Processing</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
          <option value="REFUND">Refund</option>
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
          {/* <tbody>
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
            </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default PurchaseTransacTable;
