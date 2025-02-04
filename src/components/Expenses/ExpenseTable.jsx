import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import InputField from "../../common/InputField";

const ExpenseTable = (props) => {
  const columnHelper = createColumnHelper();
  const [data, setData] = useState([...props.data]);
  const [popUp, setPopup] = useState(false);
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <div className="w-96">{info.getValue()}</div>,
      header: "Product",
    }),
    columnHelper.accessor("stock", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),
    columnHelper.accessor("", {
      cell: ({ row }) => (
        <div>
          <FaPlus
            className="cursor-pointer"
            size={24}
            onClick={(e) => setPopup(true)}
          />
          <FaMinus
            className="cursor-pointer"
            size={24}
            onClick={(e) => setPopup(true)}
          />
        </div>
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
  });

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400 ">
      {/* Table */}
      {popUp && (
        <>
          <div
            onClick={(e) => setPopup(false)}
            className={`w-[200vw] md:w-full h-full flex flex-col absolute top-0 left-0 bg-black/60 z-20  "block" : "hidden"
          overflow-x-hidden`}
          ></div>
          <div className="absolute flex flex-col gap-4 z-40 top-[20%] left-[45%] bg-indigo-600/50 backdrop-blur-lg p-3 rounded-lg">
            <h1 className="text-3xl font-bold text-white">Add Stock</h1>
            <div className="flex flex-col gap-2">
              <InputField label="Quantity" />
              <InputField label="Price" />
            </div>
            <button onClick={(e) => setPopup(false)}>Submit</button>
          </div>
        </>
      )}
      <div className="md:h-[35em] lg:h-[23em] overflow-y-scroll no-scrollbar grid">
        {/* <div className="h-[23em] md:h-[35em] lg:h-[23em] overflow-y-scroll no-scrollbar grid"> */}
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

export default ExpenseTable;
