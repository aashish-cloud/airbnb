import axios from "axios";
import React, { useState } from "react";

const PhotoUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data } = await axios.post("/upload-link", { link: photoLink });
    setPhotoLink("");
    setAddedPhotos((prev) => {
      return [...prev, data];
    });
  };

  const uploadPhoto = async (ev) => {
    const photos = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < photos.length; i++) data.append("photos", photos[i]);

    const { data: filenames } = await axios.post("/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setAddedPhotos((prev) => {
      console.log(...filenames);
      return [...prev, ...filenames];
    });
  };

  const deletePhoto = (delPhoto) => {
    setAddedPhotos((prev) => {
      return prev.filter((photo) => photo !== delPhoto);
    });
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="add-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add photo
      </label>

      <div className="col-span-full">
        <div className="mt-2">
          <input
            id="add-photo"
            name="add-photo"
            type="add-photo"
            value={photoLink}
            onChange={(ev) => {
              setPhotoLink(ev.target.value);
            }}
            placeholder="Enter the url for your image"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:outline-none focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
        <button
          onClick={addPhotoByLink}
          className="bg-primary w-full text-white py-2 rounded-lg mt-2 mb-4"
        >
          Add photo
        </button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo, index) => {
            return (
              <div
                className="flex relative overflow-hidden rounded-lg h-38"
                key={index}
              >
                <img
                  className="object-cover h-full w-full"
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt=""
                />
                <button
                  onClick={() => {
                    deletePhoto(photo);
                  }}
                  className="bg-primary rounded-md p-1 bottom-1 right-1 bg-opacity-60 text-white absolute"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        <div className="flex only:col-span-full flex-col justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          {/* <div className="text-center"> */}
          {/* <div className="flex justify-center"> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          {/* </div> */}

          {/* <div className="mt-4 flex text-sm leading-6 text-gray-600"> */}
          <label
            htmlFor="file-upload"
            className="relative text-sm leading-6 mt-2 cursor-pointer rounded-md bg-white font-semibold hover:text-primary"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              multiple
              className="sr-only"
              onChange={uploadPhoto}
            />
          </label>
          {/* </div> */}
          <p className="text-xs text-center leading-5 text-gray-600">
            PNG, JPG up to 10MB
          </p>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default PhotoUploader;
