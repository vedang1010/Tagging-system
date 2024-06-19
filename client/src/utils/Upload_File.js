import React from "react";
import { useState, useEffect } from "react";

// Set your cloud name and unsigned upload preset here:
const CLOUD_NAME = "dwkln0lar";
const UPLOAD_PRESET = "demoApp";

const Chunked = ({ handleOperation }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [cldResponse, setCldResponse] = useState(null);

  const saveUrl = (url) => {
    handleOperation(url);
    console.info("File upload complete.");
  };

  useEffect(() => {
    if (cldResponse && cldResponse.url) {
      saveUrl(cldResponse.url);
    }
  }, [cldResponse]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      console.error("Please select a file.");
      return;
    }

    const uniqueUploadId = generateUniqueUploadId();
    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    setUploading(true);

    const uploadChunk = async (start, end) => {
      const formData = new FormData();
      formData.append("file", file.slice(start, end));
      formData.append("cloud_name", CLOUD_NAME);
      formData.append("upload_preset", UPLOAD_PRESET);
      const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

      console.log(
        `Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${
          end - 1
        }`
      );

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              "X-Unique-Upload-Id": uniqueUploadId,
              "Content-Range": contentRange,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Chunk upload failed.");
        }

        currentChunk++;

        if (currentChunk < totalChunks) {
          const nextStart = currentChunk * chunkSize;
          const nextEnd = Math.min(nextStart + chunkSize, file.size);
          uploadChunk(nextStart, nextEnd);
        } else {
          setUploadComplete(true);
          setUploading(false);

          const fetchResponse = await response.json();
          setCldResponse(fetchResponse);
        }
      } catch (error) {
        console.error("Error uploading chunk:", error);
        setUploading(false);
      }
    };

    const start = 0;
    const end = Math.min(chunkSize, file.size);
    uploadChunk(start, end);
  };

  const generateUniqueUploadId = () => {
    return `uqid-${Date.now()}`;
  };

  return (
    <>
      <div className="display:flex justify-items:center">

      
      <input type="file" className="text-white" onChange={handleFileChange} />
      <button className="px-3 py-1 bg-indigo-600 text-white rounded-full my-4 display: inline-block; hover:bg-indigo-900"  onClick={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {/* {uploadComplete && cldResponse && (
        <div>
          <span className="left">
            <p>Upload response:</p>
            <pre>{JSON.stringify(cldResponse, null, 2)}</pre>
          </span>
        </div>
      )} */}
      </div>
    </>
  );
};

export default Chunked;
