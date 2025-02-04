import React, { useContext, useEffect, useState } from "react";
import UserTable from "./UserTable";
import axios from "axios";
import Button from "../../common/Button";
import Select from "../../common/Select";
import Cookies from "js-cookie";

const userOptions = [
  { Admin: "ADMIN" },
  { Owner: "OWNER" },
  { Manager: "MANAGER" },
  { Rider: "RIDER" },
  { Guest: "GUEST" },
  { "Super Admin": "SUPER_ADMIN" },
];

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState("ADMIN");
  const token = Cookies.get("dev.admin.horeka");
  useEffect(() => {
    axios
      .get(`api/users?role=${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [role]);
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem]">
      <h1 className="text-3xl text-brand font-bold mb-4">Users</h1>
      <div className="flex flex-row justify-between items-center">
        <Button text="Add User" link="/adduser"/>
        <div className="flex flex-row items-center gap-4"><span>Filter: </span><Select options={userOptions} init={"Admin"} func={setRole} /></div>
      </div>
      {userData.length == 0 ? "Loading..." : <UserTable data={userData} />}
    </div>
  );
};

export default Users;
