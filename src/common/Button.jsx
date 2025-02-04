import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link
      to={props.link}
      type="button"
      className={`px-2.5 py-2 relative rounded group overflow-hidden font-medium ${props.disabled?"bg-neutral-700 text-black cursor-default":"bg-indigo-50 text-indigo-600 cursor-pointer"}  flex justify-center`}
    >
      <span className={`absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-indigo-600 ${props.disabled?"":"group-hover:h-full"} opacity-90`}></span>
      <span className={`relative ${props.disabled?"":"group-hover:text-white"}`}>{props.text}</span>
    </Link>
  );
};

export default Button;
