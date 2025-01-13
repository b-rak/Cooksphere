import { useState, useMemo } from "react";
import { useNavigate } from 'react-router';
export function Hero () {
  const imageIds = [
    'cyt8zgujhq6olzqphqgb',
    'g68uhpx7wcdo597dfj5x',
    'idpol0hfuz1odf3iywyk',
    'nyjccvchdn13wvgm8aba',
    'yzchiwqaothmtoqce9to',
    'krsw6xcyxq79mzoyy1ht',
    'mjeu6ianbjmbtpy2jvew',
    'lcwabeyiz0qbhh8gnvrq',
    'z5pexddrqeiwpasbk7gj',
    'dp7chefwtxuqqzdult99',
  ];
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
        <h1>Hero Search</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Search recipe' value={input} onChange={handleChange}></input>
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};