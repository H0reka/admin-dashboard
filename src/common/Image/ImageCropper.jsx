import React, { useState } from "react";
import Cropper from "react-easy-crop";
const ImageCropper = ({ onCropCancel, onCropDone, image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  return (
    <div className="relative items-center justify-center h-96 w-96 border-red-600 border-2">
      <Cropper
        image={image}
        aspect={aspect}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        style={{
          containerStyle: {
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
          },
        }}
      />
      <div className="absolute bottom-0 flex flex-row justify-center gap-2  w-full">
      <input type="button" value="Crop" onClick={() => onCropDone(croppedArea)} className="bg-white rounded-md cursor-pointer text-black p-2"/>
      <input type="button" value="Cancel" onClick={() => onCropCancel(croppedArea)} className="bg-white rounded-md cursor-pointer text-black p-2"/>
      </div>
    </div>
  );
};

export default ImageCropper;
