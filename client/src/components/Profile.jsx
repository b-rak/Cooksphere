import { Upload } from "./Upload";

export function Profile () {
  function handleClick () {

  }

  return (
    <>
      <h2 className='text-3xl font-bold my-8 ml-[20%]'>My Profile</h2>
      <div className="flex gap-8 items-center ml-[20%] border w-fit py-4 px-12">
        <img src="profile_man.png" alt="Profilepicture" className="w-32 rounded-full border-solid border-orange-200 border-2"/>
        <div className="flex flex-col gap-4">
          <div>Username</div>
          <button
            className="px-4 py-2 border border-solid border-orange-200 bg-orange-200 text-teal-900 rounded-lg cursor-pointer shadow-md"
            onClick={handleClick}
          >Upload Recipe</button>
        </div>
      </div>
      <div>
        <div>Saved Recipes</div>
        <div>Uploaded Recipes</div>
      </div>
      <br />
      <br />
      <Upload />
    </>
  );
};