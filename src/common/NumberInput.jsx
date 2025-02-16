import React, { useContext } from "react";
import InputField from "./InputField";
import { ProductContext } from "../components/Products/ProductForm";
import { Controller } from "react-hook-form";
import { RestaurantContext } from "../components/Restaurants/RestaurantForm";
// import { RestaurantContext } from "../components/Restaurants/AddRestaurant";
import { OutletContext } from "../components/Restaurants/OutletForm";

const NumberInput = ({ name, label, context }) => {
  let control,
    errors,
    handlePriceFormulaChange,
    handlePurchasePriceChange,
    handleMoqSalePriceChange;
  if (context === "product") {
    ({
      control,
      errors,
      handlePriceFormulaChange,
      handlePurchasePriceChange,
      handleMoqSalePriceChange,
    } = useContext(ProductContext));
  } else if (context === "outlet") {
    ({ control, errors } = useContext(OutletContext));
  } else {
    ({ control, errors } = useContext(RestaurantContext));
  }

  const handleChange = (name, value) => {
    switch (name) {
      case "priceFormula":
        handlePriceFormulaChange(value);
        break;
      case "purchasePrice":
        handlePurchasePriceChange(value);
        break;
      case "moqSalePrice":
        handleMoqSalePriceChange(value);
        break;
      default:
        break;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col col-span-6">
          <InputField
            label={label}
            value={field.value == 0 ? "" : field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
              context === "product"
                ? handleChange(name, Number(e.target.value))
                : "";
            }}
            type="number"
            step="any"
          />
          {errors[name] && (
            <span className="text-red-500">{errors[name].message}</span>
          )}
        </div>
      )}
    />
  );
};

export default NumberInput;
