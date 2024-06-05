import React from "react";
import Text_Editor from '../utils/Text_Editor';

function Upload_Idea() {
  return (
    <>
      <section className="w-10/12 p-6 mx-auto  bg-indigo-500 rounded-lg shadow-md mt-20 mb-20">
        <h1 className="text-4xl mb-10 font-bold text-white text-center">
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
                className="block w-10/12 px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-500 rounded-md focus:border-blue-900 focus:outline-none focus:ring"
                placeholder="Idea Name"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="select">
                Select idea Domain
              </label>
              <select
                id="select"
                name="domain"
                className="block  w-10/12 px-3 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>Other</option>
                <option>DTS</option>
                <option>LM</option>
                <option>SB</option>
              </select>
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
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-white" htmlFor="textarea">
                Description & Usage
              </label>
              <div className="w-10/12 mx-auto bg-white ">
                {<Text_Editor/>} 
              </div>
            </div>
             
          </div>

          <div className="flex justify-center mt-10">
            <button className="px-6 py-2 leading-5 mb-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-900 focus:outline-none focus:bg-gray-600">
              Upload Your Idea
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Upload_Idea;
