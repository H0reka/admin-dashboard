import React, { useState, useEffect } from "react";
import InputField from "../../common/InputField";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../common/Button";
import { toast } from "react-toastify";
import { server } from "../../main";

const UpdateChicken = () => {
  const [chickenProds, setChickenProds] = useState([]);
  const [paperPrice, setPaperPrice] = useState(0);
  const [updatedPrices, setUpdatedPrices] = useState([]);
  const token = Cookies.get("dev.admin.horeka");

  useEffect(() => {
    axios.get(`${server}/products/categories/8?size=1000`).then((res) => {
      const array = res.data.content;
      setChickenProds(array);
      const paperPrice = Math.trunc(
        (array[1].moqSalePrice * 100) / array[1].chickenMultiplier / 100
      );
      setPaperPrice(paperPrice);
    });
  }, []);
  useEffect(() => {
    if (paperPrice) {
      const updatedProds = chickenProds.map((prod) => ({
        productId: prod.id,
        moqPrice: paperPrice * prod.chickenMultiplier,
      }));
      setUpdatedPrices(updatedProds);
    }
  }, [paperPrice]);
  const handleSubmit = () => {
    console.log(updatedPrices);
    //API call to update the chicken prices
    try {
      axios.put(
        `${server}/admin/products/chicken`,
        { chickenMoqPriceList: updatedPrices },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Chicken Prices Updated Successfully!");
    } catch (err) {
      toast.error("Some Error Occurred");
    }
  };
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll h-[95vh] no-scrollbar p-3">
      <div className="flex justify-center items-center mb-4 gap-3">
        <InputField
          label="Paper Price"
          onChange={(e) => setPaperPrice(e.target.value)}
          value={paperPrice}
        />
        <div onClick={handleSubmit}>
          <Button text="Submit" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {chickenProds.map((prod, index) => {
          return (
            <div className={"bg-gray-900 rounded-lg p-3 flex flex-row gap-2"}>
              <div>
                <span>{prod.name} </span>
                <span className="text-lg text-indigo-600">
                  x{prod.chickenMultiplier}
                </span>
              </div>
              <div>
                <span className="text-lg text-red-600 font-semibold">
                  {prod.moqSalePrice}
                </span>
                <span className="text-lg"> &#8594; </span>
                <span className="text-lg text-green-600 font-semibold">
                  {Math.trunc(prod.chickenMultiplier * paperPrice * 100) / 100}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpdateChicken;
