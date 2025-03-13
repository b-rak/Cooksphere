import React from "react";

export function Instruction({ number, value, handleChange }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label
          htmlFor={"instruction-" + number}
          className="text-white leading-4 text-sm"
        >
          {"Step " + number}
        </label>
        <textarea
          id={"instruction-" + number}
          name={"instruction-" + number}
          rows="3"
          value={value}
          className="outline-none rounded-md px-1"
          onChange={handleChange}
        ></textarea>
      </div>
    </>
  );
}
