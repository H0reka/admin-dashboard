import AWS from "aws-sdk";
import {v4} from "uuid";
import {toast} from "react-toastify";
const uploadToS3 = async (blob, currentUsage) => {
  const S3_BUCKET = import.meta.env.VITE_APP_BUCKET_NAME;
  console.log(S3_BUCKET);
  const REGION = import.meta.env.VITE_APP_REGION ;

  AWS.config.update({
    accessKeyId: import.meta.env.VITE_APP_ACCESS,
    secretAccessKey: import.meta.env.VITE_APP_SECRET,
  });

  const s3 = new AWS.S3({
    region: REGION,
  });
  const uuidFile = `${v4()}.jpeg`;
  const fileName = `${
    currentUsage === "categories" ? "categories" : "products"
  }/${uuidFile}`;

  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: blob,
    ContentType: "image/jpeg",
  };

  try {
    // Upload the file to S3
    const data = await s3.upload(params).promise();
    toast.success("Image successfully uploaded to S3.");
    return data.Location;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    toast.error("Failed to upload image to S3.");
    return ;
  }
};

export default uploadToS3;