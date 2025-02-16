import React, { useContext } from "react";
import InputField from "./InputField";
import { ProductContext } from "../components/Products/ProductForm";
import { Controller } from "react-hook-form";
// import { RestaurantContext } from '../components/Restaurants/AddRestaurant';
import { RestaurantContext } from "../components/Restaurants/RestaurantForm";
import { OutletContext } from "../components/Restaurants/OutletForm";
const TextInput = (props) => {
  let control, errors;
  if (props.context === "product") {
    ({ control, errors } = useContext(ProductContext));
  } else if (props.context === "outlet") {
    ({ control, errors } = useContext(OutletContext));
  } else {
    ({ control, errors } = useContext(RestaurantContext));
  }
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col col-span-6">
          <InputField
            label={props.label}
            value={field.value}
            onChange={field.onChange}
          />
          {Object.keys(errors).length > 0 && errors[props.name] && (
            <span className="text-red-500">{errors[props.name].message}</span>
          )}
        </div>
      )}
    />
  );
};

export default TextInput;
