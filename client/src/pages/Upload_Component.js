import React, { useEffect, useState } from "react";
import Upload_File from "../utils/Upload_File";
import Text_Editor from "../utils/Text_Editor";
import axios from "axios";
import Swal from "sweetalert2";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function Upload_Component() {
  sessionStorage.setItem("location","/uploadcomponent")

  // tags of component
  const tags = [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "Python",
    "Django",
  ];

  // state variables
  const [componentName, setComponentName] = useState("");
  const [domain, setDomain] = useState("Other");
  const [shortdescription, setShortDescription] = useState("");
  const [largedescription, setLargeDescription] = useState("");
  const [sysRequirements, setSysRequirements] = useState("");
  const [file, setFile] = useState("");
  const [screenshot, setScreenshot] = useState("");
  // for tags
  const [searchInput, setSearchInput] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTagInput, setCustomTagInput] = useState("");
  // const user = localStorage.getItem("user");

  // for showing filtered tags on search
  useEffect(() => {
    const filtered = tags.filter((tag) =>
      tag.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [searchInput]);

  // tag selection on click
  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFile = (data) => {
    setFile(data);
  };

  const handleScreenshot = (data) => {
    setScreenshot(data);
  };

  // tag remove on click
  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  // getting descriptions
  const getShortDescription = (description) => {
    setShortDescription(description);
  };
  const getLargeDescription = (description) => {
    setLargeDescription(description);
  };
  const getSysRequirements = (description) => {
    setSysRequirements(description);
  };

  const handleCustomTag = (e) => {
    e.preventDefault();
    handleTagSelect(customTagInput);
    setCustomTagInput("");
  };

  // upload the component
  const handleUpload = async (e) => {
    e.preventDefault();

    // Collect all data
    const formData = {
      componentName,
      domain,
      selectedTags,
      shortdescription,
      largedescription,
      sysRequirements,
      file,
      screenshot,
    };
    // Log collected data (for debugging)
    console.log("Form Data: ", formData);
    // try {
    //   const response = await axios.post(
    //     `${SERVER_URL}api/upload/uploadComponent`,
    //     formData
    //   );
    //   Swal.fire({
    //     title: "Upload Successful",
    //     text: "Your component has been uploaded successfully",
    //     icon: "success",
    //   }).then(() => {
    //     window.location.href = "http://localhost:3000/";
    //   });
    // } catch (error) {
    //   Swal.fire({
    //     title: "Upload Failed",
    //     text: "There was an error uploading your component",
    //     icon: "error",
    //   });
    // }
  };

  return (
    <>
      <section className="text-lg w-10/12 p-6 mx-auto  bg-black rounded-lg shadow-md mt-20 mb-20">
        <h1 className="text-5xl my-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-rose-600 text-center">
          Upload Your Component
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-3 mt-2 sm:grid-cols-1">
            <div className="flex flex-col items-center">
              <label className="text-white text-xl" htmlFor="component-name">
                Component Name
              </label>
              <input
                id="component-name"
                name="component-name"
                type="text"
                className="block w-10/12 px-4 py-2 mt-2 max-w-3xl text-white bg-zinc-800 rounded-md focus:border-blue-500 focus:outline-none"
                placeholder="Component Name"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-4 items-center">
              <label className="text-white" htmlFor="select">
                Select Component Domain
              </label>
              <select
                id="select"
                name="domain"
                className="block w-10/12 px-4 py-3 mt-2 max-w-3xl text-white bg-zinc-800 rounded-md focus:border-blue-500 focus:outline-none "
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                <option>Other</option>
                <option>DTS</option>
                <option>LM</option>
                <option>SB</option>
              </select>
            </div>

            <div className="container mx-auto mt-4 px-4 w-11/12">
              <div className="mb-0">
                <h2 className="m-4 text-white ">Select / Add Your #Tags</h2>
                <div className="form-group">
                  <input
                    type="search"
                    className="form-control text-white max-w-lg bg-zinc-800 mb-3 rounded-lg p-2 w-4/5 focus:outline-none"
                    id="search"
                    placeholder="Search Your Tag..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="searchable-container mt-7 w-8/12 mx-auto">
                {/* predefined tags */}
                {filteredTags.map((tag) => (
                  <div key={tag} className="inline-block mr-3 mb-2">
                    <button
                      type="button"
                      className="px-5 py-1 bg-blue-500 text-white rounded-full"
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              {/* custom tags */}
              <div className="mt-4">
                <input
                  type="text"
                  className="form-control text-white max-w-lg bg-zinc-800 mb-3 rounded-lg p-2 w-4/5 focus:outline-none"
                  id="custom-tag"
                  placeholder="Add Your Custom Tag..."
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                />
                <button
                  className="px-4 py-3 m-2 text-lg leading-5 mb-5  text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-800 focus:outline-none"
                  onClick={(event)=>{handleCustomTag(event)}}
                >
                  Add Tag
                </button>
              </div>
              <div className="max-w-2xl rounded-lg p-1 flex mx-auto">
                {/* filtered tags */}
                <div className="flex flex-wrap justify-center py-3 px-1 gap-2 rounded-2xl">
                  {selectedTags.map((tag) => (
                    <div
                      key={tag}
                      className=" bg-indigo-900 text-white px-5 py-1 rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-3 text-lg"
                        onClick={() => handleTagRemove(tag)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-7 flex-col items-center">
                <label className="text-black" htmlFor="textarea">
                  Short Description
                </label>
                <div className="w-8/12 mx-auto text-black bg-zinc-300 ">
                  <Text_Editor getDescription={getShortDescription} />
                </div>
              </div>

              <div className="flex mt-7 flex-col items-center">
                <label className="text-white" htmlFor="textarea">
                  Long Description
                </label>
                <div className="w-8/12 mx-auto text-black bg-zinc-300 ">
                  <Text_Editor getDescription={getLargeDescription} />
                </div>
              </div>

              <div className="flex  mt-7 flex-col items-center">
                <label className="text-white" htmlFor="textarea">
                  System Requirements : languages and libraries
                </label>
                <div className="w-8/12 mx-auto text-black bg-zinc-300 ">
                  <Text_Editor getDescription={getSysRequirements} />
                </div>
              </div>
            </div>

            <div className="w-full mt-7 max-w-md mx-auto">
              <label className="block text-md mt-5 mb-2 font-medium text-white text-center">
                Upload Preview Screenshots
              </label>
              <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* used cloudinary to upload file on cloud */}
                  <Upload_File handleOperation={handleScreenshot} />

                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="w-full mt-7 max-w-md mx-auto">
              <label className="block text-md mt-5 mb-2 font-medium text-white text-center">
                Upload files and zips
              </label>
              <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1">
                  <svg
                    class="h-12 w-12 justify-center text-center text-gray-800 dark:text-white"
                    className="mx-auto h-12 w-12 text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.293 9.293a1 1 0 0 1 0 1.414L9.414 14l1.293 1.293a1 1 0 0 1-1.414 1.414l-2-2a1 1 0 0 1 0-1.414l2-2a1 1 0 0 1 1.414 0Zm2.586 1.414a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414L14.586 14l-1.293-1.293Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* used cloudinary to upload file on cloud */}
                  <Upload_File handleOperation={handleFile} />

                  <p className="text-xs text-white">PDF, ZIP, Tar up to 5MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-14">
            <button
              className="px-6 py-4 text-2xl leading-5 mb-5  text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-950 focus:outline-none focus:bg-gray-600"
              onClick={handleUpload}
            >
              Upload Your Component
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Upload_Component;
