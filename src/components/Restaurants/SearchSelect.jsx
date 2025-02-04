import React, { useEffect, useState } from "react";
import InputField from "../../common/InputField";

const SearchSelect = ({options, setPhoneNum, value }) => {
  const [search, setSearch] = useState("");

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    Object.values(option)[1].includes(search)
  );
  return (
    <>
    {options.length > 0 && (
        <div className="grid grid-cols-12 gap-2 col-span-6">
          <InputField
            label="Search"
            value={value?value:search}
            // disabled={value?true:false}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-2.5 py-4 col-span-6 rounded group overflow-hidden font-medium bg-neutral-900 border-neutral-700 flex text-white justify-center items-center"
            // disabled={value?true:false}
            defaultValue={value?value:""}
            onChange={(e)=>setPhoneNum(e.target.value)}
          >
            <option value="" disabled>
              {"Select an option"}
            </option>
            {filteredOptions.map((option) => (
              <option key={Object.values(option)[1]} value={Object.values(option)[1]}>
                {Object.values(option)[3]}{Object.values(option)[1]}
              </option>
            ))}
          </select>
        </div>)}
    </>
  );
};

export default SearchSelect;