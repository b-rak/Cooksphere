export function Hero () {
  const random = Math.floor(Math.random()*10);
  const heroURL = `landingpage/hero_${random}.jpg`;

  return (
    <>
      <div className='h-[32rem] flex flex-col items-center gap-4 pt-8 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${heroURL})` }}>
        <h1>Hero Search</h1>
        <input type='text' placeholder='Search recipe'></input>
      </div>
    </>
  );
};