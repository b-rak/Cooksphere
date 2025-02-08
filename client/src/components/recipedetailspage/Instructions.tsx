import React from "react";

type InstructionsProps = {
  instructions: string[]; // Instructions is an array of strings
};

export function Instructions({ instructions }: InstructionsProps) {
  return (
    <>
      <div className="p-4 bg-brown rounded-xl shadow_2">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white px-4">
          Instructions
          <img src="/spoon.svg" alt="spoon-icon" className="w-5 h-5" />
        </h2>
        <ol className="p-4 flex flex-col gap-4">
          {instructions.map((instruction, index) => (
            <li
              key={index}
              className="p-2 rounded-md bg-lightbeige flex flex-col gap-2"
            >
              <div className="h-fit w-[3.75rem] text-center rounded-md bg-softyellow text-deepbrown font-poppins uppercase text-sm">
                {"Step " + (index + 1)}
              </div>
              {instruction}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
