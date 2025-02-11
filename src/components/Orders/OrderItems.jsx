import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { QuantityPopup } from "./OrderPopups";

const OrderItems = (props) => {
  const [popUp, setPopup] = useState(false);
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "id",
    }),
    columnHelper.accessor("product.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Product",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>₹{info.getValue()}</span>,
      header: "Price",
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Quantity",
    }),
    columnHelper.accessor("deliveredQuantity", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Delivered",
    }),
    columnHelper.accessor("cancelledQuantity", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Cancelled",
    }),
    columnHelper.accessor("pendingCancelQuantity", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Cancel Request",
    }),
    columnHelper.accessor("", {
      cell: ({ row }) => (
        <button onClick={() => setPopup(true)}>
          <FaEdit className="cursor-pointer" size={24} />
        </button>
      ),
      header: "Action",
    }),
  ];
  const [data, setData] = useState([...props.data]);
  useEffect(() => {
    setData([...props.data]);
  }, [props.data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const checkCompleted = (row) => {
    if (row.deliveredQuantity + row.cancelledQuantity == row.quantity)
      return true;
    return false;
  };
  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400 ">
      {popUp && (
        <QuantityPopup popUp={popUp} setPopUp={setPopup} order={props.data} />
      )}
      {/* Table */}
      <div className=" overflow-y-scroll no-scrollbar grid">
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
                    ${
                      checkCompleted(row.original)
                        ? "bg-green-600/50"
                        : "bg-red-600/50"
                    }
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

export default OrderItems;
