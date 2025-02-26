import React from "react";

export function FileUpload({ error, handleChange }) {
  return (
    <>
      <div className="bg-brown rounded-md p-2">
        <span className="text-white">Image</span>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          className="ml-4 text-white cursor-pointer file:border-none file:rounded-md file:bg-[#FF6F3C] file:text-white file:hover:bg-[#D95427] file:px-2 file:py-1 file:uppercase file:text-sm file:w-fit"
          onChange={handleChange}
        />
        {error && <span className="text-error">Please select an image.</span>}
      </div>
    </>
  );
}
