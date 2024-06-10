import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Upload_Image() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-2',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async (e) => {
    console.log('before axios upload')
    e.preventDefault();
    const formData = new FormData();
    console.log("fileeeeee ",file);
    formData.append("file", file);
    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData);
      console.log("indide axios")
      setMessage(`File uploaded successfully: ${res.data.fileName}`);
    } catch (err) {
      console.error(err);
      setMessage("Error uploading file");
    }
  };

  return (
    <>
      {/* <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )} */}
      <form
        action="http://localhost:5000/upload"
        method="post"
        enctype="multipart/form-data"
      >
        <input
          type="file"  
          name="images"
          id="images"
          placeholder="Upload images"
        />
        <input type="submit" name="upload" value="Upload" />
      </form>


      {/* <div>
        <h2>File Upload</h2>
        <form
          enctype="multipart/form-data"
          name= "formUpload"
          id="formUpload"
          // action="http://localhost:5000/upload"
          // method="post"
          onSubmit={onFileUpload}
        >
          <input type="file" name="images"
          id="images" onChange={onFileChange} />
          <input type="submit" value="Upload image" onClick={onFileUpload} />
        </form>
        {message && <p>{message}</p>}
      </div> */}
    </>
  );
}

export default Upload_Image;
