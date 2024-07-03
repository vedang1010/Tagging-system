import React, { useState } from "react";
import axios from "axios";
import Text_Editor from "../../../utils/Text_Editor";
import Swal from "sweetalert2";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function RaiseIssue() {
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const getIssueDescription = (data) => {
    setDescription(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = {
      name: issueName,
      description: description,
      status: status,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        `${SERVER_URL}api/upload/uploadIssue`,
        formData
      );
      Swal.fire({
        title: "Upload Successful",
        text: "Your issue has been uploaded successfully",
        icon: "success",
      }).then(() => {
        window.location.href = "http://localhost:3000/";
      });
    } catch (error) {
      Swal.fire({
        title: "Upload Failed",
        text: "There was an error uploading your issue. Please try again",
        icon: "error",
      });
    }
  };
  return (
    <>
      <section className="text-sm lg:text-lg xl:text-xl w-10/12 p-6 mx-auto bg-white rounded-lg shadow-md mb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl my-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-600 text-center">
          Raise An Issue
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-3 mt-2 sm:grid-cols-1">
            <div className="flex flex-col items-center">
              <label className="text-black" htmlFor="idea-name">
                Issue Name
              </label>
              <input
                id="issue-name"
                name="issue-name"
                type="text"
                className="block w-full lg:w-10/12  px-4 py-2 mt-2 text-black bg-zinc-200 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Issue Name"
                value={issueName}
                onChange={(e) => setIssueName(e.target.value)}
              />
            </div>

            <div className="flex  mt-7 flex-col items-center">
              <label className="text-black mb-3" htmlFor="textarea">
                Description about your issue
              </label>
              <div className=" w-full lg:w-10/12 mx-auto text-black bg-zinc-200">
                <Text_Editor getDescription={getIssueDescription} data={description} />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="px-6 py-4 text-2xl leading-5 mb-5  text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-800 focus:outline-none focus:bg-gray-600"
              onClick={handleUpload}
            >
              Upload Your Issue
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default RaiseIssue;
