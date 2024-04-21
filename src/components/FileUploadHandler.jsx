import React from 'react';

const FileUploadHandler = () => {

  const uploadImage = async (file) => {
    // Placeholder for actual upload logic to upload image and return URL
    console.log("Uploading image", file.name);
    // Simulate async file upload with a timeout and return a mock URL
    const imageUrl = await new Promise((resolve) => {
      setTimeout(() => resolve(`https://example.com/image/${file.name}`), 1000);
    });
    return imageUrl;
  };

  const uploadAttachment = async (file) => {
    // Placeholder for actual upload logic to upload file and return object with URL and text
    console.log("Uploading attachment", file.name);
    // Simulate async file upload with a timeout and return a mock object with URL and text
    const attachmentData = await new Promise((resolve) => {
      setTimeout(() => resolve({ url: `https://example.com/attachment/${file.name}`, text: file.name }), 1000);
    });
    return attachmentData;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    if (file.type.startsWith('image/')) {
      const imageUrl = await uploadImage(file);
      console.log(`Image URL: ${imageUrl}`);
    } else {
      const attachmentData = await uploadAttachment(file);
      console.log(`Attachment uploaded: ${attachmentData.url}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploadHandler;