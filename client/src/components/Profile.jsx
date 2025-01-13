import { useContext, useState } from "react";
import { Popup } from "./Popup";
import { Upload } from "./Upload";
import { AuthContext } from '../App';

export function Profile () {
  const currentUser = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  function openPopup () {
    setVisible(true);
    document.body.classList.add('overflow-hidden');
  }

  function closePopup (event) {
    console.log(event);
    setVisible(false);
    document.body.classList.remove('overflow-hidden');
  }

  return (
    <>
      <h2 className='text-3xl font-bold my-8 ml-[20%]'>My Profile</h2>
      <div className="flex gap-8 items-center ml-[20%] border w-fit py-4 px-12">
        <img src="profile_man.png" alt="Profilepicture" className="w-32 rounded-full border-solid border-orange-200 border-2"/>
        <div className="flex flex-col gap-4">
          <div>{currentUser.firstname + ' ' + currentUser.lastname}</div>
          <button
            className="px-4 py-2 border border-solid border-orange-200 bg-orange-200 text-teal-900 rounded-lg cursor-pointer shadow-md"
            onClick={openPopup}
          >Upload Recipe</button>
        </div>
      </div>
      <div>
        <div>Saved Recipes</div>
        <div>Uploaded Recipes</div>
      </div>
      <br />
      <br />
      {visible && <Popup closePopup={closePopup} />}
      <Upload />
    </>
  );
};