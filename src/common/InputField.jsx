import React from 'react';

const InputField = ({ label, value ='', onChange, ...props }) => {
  return (
    <div className={` space-y-3 col-span-6 ${props.addclass}`}>

    <div className="relative">
      <input  id="hs-floating-input-email" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:focus:ring-neutral-600
      focus:pt-6
      focus:pb-2
      [&:not(:placeholder-shown)]:pt-6
      [&:not(:placeholder-shown)]:pb-2
      autofill:pt-6
      autofill:pb-2"
      placeholder=""
      value={value}
      onChange={onChange}
      {...props}/>
      <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
        peer-focus:scale-90
        w-[-webkit-fill-available]
        peer-focus:translate-x-0.5
        peer-focus:-translate-y-1.5
        peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
        peer-[:not(:placeholder-shown)]:scale-90
        peer-[:not(:placeholder-shown)]:translate-x-0.5
        peer-[:not(:placeholder-shown)]:-translate-y-1.5
        peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">{label}</label>
    </div>
  </div>
  );
};

export default InputField;


