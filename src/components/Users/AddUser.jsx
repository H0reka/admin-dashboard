import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../common/InputField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userSchema = yup.object().shape({
  phoneNum: yup.string().length(10).required(),
  role: yup.string().required(),
  name: yup.string(),
});
const AddUser = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      phoneNum: "",
      role: "",
      name: "",
    },
  });
  const onSubmit = (data) => {
    data.phoneNum = "+91" + data.phoneNum;
    //API call to add a user
    try {
      axios.put(`${server}/admin/user`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/users");
      toast.success("User Added Successfully!");
    } catch (err) {
      toast.error("Some Error Occurred");
    }
  };
  return (
    <div className="ml-[4.2rem] lg:ml-[10.3rem] p-2">
      <header className="text-3xl text-brand font-bold mb-4">Add User</header>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-items-start items-center gap-2"
      >
        <Controller
          name="phoneNum"
          control={control}
          render={({ field }) => {
            return <InputField label="Phone No. (w/o +91)" {...field} />;
          }}
        />
        <Controller
          name="role"
          control={control}
          defaultValue="ADMIN"
          render={({ field }) => {
            return (
              <select
                className="px-2.5 py-3 overflow-hidden font-medium bg-neutral-900 border-neutral-700 text-white flex justify-center items-center w-52 rounded-lg"
                {...field}
              >
                <option value="ADMIN">Admin</option>
                <option value="OWNER">Owner</option>
              </select>
            );
          }}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return <InputField label="Name" {...field} />;
          }}
        />
        <button className="md:col-span-12 flex bg-white p-4 rounded-lg text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-200 justify-center">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
