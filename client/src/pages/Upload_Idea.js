import React, { useEffect, useState } from "react";
import Text_Editor from "../utils/Text_Editor";
import axios from "axios";
import Swal from "sweetalert2";
import sanitizeInput from "../utils/SanitizeInput";
import SystemRequirements from "../components/componentCards/components/SystemRequirements";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Upload_Idea() {
  sessionStorage.setItem("location", "/uploadidea");

  const [ideaName, setIdeaName] = useState("");
  const [domain, setDomain] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [sysRequirements, setSysRequirements] = useState("");
  const [contributorId, setContributorId] = useState("");

  const getSysRequirements = (description) => {
    setSysRequirements(sanitizeInput(description));
  };
  const getShortDescription = (description) => {
    setShortDescription(sanitizeInput(description));
  };

  useEffect(() => {
    const user = localStorage.getItem("userId");
    setContributorId(user);
  }, []);

  // Upload the idea
  const handleUpload = async (e) => {
    e.preventDefault();

    // Check for empty required fields
    if (!ideaName || !domain || !shortdescription || !sysRequirements) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return;
    }

    // Collect all data
    const formData = {
      ideaName,
      domain,
      sysRequirements,
      shortdescription,
      contributorId,
    };

    try {
      const response = await axios.post(
        `${SERVER_URL}api/upload/uploadIdea`,
        formData
      );
      const componentId = response.data.newEntity._id;
      const userData = {
        contributorId,
        componentId,
      };
      console.log(componentId);
      const response2 = await axios.put(
        `${SERVER_URL}api/userinfo/updateUserContributions`,
        userData
      );
      console.log("user status", response2);

      // Send to Review Idea
      const reviewResponse = await axios.post(
        `${SERVER_URL}api/upload/sendToReviewIdea`,
        userData
      );
      console.log(reviewResponse);
      Swal.fire({
        title: "Upload Successful",
        text: "Your idea has been uploaded successfully",
        icon: "success",
      }).then(() => {
        // window.location.href = "http://localhost:3000/home";
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
      <section className="text-sm lg:text-lg xl:text-xl w-10/12 p-6 mx-auto  bg-black rounded-lg shadow-md mt-20 mb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl my-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-rose-600 text-center">
          Upload Your Idea
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-3 mt-2 sm:grid-cols-1">
            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="idea-name">
                Idea Name
              </label>
              <input
                id="idea-name"
                name="idea-name"
                type="text"
                className="block w-full lg:w-10/12 px-4 py-2 mt-2 max-w-3xl text-white bg-zinc-800 rounded-md focus:border-blue-500 focus:outline-none"
                placeholder="idea Name"
                value={ideaName}
                onChange={(e) => setIdeaName(sanitizeInput(e.target.value))}
                required
              />
            </div>

            <div className="flex mt-7 flex-col items-center">
              <label className="text-white" htmlFor="select">
                Select Idea Domain
              </label>
              <select
                id="select"
                name="domain"
                className="block  w-full lg:w-10/12 px-4 py-3 mt-2 max-w-3xl text-white bg-zinc-800 rounded-md focus:border-blue-500 focus:outline-none"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              >
                <option value="">Select Domain</option>
                <option value="Other">Other</option>
                <option value="DTS">DTS</option>
                <option value="LM">LM</option>
                <option value="SB">SB</option>
              </select>
            </div>

            <div>
              <div className="flex  mt-7 flex-col items-center">
                <label className="text-white" htmlFor="textarea">
                  System Requirements : languages and libraries
                </label>
                <div className="w-full mx-auto text-black bg-zinc-300 sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 ">
                  <Text_Editor
                    getDescription={getSysRequirements}
                    data={sysRequirements}
                  />
                </div>
              </div>

              <div className="flex mt-7 flex-col items-center">
                <label className="text-white" htmlFor="textarea">
                  Short Description
                </label>
                <div className="w-full mx-auto text-black bg-zinc-300 sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 ">
                  <Text_Editor
                    getDescription={getShortDescription}
                    data={shortdescription}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <button
                className="px-6 py-4 text-2xl leading-5 mb-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-950 focus:outline-none focus:bg-gray-600"
                onClick={handleUpload}
              >
                Upload Your Idea
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Upload_Idea;
