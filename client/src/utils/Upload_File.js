// import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

// // Set your cloud name and unsigned upload preset here:
// const CLOUD_NAME = "dwkln0lar";
// const UPLOAD_PRESET = "demoApp";

// const Chunked = forwardRef(({ handleOperation ,ref}) => {
//   const [files, setFiles] = useState([]);
//   const [complete, setComplete] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadUrls, setUploadUrls] = useState([]);

//   const handleFileChange = (event) => {
//     setFiles(Array.from(event.target.files));
//   };

//   useEffect(() => {
//     if (uploadUrls.length === files.length && files.length > 0) {
//       handleOperation(uploadUrls);
//       console.info("All files upload complete.");
//       setComplete(true);
//     }
//   }, [uploadUrls]);

//   const uploadFiles = async () => {
//     if (files.length === 0) {
//       console.error("Please select files.");
//       return;
//     }

//     setUploading(true);
//     const urls = [];

//     for (const file of files) {
//       const uniqueUploadId = generateUniqueUploadId();
//       const chunkSize = 5 * 1024 * 1024;
//       const totalChunks = Math.ceil(file.size / chunkSize);
//       let currentChunk = 0;

//       const uploadChunk = async (start, end) => {
//         const formData = new FormData();
//         formData.append("file", file.slice(start, end));
//         formData.append("cloud_name", CLOUD_NAME);
//         formData.append("upload_preset", UPLOAD_PRESET);
//         const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

//         console.log(
//           `Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${
//             end - 1
//           }`
//         );

//         try {
//           const response = await fetch(
//             `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
//             {
//               method: "POST",
//               body: formData,
//               headers: {
//                 "X-Unique-Upload-Id": uniqueUploadId,
//                 "Content-Range": contentRange,
//               },
//             }
//           );

//           if (!response.ok) {
//             throw new Error("Chunk upload failed.");
//           }

//           currentChunk++;

//           if (currentChunk < totalChunks) {
//             const nextStart = currentChunk * chunkSize;
//             const nextEnd = Math.min(nextStart + chunkSize, file.size);
//             uploadChunk(nextStart, nextEnd);
//           } else {
//             const fetchResponse = await response.json();
//             urls.push(fetchResponse.url);

//             if (urls.length === files.length) {
//               setUploadUrls(urls);
//               setUploading(false);
//             }
//           }
//         } catch (error) {
//           console.error("Error uploading chunk:", error);
//           setUploading(false);
//         }
//       };

//       const start = 0;
//       const end = Math.min(chunkSize, file.size);
//       await uploadChunk(start, end);
//     }
//   };

//   const generateUniqueUploadId = () => {
//     return `uqid-${Date.now()}`;
//   };

//   useImperativeHandle(ref,()=>({
//     uploadFiles,
//   }));
  
//   return (
//     <>
//       <div className="flex justify-center items-center flex-col">
//         <input
//           type="file"
//           className="text-white text-sm w-24"
//           onChange={handleFileChange}
//           multiple
//         />
//         <button
//           className="px-3 py-1 bg-indigo-600 text-white rounded-full my-4 hover:bg-indigo-900"
//           onClick={uploadFiles}
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Upload Files"}
//         </button>
//         {complete ? (
//           <button className="px-3 py-1 bg-green-700 text-white rounded-full my-4 hover:bg-indigo-900">
//             Upload Complete !
//           </button>
//         ) : (
//           ""
//         )}
//       </div>
//     </>
//   );
// });

// export default Chunked;

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

// Set your cloud name and unsigned upload preset here:
const CLOUD_NAME = "dwkln0lar";
const UPLOAD_PRESET = "demoApp";

const Chunked = forwardRef(({ handleOperation }, ref) => {
  const [files, setFiles] = useState([]);
  const [complete, setComplete] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadUrls, setUploadUrls] = useState([]);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  useEffect(() => {
    if (uploadUrls.length === files.length && files.length > 0) {
      handleOperation(uploadUrls);
      console.info("All files upload complete.");
      setComplete(true);
    }
  }, [uploadUrls]);

  const uploadFiles = async () => {
    if (files.length === 0) {
      console.error("Please select files.");
      return;
    }

    setUploading(true);
    const urls = [];

    for (const file of files) {
      const uniqueUploadId = generateUniqueUploadId();
      const chunkSize = 5 * 1024 * 1024;
      const totalChunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;

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
            const fetchResponse = await response.json();
            urls.push(fetchResponse.url);

            if (urls.length === files.length) {
              setUploadUrls(urls);
              setUploading(false);
            }
          }
        } catch (error) {
          console.error("Error uploading chunk:", error);
          setUploading(false);
        }
      };

      const start = 0;
      const end = Math.min(chunkSize, file.size);
      await uploadChunk(start, end);
    }
  };

  const generateUniqueUploadId = () => {
    return `uqid-${Date.now()}`;
  };

  useImperativeHandle(ref, () => ({
    uploadFiles,
  }));

  return (
    <div className="flex justify-center items-center flex-col">
      <input
        type="file"
        className="text-white text-sm w-24"
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
});

export default Chunked;
