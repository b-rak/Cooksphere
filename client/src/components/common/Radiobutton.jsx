import React from "react";

export function Radiobutton({ id, name, value, text, handleChange }) {
  return (
    <>
      <div>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={(event) => handleChange(event)}
          className="accent-softyellow"
        />
        <label htmlFor={id} className="ml-2">
          {text}
        </label>
      </div>
    </>
  );
}
