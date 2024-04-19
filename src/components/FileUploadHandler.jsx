import React from 'react';
import { useDispatch } from 'react-redux';
import { addAttachment } from '../store/damageScenarioActions'; // Ensure this action exists and is implemented correctly

const FileUploadHandler = () => {
  const dispatch = useDispatch();

  const uploadImage = async (file) => {
    // Implement logic to upload image and return URL
    console.log("Uploading image", file.name);
    // Placeholder for actual upload logic. Replace with API call or other logic to upload the image and return its URL.
    const imageUrl = await new Promise((resolve) => {
      setTimeout(() => resolve(`https://example.com/image/${file.name}`), 1000); // Simulate async file upload with a timeout
    });
    return imageUrl;
  };

  const uploadAttachment = async (file) => {
    // Implement logic to upload file and return object with URL and text
    console.log("Uploading attachment", file.name);
    // Placeholder for actual upload logic. Replace with API call or other logic to upload the file and return its URL and text.
    const attachmentData = await new Promise((resolve) => {
      setTimeout(() => resolve({ url: `https://example.com/attachment/${file.name}`, text: file.name }), 1000); // Simulate async file upload with a timeout
    });
    return attachmentData;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      if (file.type.startsWith('image/')) {
        const imageUrl = await uploadImage(file);
        dispatch(addAttachment({ type: 'image', url: imageUrl }));
      } else {
        const attachmentData = await uploadAttachment(file);
        dispatch(addAttachment({ type: 'file', ...attachmentData }));
      }
      console.log(`File ${file.name} uploaded successfully.`);
    } catch (error) {
      console.error("Error uploading file:", error.message, error.stack);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploadHandler;