import "../../../init";
import React, { useState } from "react";
import Input from "./Input";
import ImageCropper from "./ImageCropper";

const Interface = (props) => {
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState("choose-img");
  const allowedTypes = ["image/jpeg", "image/png"];
  const onImageSelected = (selectedImage) => {
    setImage(selectedImage);
    setCurrentPage("crop-img");
  };
  const onCropCancel = () => {
    setCurrentPage("choose-img");
  };
  const onCropDone = (imgCroppedArea) => {
    const canvas = document.createElement("canvas");
    canvas.width = imgCroppedArea.width;
    canvas.height = imgCroppedArea.height;
    const context = canvas.getContext("2d");
    let imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = () => {
      context.drawImage(
        imageObj,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      // Compress and convert the canvas to a Blob
      const compressAndUpload = (canvas, quality = 1.0) => {
        canvas.toBlob(
          async (blob) => {
            if (blob) {
              // Check if Blob size is under 1 MB, adjust quality otherwise
              if (blob.size > 1 * 1024 * 1024) {
                // Reduce quality by 10% and retry
                compressAndUpload(canvas, quality - 0.1);
                return;
              }
              //Send the file to frontend
              const url = URL.createObjectURL(blob);
              props.onUpdate(blob, url);
            }
          },
          "image/jpeg",
          quality
        );
      };
      compressAndUpload(canvas);
      setCurrentPage("choose-img");
    };
  };
  return (
    <div>
      {currentPage == "choose-img" ? (
        <div className="flex flex-row flex-wrap items-center gap-2">
          <Input onImageSelected={onImageSelected} />
        </div>
      ) : (
        <ImageCropper
          image={image}
          onCropCancel={onCropCancel}
          onCropDone={onCropDone}
        />
      )}
      {/* <input type="file" accept="image/*" onChange={handleFileChange}/>
      <button onClick={uploadFile}>Upload Image</button> */}
    </div>
  );
};

export default Interface;
