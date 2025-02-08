import React, { useRef, useState } from "react";
import InputField from "../../common/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Interface from "../../common/Image/Interface";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import uploadToS3 from "../../common/Image/UploadToS3";
import axios from "axios";
import Cookies from "js-cookie";

function MultiImageCropper() {
  const location = useLocation();
  const categoryData = location.state?.data;
  const token = Cookies.get("dev.admin.horeka");
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: categoryData?.name,
      imageUrl: categoryData?.imageUrl,
    },
  });
  const [imageUrl, setImageUrl] = useState(categoryData?.imageUrl || "");
  const handleImageUpdate = async (updatedArray) => {
    if (categoryData?.imageUrl) {
      //call API to put the image on same URL
      setImageUrl(categoryData.imageUrl);
    } else {
      //call API to post the image on s3 and get the url then add it to imageUrl
      const temp = await uploadToS3(updatedArray, "categories");
      setImageUrl(temp);
      setValue("imageUrl", temp);
    }
  };
  const handleDeleteImage = () => {
    setImageUrl("");
    setValue("imageUrl", "");
  };
  const onSubmit = (data) => {
    console.log(data);
    //API call to add the category
    axios.post("/api/categories", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/categories");
    toast.success("Category Added Successfully!");
  };
  return (
    <div className="ml-40 p-2 overflow-scroll no-scrollbar h-[90vh]">
      <header className="text-3xl text-brand font-bold">Add Category</header>
      <form
        className="flex flex-col gap-2 md:p-8 justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return <InputField label="Category Name" {...field} />;
          }}
        />
        <div className="flex flex-row gap-2 flex-wrap">
          {imageUrl ? (
            ""
          ) : (
            <Interface
              onUpdate={handleImageUpdate}
              currentUsage={"categories"}
            />
          )}
          <div className="group relative bg-gray-300 rounded-lg">
            <img src={imageUrl} className="h-40 rounded-lg z-10" />
            <div
              className="transition transform 
            translate-y-4 ease-in-out invisible 
            absolute group-hover:visible pr-10 
            pl-10 ml-7 py-2 bg-blue-500 z-20
            text-white group-hover:translate-y-0 top-32 rounded-lg cursor-pointer"
              onClick={handleDeleteImage}
            >
              <FaTrash />
            </div>
          </div>
        </div>
        <button className="md:col-span-12 mt-12 flex bg-white p-4 rounded-lg text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-200 justify-center">
          Submit
        </button>
      </form>
    </div>
  );
}

export default MultiImageCropper;
