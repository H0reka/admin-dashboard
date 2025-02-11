import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { server } from "../../main";

const PoolOrders = () => {
  const location = useLocation();
  const { value, orderStatus } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const token = Cookies.get("dev.admin.horeka");
  const fromDate = value.startDate
    ? new Date(value.startDate).toISOString()
    : null;
  const toDate = value.endDate ? new Date(value.endDate).toISOString() : null;
  const [itemMap, setItemMap] = useState(new Map());

  useEffect(() => {
    axios
      .get(
        `${server}/admin/orders/pool?size=10000&sortBy=createdAt&sortDirection=asc&${
          orderStatus ? `orderStatus=${orderStatus}` : ""
        }&${fromDate && toDate ? `from=${fromDate}&to=${toDate}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const newItemMap = new Map();
        res.data.content.map((orderItems) => {
          orderItems.orderItems.map((item) => {
            const categoryName = item.categoryName;
            const unitName = item.unitName;
            const productName = item.productName;
            const qty = item.quantity;
            if (!newItemMap.get(categoryName)) {
              newItemMap.set(categoryName, new Map());
            }
            const categoryMap = newItemMap.get(categoryName);

            if (!categoryMap.get(unitName)) {
              categoryMap.set(unitName, new Map());
            }
            const unitMap = categoryMap.get(unitName);

            if (!unitMap.get(productName)) {
              unitMap.set(productName, 0);
            }
            unitMap.set(productName, unitMap.get(productName) + qty);
          });
        });
        setItemMap(newItemMap);
        let countProds = 0;
        let countItems = 0;
        [...newItemMap.entries()].forEach(([categoryName, categoryMap]) => {
          [...categoryMap.entries()].forEach(([unitName, unitMap]) => {
            countProds = countProds + unitMap.size;
            [...unitMap.entries()].forEach(([productName, qty]) => {
              countItems = countItems + qty;
            });
          });
        });
        setTotalItems(countItems);
        setTotalProducts(countProds);
        setLoading(false);
      });
  }, []);
  const copyToClipboard = () => {
    let copytext = "";

    [...itemMap.entries()].forEach(([categoryName, categoryMap]) => {
      copytext += categoryName + "\n";
      [...categoryMap.entries()].forEach(([unitName, unitMap]) => {
        [...unitMap.entries()].forEach(([productName, qty]) => {
          copytext += `${productName}: \t${qty}${unitName}\n`;
        });
      });
      copytext += "\n" + "\n";
    });
    navigator.clipboard.writeText(copytext).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll h-[90vh] no-scrollbar">
      <header className="text-3xl text-brand font-bold">
        Pool Order Summary
      </header>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span>Total Items: {totalItems}</span>
          <span>Total Products: {totalProducts}</span>
        </div>
        <div>
          <button
            className="bg-white text-black p-3 rounded-lg"
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
      <div className="p-3">
        {itemMap.size > 0 &&
          [...itemMap.entries()].map(([categoryName, categoryMap]) => (
            <div key={categoryName}>
              <h2 className="bg-indigo-500 w-full text-black p-3 font-bold">
                {categoryName}
              </h2>
              {[...categoryMap.entries()].map(([unitName, unitMap]) => (
                <div key={unitName} className="grid grid-cols-2">
                  {[...unitMap.entries()].map(([productName, qty]) => (
                    <div
                      key={productName}
                      className={`bg-gray-900 text-white flex flex-row justify-between p-3`}
                    >
                      <p>{productName} </p>
                      <div className="flex flex-row">
                        <span className="text-indigo-500 font-bold text-xl">
                          {qty}
                        </span>
                        {unitName}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PoolOrders;
