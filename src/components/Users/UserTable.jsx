import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
// import DownloadBtn from "./DownloadBtn";
import DebouncedInput from "../../common/DebouncedInput";
import { FaEdit, FaSearch } from "react-icons/fa";
import RiderPopup from "./RiderPopup";

const UserTable = (props) => {
  const [popup, setPopup] = useState(false);
  const [pageInput, setPageInput] = useState("");
  const [id, setId] = useState(0);
  const [data, setData] = useState([...props.data]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();
  const handleVerifyClick = (id) => {
    setPopup(!popup);
    setId(id);
  };
  const handleGoToPage = () => {
    const pageNumber = Number(pageInput) - 1; // Convert input to zero-based index
    if (
      !isNaN(pageNumber) &&
      pageNumber >= 0 &&
      pageNumber < table.getPageCount()
    ) {
      table.setPageIndex(pageNumber);
    }
    setPageInput(""); // Clear input after navigation
  };
  const columns = [
    columnHelper.accessor("phoneNum", {
      cell: (info) => <div className="w-56">{info.getValue()}</div>,
      header: "Phone Number",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <div className="w-96">{info.getValue()}</div>,
      header: "Name",
    }),
    columnHelper.accessor("", {
      cell: ({ row }) => (
        <input
          value="Verify Rider"
          type="button"
          className="w-fit p-3 text-center rounded-lg cursor-pointer hover:drop-shadow-2xl disabled:bg-gray-600/80 disabled:cursor-default bg-white text-black"
          disabled={row.original.role !== "RIDER"}
          onClick={() => handleVerifyClick(row.original.id)}
        />
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
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400 ">
      {popup && id && <RiderPopup popup={popup} setPopup={setPopup} id={id} />}
      <div className="grid mb-2">
        {/* Search */}
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
      {/* Pagination */}
      <div className="flex md:flex-row flex-col items-center justify-center mt-2 gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {"<"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {">"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            className="w-16 p-2 border rounded-md text-center text-black outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Go to"
          />
          <button
            onClick={handleGoToPage}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
            disabled={!pageInput || isNaN(Number(pageInput))}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
