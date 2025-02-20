import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Popup } from "./Popup";
import { RecipeResults } from "./RecipeResults";

export function Profile() {
  const { currentUser } = useAuthContext();

  const [visible, setVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [uploaded, setUploaded] = useState([]);

  function openPopup() {
    setVisible(true);
    document.body.classList.add("overflow-hidden");
  }

  function closePopup() {
    setVisible(false);
    document.body.classList.remove("overflow-hidden");
  }

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.favoriteRecipes) {
      setFavorites(currentUser.favoriteRecipes);
      setUploaded(currentUser.uploadedRecipes);
    }
  }, [currentUser]);

  return (
    <>
      <div className="p-4">
        <h2 className="text-3xl font-bold ml-[20%] font-fira">My Profile</h2>
        <div className="flex gap-8 my-4 items-center ml-[20%] shadow_2 rounded-lg w-fit py-8 px-12">
          <img
            src="profile_man.png"
            alt="Profilepicture"
            className="w-32 rounded-full border-solid border-deepbrown border-2"
          />
          <div className="flex flex-col gap-4">
            <div className="text-xl">
              {currentUser
                ? currentUser.firstname + " " + currentUser.lastname
                : ""}
            </div>
            <button
              className="bg-[#FF6F3C] text-white hover:bg-[#D95427] gap-2 rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-fit"
              onClick={openPopup}
            >
              Upload Recipe
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-brown pt-4 rounded-lg">
            <h2 className="text-2xl font-bold text-white px-8 leading-6">
              Favorite Recipes
            </h2>
            <RecipeResults
              recipes={favorites}
              message="No favorite recipes saved yet. Go to a recipe page to add it to your favorites!"
            />
          </div>
          <div className="bg-brown pt-4 rounded-lg">
            <h2 className="text-2xl font-bold text-white px-8 leading-6">
              Uploaded Recipes
            </h2>
            <RecipeResults
              recipes={uploaded}
              message="No uploaded recipes yet. Click on the button in the user card above to upload your first recipe!"
            />
          </div>
        </div>
        {visible && <Popup closePopup={closePopup} />}
      </div>
    </>
  );
}
