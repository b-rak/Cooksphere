import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

export function ProfileIcon() {
  const { currentUser, setCurrentUser } = useAuthContext();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const navigate = useNavigate();

  async function logout() {
    Cookies.remove("accessToken");
    setOpenMenu(false);
    setCurrentUser({});
    await navigate("/");
  }

  async function toProfile() {
    setOpenMenu(false);
    await navigate("/profile");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setOpenMenu(false);
      }
    }

    openMenu
      ? document.addEventListener("mousedown", handleClickOutside)
      : document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <>
      <div className="relative">
        {Object.keys(currentUser).length !== 0 ? (
          <>
            <img
              src={"/profile_" + currentUser.image + ".png"}
              ref={iconRef}
              alt="Profilepicture"
              className="w-16 rounded-full border-solid border-deepbrown border-2 cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            />
            {openMenu ? (
              <div
                className="flex flex-col absolute right-0 top-20 w-40 bg-brown rounded-lg text-right text-lightbeige"
                ref={menuRef}
              >
                <div className="p-2 font-medium">
                  {currentUser.firstname + " " + currentUser.lastname}
                </div>
                <span
                  onClick={toProfile}
                  className="border-y border-y-softyellow w-full p-2 hover:bg-softyellow hover:text-deepbrown cursor-pointer"
                >
                  Mein Profil
                </span>
                <span
                  className="cursor-pointer p-2 hover:bg-softyellow hover:text-deepbrown hover:rounded-b-lg"
                  onClick={logout}
                >
                  Logout
                </span>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <Link to="/login">
            <div className="w-16 text-right font-medium hover:underline font-fira">
              LOGIN
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
