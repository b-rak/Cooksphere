import { useContext } from "react";
import { Link } from "react-router"
import { AuthContex } from "../context/AuthContext";

export function Navbar () {
  const currentUser = useContext(AuthContex);
  return (
    <>
      <header className='flex justify-between items-center px-8 py-2 shadow-[0_0_0.25rem_#808080]'>
        <Link to='/'>
          <img src="/logo.png" alt="Cooksphere Logo" className="w-16"/>
        </Link>
        <h1 data-testid="cypress-title" className="flex-grow text-center font-fira font-black italic text-4xl">Cooksphere</h1>
        <nav>
          <a></a>
        </nav>
        <Link to='/profile'>
          <img
            src={currentUser ? '/profile_' + currentUser.image + '.png' : '/profile_default.png'}
            alt="Profilepicture"
            className="w-16 rounded-full border-solid border-deepbrown border-2"
          />
          {/* <img src={'/profile_' + currentUser.image +'.png'} alt="Profilepicture" className="w-16 rounded-full border-solid border-deepbrown border-2"/> */}
        </Link>
      </header>
    </>
  );
};
