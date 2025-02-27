import React from "react";
import { Upload } from "./Upload";

export function Popup({ closePopup }) {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-black/30 z-10 py-4 overflow-y-scroll"
      onClick={(event) => closePopup(event)}
      data-testid="popup"
    >
      <div
        className="px-8 py-4 rounded-lg w-[50rem] bg-lightbeige h-fit"
        onClick={handleContentClick}
      >
        <Upload />
      </div>
    </div>
  );
}
