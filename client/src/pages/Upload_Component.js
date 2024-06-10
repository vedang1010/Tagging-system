import React, { useEffect, useState } from "react";
import Upload_Image from '../utils/Upload_Image';
import Text_Editor from '../utils/Text_Editor';

function Upload_Component() {
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
  const [languages, setLanguages] = useState("");
  const [libraries, setLibraries] = useState("");
  const [description, setDescription] = useState("");
  const [screenshots, setScreenshots] = useState([]); // assuming Upload_Image component handles files
  // for tags
  const [searchInput, setSearchInput] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);
  const [selectedTags, setSelectedTags] = useState([]);

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

  // tag remove on click
  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  // getting descriptions
  const getDescription = (description)=>{
    console.log("description");
    setDescription(description);
  }

  // upload the component
  const handleUpload = (e) => {
    e.preventDefault();

    // Collect all data
    const formData = {
      componentName,
      domain,
      selectedTags,
      languages,
      libraries,
      description,
      screenshots,
    };

    // Log collected data (for debugging)
    console.log("Form Data: ", formData);
  };

  return (
    <>
      <section className=" w-10/12 p-6 mx-auto  bg-indigo-500 rounded-lg shadow-md mt-20 mb-20">
        <h1 className="text-4xl mb-10 font-bold text-white text-center">
          Upload Your Component
        </h1>
        <form onSubmit={handleUpload}>
          <div className="grid grid-cols-1 gap-3 mt-2 sm:grid-cols-1">
            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="component-name">
                Component Name
              </label>
              <input
                id="component-name"
                name="component-name"
                type="text"
                className="block w-10/12 px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-500 rounded-md focus:border-blue-900 focus:outline-none focus:ring"
                placeholder="Component Name"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="select">
                Select Component Domain
              </label>
              <select
                id="select"
                name="domain"
                className="block  w-10/12 px-3 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                <option>Other</option>
                <option>DTS</option>
                <option>LM</option>
                <option>SB</option>
              </select>
            </div>

            <div className="container mx-auto px-4 w-11/12">
              <div className="mb-4">
                <h2 className="text-xl m-4 text-white ">Select Your Tags #</h2>
                <div className="form-group">
                  <input
                    type="search"
                    className="form-control border rounded-lg p-2 w-4/5"
                    id="search"
                    placeholder="Search Your Tag..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
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

              <div className="searchable-container mt-10">
                {filteredTags.map((tag) => (
                  <div key={tag} className="inline-block mr-3 mb-2">
                    <button
                      type="button"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-full"
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="email-address">
                Languages Used
              </label>
              <input
                id="Languages"
                type="Languages"
                name="Languages"
                placeholder="Languages Used..."
                className="block w-10/12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="email-address">
                Libraries and Dependencies
              </label>
              <input
                id="Libraries"
                type="Libraries"
                name="Libraries"
                placeholder="Required Libraries and Dependencies... "
                className="block w-10/12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={libraries}
                onChange={(e) => setLibraries(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="textarea">
                Description & Usage
              </label>
              <div className="w-10/12 mx-auto  bg-white ">
              <Text_Editor getDescription={getDescription} /> 
              </div>
            </div>

            <div className="w-full max-w-md mx-auto">
              <label className="block text-md mt-5 mb-2 font-medium text-white">
                Upload Preview Screenshots
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                  
                  {/* using direct Upload Module from ant design*/}
                  <Upload_Image value={screenshots} onChange={setScreenshots} />

                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button className="px-6 py-2 leading-5 mb-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-900 focus:outline-none focus:bg-gray-600" type="submit">
              Upload Your Component
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Upload_Component;
