import React, { useEffect, useState } from "react";
import Text_Editor from "../utils/Text_Editor";
import axios from "axios";
import Swal from "sweetalert2";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Upload_Idea() {
  const [ideaName, setIdeaName] = useState("");
  const [domain, setDomain] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [sysRequirements, setSysRequirements] = useState("");
  const getSysRequirements = (description) => {
    setSysRequirements(description);
  };
  const getShortDescription = (description) => {
    setShortDescription(description);
  };

  //upload the idea
  const handleUpload = async (e) => {
    e.preventDefault();

    // Collect all data
    const formData = {
      ideaName,
      domain,
      sysRequirements,
      shortdescription,
    };
    // Log collected data (for debugging)
    // console.log("Form Data: ", formData);
    try {
      const response = await axios.post(
        `${SERVER_URL}api/upload/uploadIdea`,
        formData
      );
      Swal.fire({
        title: "Upload Successful",
        text: "Your idea has been uploaded successfully",
        icon: "success",
      }).then(() => {
        window.location.href = "http://localhost:3000/";
      });
    } catch (error) {
      Swal.fire({
        title: "Upload Failed",
        text: "There was an error uploading your idea",
        icon: "error",
      });
    }
  };

  return (
    <>
      <section className="text-lg w-10/12 p-6 mx-auto  bg-black rounded-lg shadow-md mt-20 mb-20">
        <h1 className="text-5xl my-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-rose-600 text-center">
          Upload Your Idea
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-3 mt-2 sm:grid-cols-1">
          <div className="flex flex-col items-center">
              <label className="text-white text-xl" htmlFor="idea-name">
                Idea Name
              </label>
              <input
                id="idea-name"
                name="idea-name"
                type="text"
                className="block w-10/12 px-4 py-2 mt-2 max-w-3xl text-white bg-zinc-800 rounded-md focus:border-blue-500 focus:outline-none"
                placeholder="idea Name"
                value={ideaName}
                onChange={(e) => setIdeaName(e.target.value)}
              />
            </div>

            <div className="flex mt-7 flex-col items-center">
              <label className="text-white" htmlFor="select">
                Select idea Domain
              </label>
              <select
                id="select"
                name="domain"
                className="block w-10/12 px-4 py-3 mt-2 max-w-3xl text-white bg-zinc-800 rounded-md focus:border-blue-500 focus:outline-none"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                <option>Other</option>
                <option>DTS</option>
                <option>LM</option>
                <option>SB</option>
              </select>
            </div>

            <div>
            <div className="flex  mt-7 flex-col items-center">
              <label className="text-white" htmlFor="textarea">
                System Requirements : languages and libraries
              </label>
              <div className="w-8/12 mx-auto text-black bg-white ">
                <Text_Editor getDescription={getSysRequirements} />
              </div>
            </div>

            <div className="flex mt-7 flex-col items-center">
              <label className="text-white" htmlFor="textarea">
                Short Description
              </label>
              <div className="w-8/12 mx-auto text-black bg-white ">
                <Text_Editor getDescription={getShortDescription} />
              </div>
            </div>
            </div>
            
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="px-6 py-4 text-2xl leading-5 mb-5  text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-950 focus:outline-none focus:bg-gray-600"
              onClick={handleUpload}
            >
              Upload Your Idea
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Upload_Idea;
