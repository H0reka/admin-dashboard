import React, { useEffect } from "react";

const Select = (props) => {
  const onChange = (event) => {
    props.func(event.target.value);
  };
  var data = props.init;
  useEffect(()=>{
    data = props.init;
  },[props.init])
  return (
    <select
      onChange={onChange}
      className="px-2.5 py-2 relative rounded group overflow-hidden font-medium bg-indigo-50 text-indigo-600 flex justify-center items-center"
      defaultValue={data}
    >
      {props.options.map((option, index) => {
        return <option key={index} value={Object.values(option)[0]}>{Object.keys(option)[0]}</option>;
      })}
    </select>
  );
};

export default Select;
