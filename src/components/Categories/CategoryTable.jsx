import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
// import DownloadBtn from "./DownloadBtn";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoryTable = (props) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("imageUrl", {
      id: "SpecificIndex",
      cell: (info) => (
        <img
          src={
            info.getValue()
              ? info.getValue()
              : "https://via.placeholder.com/150"
          }
          alt="..."
          className="w-10 h-10 object-cover"
        />
      ),
      header: "",
    }),
    columnHelper.accessor("name", {
      cell: ({ row }) => (
        <Link to={`/?category=${row.original.id}`}>{row.original.name}</Link>
      ),
      header: "Category",
    }),
    columnHelper.accessor("", {
      cell: ({ row }) => (
        <Link to="/addcategory" state={{ data: row.original }}>
          <FaEdit className="cursor-pointer" size={24} />
        </Link>
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

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400 ">
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

export default CategoryTable;
