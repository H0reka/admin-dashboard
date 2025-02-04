import React, { createContext, useEffect, useState } from "react";
import * as yup from "yup";
import InputField from "../../common/InputField";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../common/Button";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import TextInput from "../../common/TextInput";
import NumberInput from "../../common/NumberInput";
import Interface from "../../common/Image/Interface";
import { AddStorage, AddUnit } from "./ProductPopups";
import { toast } from "react-toastify";
import uploadToS3 from "../../common/Image/UploadToS3";

const productSchema = yup.object().shape({
  name: yup.string().required().min(1),
  priceFormula: yup.number(),
  description: yup.string().required().min(1),
  mrp: yup.number(),
  brand: yup.string(),
  purchasePrice: yup.number().typeError("Purchase Price is required"),
  moq: yup.number(),
  gstPercentage: yup.number(),
  moqSalePrice: yup.number(),
  hsnCode: yup.string(),
  discount: yup.number(),
  returnWindow: yup.number(),
  unitId: yup.number(),
  unitQuantity: yup.number(),
  storageTypeId: yup.number(),
  categoryId: yup.number(),
  bulkDetails: yup.array().of(
    yup.object({
      bulkPriceFormula: yup.number(),
      minBulkQuantity: yup.number(),
      bulkCalculatedPrice: yup.number(),
    })
  ),
  nonVeg: yup.boolean(),
  imageUrls: yup.array().of(yup.string()),
});
export const ProductContext = createContext();

const ProductForm = ({ initialData, submitFunction }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      priceFormula: initialData?.priceFormula || 1,
      description: initialData?.description || "",
      mrp: initialData?.mrp || 0,
      brand: initialData?.brand || "",
      purchasePrice: initialData?.purchasePrice || 1,
      moq: initialData?.moq || 1,
      gstPercentage: initialData?.gstPercentage || 0,
      moqSalePrice: initialData?.moqSalePrice || 1,
      hsnCode: initialData?.hsnCode || "",
      discount: initialData?.discount || 0,
      returnWindow: initialData?.returnWindow || 0,
      unitId: initialData?.unit.id || 1,
      unitQuantity: initialData?.unitQuantity || 0,
      storageTypeId: initialData?.storageType.id || 1,
      categoryId: initialData?.category.id || 1,
      bulkDetails: initialData?.bulkDetails || [],
      nonVeg: initialData?.nonVeg || false,
      imageUrls: initialData?.imageUrls || [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "bulkDetails",
    control,
  });
  const [unitOptions, setUnitOptions] = useState([]);
  const [storageOptions, setStorageOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [images, setImages] = useState(initialData?.imageUrls || []);
  const [popUp, setPopup] = useState({ storage: false, unit: false });
  const priceFormula = watch("priceFormula");
  const purchasePrice = watch("purchasePrice");
  const moqSalePrice = watch("moqSalePrice");

  const handlePriceFormulaChange = (value) => {
    setValue("priceFormula", value);
    setValue("moqSalePrice", value * purchasePrice || 1); // Calculate moq
  };
  const handlePurchasePriceChange = (value) => {
    setValue("purchasePrice", value);
    setValue("moqSalePrice", value * priceFormula || 1); // Calculate moq
  };
  const handleMoqSalePriceChange = (value) => {
    setValue("moqSalePrice", value);
    setValue("priceFormula", value / purchasePrice || 1); // Calculate formula
  };
  const handleImageUpdate = async (blob, url) => {
    const temp = await uploadToS3(blob);
    console.log(temp);
    const updated = [...images, temp];
    const arrayToDisplay = [];
    setImages(updated);
    setImagesToDosplay(updated);
    setValue("imageUrls", updated);
  };
  const handleDeleteImage = (index) => {
    const array = [...images];
    array.splice(index, 1);
    setImages(array);
    setValue("imageUrls", array);
  };
  const token = Cookies.get("dev.admin.horeka");
  const onSubmit = async (data) => {
    if (initialData) {
      let nonVeg = Boolean(data.nonVeg);
      const payload = {
        ...data,
        id: initialData?.id,
        imageUrls: images,
        nonVeg,
      };
      //API call to update the product
      try {
        await axios.put("/api/products", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product Updated Successfully!");
      } catch (err) {
        toast.error("Some Error Occurred");
      }
    } else {
      //API call to post new product
      try {
        await axios.post("/api/products", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product Updated Successfully!");
      } catch (err) {
        toast.error("Some Error Occurred");
      }
    }
  };
  useEffect(() => {
    try {
      axios
        .get("/api/units", {
          headers: {
            Authorization: `Bearer ${Cookies.get("dev.admin.horeka")}`,
          },
        })
        .then((res) => setUnitOptions(res.data));
      axios
        .get("/api/storageTypes", {
          headers: {
            Authorization: `Bearer ${Cookies.get("dev.admin.horeka")}`,
          },
        })
        .then((res) => setStorageOptions(res.data));
      axios
        .get("/api/categories", {
          headers: {
            Authorization: `Bearer ${Cookies.get("dev.admin.horeka")}`,
          },
        })
        .then((res) => setCategoryOptions(res.data));
    } catch (err) {
      console.log(err);
    }
  }, []);
  const toggleStoragePopup = () =>
    setPopup((prev) => ({ ...prev, storage: !prev.storage, unit: false }));
  const toggleUnitPopup = () =>
    setPopup((prev) => ({ ...prev, storage: false, unit: !prev.unit }));
  return (
    <ProductContext.Provider
      value={{
        control,
        errors,
        handleMoqSalePriceChange,
        handlePriceFormulaChange,
        handlePurchasePriceChange,
      }}
    >
      <div className=" py-16 text-black ">
        <form
          className="col-span-12 grid md:grid-cols-12 gap-2 px-28 justify-between items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput name="name" label="Product Name" context="product" />
          <NumberInput
            name="priceFormula"
            label="Price Formula"
            context="product"
          />
          <TextInput
            name="description"
            label="Product Description"
            context="product"
          />
          <NumberInput name="mrp" label="MRP" context="product" />
          <TextInput name="brand" label="Brand Name" context="product" />
          <NumberInput
            name="purchasePrice"
            label="Purchase Price"
            context="product"
          />
          <div
            className="col-span-6 flex flex-row items-center gap-3 "
            context="product"
          >
            {categoryOptions.length > 0 && (
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <select
                    className="px-2.5 py-4 relative text-sm rounded-md group overflow-hidden font-medium dark:bg-neutral-900 dark:border-neutral-700 text-white flex justify-center items-center"
                    {...field}
                  >
                    {categoryOptions.map((unit) => (
                      <option
                        key={Object.values(unit)[0]}
                        value={Object.values(unit)[0]}
                      >
                        {Object.values(unit)[1]}
                      </option>
                    ))}
                  </select>
                )}
              />
            )}
            <Link
              to="/addcategory"
              className="text-brand font-semibold text-lg"
            >
              ADD CATEGORY
            </Link>
          </div>
          <NumberInput
            name="moq"
            label="Minimum Order Quantity"
            context="product"
          />
          <div className="col-span-6 flex flex-row items-center gap-3 ">
            {unitOptions.length > 0 && (
              <Controller
                name="unitId"
                control={control}
                render={({ field }) => (
                  <select
                    className="px-2.5 py-4 relative text-sm rounded-md group overflow-hidden font-medium dark:bg-neutral-900 dark:border-neutral-700 text-white flex justify-center items-center"
                    {...field}
                  >
                    {unitOptions.map((unit) => (
                      <option
                        key={Object.values(unit)[0]}
                        value={Object.values(unit)[0]}
                      >
                        {Object.values(unit)[1]}
                      </option>
                    ))}
                  </select>
                )}
              />
            )}
            <Controller
              name="unitQuantity"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Quantity"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value) || "")}
                />
              )}
            />
            <input
              onClick={toggleUnitPopup}
              className="text-brand cursor-pointer font-semibold text-lg"
              value="ADD UNIT"
              type="button"
            />
            {popUp.unit && (
              <AddUnit popUp={popUp.unit} setPopup={toggleUnitPopup} />
            )}
          </div>
          <NumberInput name="gstPercentage" label="GST %" context="product" />

          <div className="col-span-6 flex flex-row items-center gap-3 ">
            {storageOptions.length > 0 && (
              <Controller
                name="storageTypeId"
                control={control}
                render={({ field }) => (
                  <select
                    className="px-2.5 py-4 relative text-sm rounded-md group overflow-hidden font-medium dark:bg-neutral-900 dark:border-neutral-700 text-white flex justify-center items-center"
                    {...field}
                  >
                    {storageOptions.map((unit) => (
                      <option
                        key={Object.values(unit)[0]}
                        value={Object.values(unit)[0]}
                      >
                        {Object.values(unit)[1]}
                      </option>
                    ))}
                  </select>
                )}
              />
            )}
            <input
              onClick={toggleStoragePopup}
              className="text-brand cursor-pointer font-semibold text-lg"
              value="ADD STORAGE"
              type="button"
            />
            {popUp.storage && (
              <AddStorage popUp={popUp.storage} setPopup={toggleStoragePopup} />
            )}
          </div>
          <NumberInput
            name="moqSalePrice"
            label="MOQ Sale Price"
            context="product"
          />
          <TextInput name="hsnCode" label="HSN Code" context="product" />
          <NumberInput name="discount" label="MOQ Discount" context="product" />
          <NumberInput
            name="returnWindow"
            label="Return Window (hrs)"
            context="product"
          />
          {/* Veg or Non Veg toggle button*/}
          <label className="inline-flex items-center cursor-pointer col-span-6  gap-2">
            <span className="text-white">Veg</span>
            <input
              type="checkbox"
              {...register("nonVeg")}
              className="sr-only peer"
              defaultChecked={initialData?.nonVeg}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-green-400  dark:peer-focus:ring-red-800 rounded-full peer dark:bg-green-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            <span className=" text-white">Non Veg</span>
          </label>
          {/* Bulk Quantity Add*/}
          <div className="col-span-12 m-3 text-white flex flex-col gap-2">
            <div className="flex flex-row items-center gap-72">
              <p className="font-semibold">BULKS</p>
              <button
                type="button"
                className="block rounded-lg"
                onClick={() =>
                  append({
                    minBulkQuantity: 0,
                    bulkCalculatedPrice: 0,
                    bulkPriceFormula: 0,
                  })
                }
              >
                <FaPlus />
              </button>
            </div>
            {fields.map((field, index) => {
              const bulkQty = watch(`bulkDetails.${index}.minBulkQuantity`);
              const formula = watch(`bulkDetails.${index}.bulkPriceFormula`);
              const calcPrice = bulkQty * formula * moqSalePrice || "";
              setValue(`bulkDetails.${index}.bulkCalculatedPrice`, calcPrice);
              return (
                <div
                  key={field.id}
                  className="grid grid-cols-12 gap-1 items-center"
                >
                  <Controller
                    name={`bulkDetails.${index}.minBulkQuantity`}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        label="Qty"
                        addclass={"col-span-4 lg:col-span-2"}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name={`bulkDetails.${index}.bulkPriceFormula`}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        label="Formula"
                        addclass={"col-span-4 lg:col-span-3"}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name={`bulkDetails.${index}.bulkCalculatedPrice`}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        label="Price"
                        disabled={true}
                        addclass={"col-span-4 lg:col-span-3"}
                        value={calcPrice}
                        onChange={() => {}}
                      />
                    )}
                  />
                  <button onClick={() => remove(index)}>
                    <FaMinus />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="col-span-12 flex flex-col gap-2">
            <p className="font-semibold text-white">IMAGES</p>
            <div className="flex flex-row gap-2 flex-wrap">
              <Interface
                onUpdate={handleImageUpdate}
                currentUsage={"products"}
              />
              {images.map((image, index) => (
                <div key={index} className="group relative bg-gray-300">
                  <img
                    key={index}
                    src={image}
                    className="h-40 rounded-md z-10"
                  />
                  <div
                    className="transition transform 
            translate-y-4 ease-in-out invisible 
            absolute group-hover:visible pr-10 
            pl-10 ml-7 py-2 bg-blue-500 z-20
            text-white group-hover:translate-y-0 top-32 rounded-lg cursor-pointer"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <FaTrash />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="md:col-span-12 mt-12 flex bg-white p-4 rounded-lg text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-200 justify-center">
            Submit
          </button>
        </form>
      </div>
    </ProductContext.Provider>
  );
};

export default ProductForm;
