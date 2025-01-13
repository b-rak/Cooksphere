import { useState } from "react";

export function SortSelect ({setSorting}) {
  return (
    <>
      <div className='mb-4'>
        <label htmlFor="sort" className='text-lg'>Sort recipes by:</label>
        <select name="sort" id="sort" className='px-4 py-2 rounded-lg ml-4' onChange={(event) => setSorting(event.target.value)}>
          <option disabled selected value hidden>-- Select an option --</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Best recipes first">Best recipes first</option>
          <option value="Worst recipes first">Worst recipes first</option>
        </select>
      </div>
    </>
  );
}