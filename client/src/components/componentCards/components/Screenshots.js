import React from "react";
import { useState } from "react";

const Screenshots = (component) => {
  const [modalVisibile, setModalVisibile] = useState(false);
  const [image, setImage] = useState("");

  const openModal = (img) => {
    setImage(img);
    setModalVisibile(true);
  };
  const closeModal = () => {
    setImage("");
    setModalVisibile(false);
  };
  return (
    <section className="">
      <h2>Screenshots Preview</h2>
      <div>
        <div className="flex flex-wrap g-5 m-5">
          {component.component.preview.map((imgurl, index) => (
            <>
              <img
                key={index}
                className="h-40 w-40 m-4"
                src={imgurl}
                alt={`Preview ${index}`}
                onClick={() => {
                  openModal(imgurl);
                }}
              ></img>

              <div className="z-100">
                {modalVisibile && (
                  <>
                    <span
                      className="mt-10 fixed top-10 right-5 text-black text-5xl cursor-pointer"
                      onClick={closeModal}
                    >
                      &times;
                    </span>
                    <div className="fixed h-auto w-auto inset-14  mt-10 bg-black z-100 bg-opacity-40 flex items-center justify-center " style={{zIndex:1301}}>
                      <img
                        className="block"
                        src={image}
                        alt="Modal content"
                        onClick={closeModal}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
