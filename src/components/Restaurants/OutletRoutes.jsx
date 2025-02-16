import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { server } from "../../main";
import axios from "axios";
import OutletForm from "./OutletForm";

export const AddOutlet = () => {
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <header className="text-3xl text-brand font-bold">Add Outlet</header>
      <OutletForm />
    </div>
  );
};

export const EditOutlet = () => {
  const token = Cookies.get("dev.admin.horeka");
  const { outletId } = useParams();
  const [initialData, setInitialData] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${server}/admin/outlets/${outletId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setInitialData(res.data));
  }, [outletId]);

  if (!initialData) return <div>Loading....</div>;
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] overflow-y-scroll no-scrollbar h-[90vh]">
      <header className="text-3xl text-brand font-bold">Edit Outlet</header>
      {initialData && (
        <OutletForm initialData={initialData} restaurantId={id} s />
      )}
    </div>
  );
};
