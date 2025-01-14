import { useState, useMemo } from "react";
import { useNavigate } from 'react-router';
import { heroImageIds } from "../utils/imagePaths";

export function Hero () {
  const imageIds = heroImageIds;
  const random = useMemo(() => Math.floor(Math.random()*imageIds.length), []);
  const heroURL = `https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856/${imageIds[random]}.jpg`;

  const [input, setInput] = useState('');
  function handleChange (event) {
    setInput(event.target.value);
  }

  const navigate = useNavigate();
  function handleSubmit (event) {
    event.preventDefault();
    navigate(`/search?q=${input}`);
  }

  return (
    <>
      <div className='h-[32rem] flex flex-col items-center gap-4 pt-8 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${heroURL})` }}>
        <div className="bg-brown bg-opacity-75 p-2 rounded-md">
          <h3 className="mb-2 text-center font-medium text-white">Find your next favorite dish!</h3>
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
              type='text'
              placeholder='Search recipe'
              value={input}
              onChange={handleChange}
              className="px-1 h-7 outline-none rounded-md"></input>
            <button type="submit" className="bg-orange text-white hover:bg-deeporange rounded-md px-2 py-1 uppercase text-sm">Search</button>
          </form>
        </div>
      </div>
    </>
  );
};