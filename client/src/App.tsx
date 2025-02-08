import React from 'react';
import './App.css';
import { AuthContex } from './context/AuthContext';
import { useFetchData } from './hooks/useFetchData';
import { Navbar } from './components/Navbar';
import { AppRoutes } from './AppRoutes';

function App() {
  const { categories, latestRecipes, currentUser } = useFetchData();
  
  return (
    <>
      <AuthContex.Provider value={currentUser}>
        <Navbar />
        <main className='bg-lightbeige'>
          <AppRoutes categories={categories} latestRecipes={latestRecipes} />
        </main>
      </AuthContex.Provider>
    </>
  )
}

export default App;

//*| The logic for fetching data (categories, recipes, and user login) |
//*| via useEffect will be moved into a custom hook named useFetchData.|


//*| All routes inside <Routes> will be moved to a separate component |
//*| called AppRoutes to make App.jsx more focused on managing global |
//*| state and context.                                               |