import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import axios from "axios";
import Button from "../../common/Button";
import Cookies from "js-cookie";
import { server } from "../../main";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const token = Cookies.get("dev.admin.horeka");
  useEffect(() => {
    axios
      .get(`${server}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategoryList(res.data);
      });
  }, []);
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <h1 className="text-3xl text-brand font-bold mb-4">Categories</h1>
      <Button text="Add Category" link="/addcategory" />
      {categoryList.length == 0 ? (
        "Loading.."
      ) : (
        <CategoryTable data={categoryList} />
      )}
    </div>
  );
};

export default Categories;
