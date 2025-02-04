import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductTable = (props) => {
  const columnHelper = createColumnHelper();
  const [data, setData] = useState([...props.data]);
  
  const columns = [
    columnHelper.accessor((row) => row.imageUrls[0], {
      id: "SpecificIndex",
      cell: (info) => (
        <img
          src={
            info.getValue()
              ? info.getValue()
              : "https://placehold.co/150"
          }
          alt="..."
          className="w-10 h-10 object-cover"
        />
      ),
      header: "",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <div className="w-96">{info.getValue()}</div>,
      header: "Product",
    }),
    columnHelper.accessor("mrp", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "MRP",
    }),
    columnHelper.accessor("moq", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "MOQ Price",
    }),
    columnHelper.accessor("", {
      cell: (info) => <span>G</span>,
      header: "Late/Urgent",
    }),
    columnHelper.accessor("", {
      cell: ({ row }) => (
        <Link to={`/editproduct/${row.original.id}`}>
          <FaEdit className="cursor-pointer" size={24} />
        </Link>
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

export default ProductTable;
