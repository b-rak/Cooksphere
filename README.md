<div align="center">
  <img src="./client/public/logo.png" width="150" alt="StackTally logo">
  <h1> Cooksphere </h1>
  <h3><i>"Cooksphere creates a space where users can discover,<br/> save or share recipes."</i></h3>


[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Context API](https://img.shields.io/badge/contextapi-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/docs/context.html)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
[![Cypress](https://img.shields.io/badge/cypress-%2317202C.svg?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Mongoose](https://img.shields.io/badge/mongoose-%238A4C39.svg?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Mocha](https://img.shields.io/badge/mocha-%23D8B545.svg?style=for-the-badge&logo=mocha&logoColor=white)](https://mochajs.org/)
[![Chai](https://img.shields.io/badge/chai-%23A30000.svg?style=for-the-badge&logo=chai&logoColor=white)](https://www.chaijs.com/)

</div>



## Recap

During this refactoring, we improved the project's structure and performance by updating key components located in the ./RecipeDetailsPage/

* RecipeDetailsPage.tsx, 
* GeneralCard.tsx, 
* Ingredients.tsx, 
* Instructions.tsx
* Reviews.tsx 

By simplifying these components, centralising logic.

## Key Benefits

* Increased safety and clarity thanks to TypeScript.
* Cleaner and more maintainable code with centralised logic and route reorganisation.
* Better user experience with error handling and visual feedback.
* Ready to scale with a modular structure and robust typing.


## Key Changes

1. Migration to TypeScript:
    * We migrated the project from JavaScript to TypeScript, adding type safety and improving code clarity.
    * Defined interfaces for key data structures (categories, recipes, users) in types.d.ts.
    * Added types to states and functions in App.tsx and other components.

2. Centralised Data Logic:
    * Created a custom hook called useFetchData to handle data fetching (categories, recipes, and user login).
    * This simplified App.tsx and centralised the fetching logic in one place.

3. Improved Route Organisation:
    * Moved all routes to a separate component called AppRoutes, allowing App.tsx to focus on global state and context management.

4. Authentication Handling with AuthContext:
    * Created an AuthContext to manage the authenticated user’s state and avoid "prop drilling".
    * Added default values and safe handling of null values using optional chaining (?.) and fallbacks.

5. Project Structure Improvements:
    * Reorganised files for better separation of concerns (e.g., moved AuthContext to a dedicated folder).
    * Gradually migrated components to TypeScript (e.g., Navbar.jsx to Navbar.tsx).

6. Refactoring of Key Components in components/RecipeDetailsPage:
    * RecipeDetailsPage.tsx: Simplified the component by breaking it into smaller, reusable parts.
    * GeneralCard.tsx: Improved reusability and type safety.
    * Ingredients.tsx: Enhanced readability and maintainability.
    * Instructions.tsx: Streamlined the logic and improved error handling.
    * Reviews.tsx: Added better validation and reusable logic for user reviews.# Cooksphere

Cooksphere creates a space where users can discover, save or share recipes.

## Frontend
The frontend shows categories of recipes. The user can either look into those or search for recipes. Both the search result page and the category page show a list of recipes which can be filtered and sorted. On the recipe details page users see information about the recipe. At the bottom of the page are reviews of other users listed and a form to post a review and rate the recipe. In the profile are the user's favorite and uploaded recipes listed. Furthermore he can upload a recipe by filling the form. The frontend was built with React and TailwindCSS. Uploaded recipe images are sent to Cloudinary.

Assets like category images are taken from Unsplash and the profile avatar or logo are AI generated.

## Start frontend
From within the client folder, install dependencies and start the frontend
```
npm install
npm run dev
```

# Backend
The backend server was built with express. A MongoDB database with mongoose as an orm is used to store recipe and user data. Make sure to have a MongoDB instance running on mongodb://127.0.0.1:27017.

## Fill database
To get initial recipe data I used [TheMealDB API](https://www.themealdb.com/api.php) which is free of use for educational development purposes. To fill the database with initial recipes and the user who is logged in navigate to the server/scripts folder and execute
```
node seed.js
```

## Start backend
From within the server folder, install dependencies and start the backend
```
npm install
npm run server
```

Once both the frontend and the backend are running open [localhost:5173](http://localhost:5173) in your browser. Have fun!

## Known Issues and Next Todos
- User updates are not reflected immediately, so when adding a recipe as a favorite or uploading a new one, you have to refresh the browser page manually to fetch the updated user
- Form validation is not complete yet
- Authentication is missing (frontend and backend), you are currently logged in as one user (s. in App.jsx)
- Use env variables for PORTs, URLs etc
- Split router (backend) and apiclient (frontend) to multiple files to separate recipe and user related functions
- Create more common components like button or headings

##
<h3>Solo Project by</h3>
<a href="https://github.com/b-rak">
  <img src="https://avatars.githubusercontent.com/u/153173804?v=4" width="60px" hspace="10" style="border-radius: 100px; outline: solid 1px gray;outline-offset: -0.5px;">
</a>

##
<h3>Legacy Project Team</h3>

  <a href="https://github.com/j7sus"><img src="https://github.com/j7sus.png" width="60px" hspace="10" style="border-radius: 100px; outline: solid 1px gray;outline-offset: -0.5px;" alt="j7sus's GitHub Avatar"></a>
  <a href="https://github.com/lmleg9"><img src="https://avatars.githubusercontent.com/u/166398249?v=4" width="60px" hspace="10" style="border-radius: 100px; outline: solid 1px gray;outline-offset: -0.5px;" alt="lmleg9's GitHub Avatar"></a>

##
:) <div align="center">
  ![License: MIT](https://img.shields.io/badge/License-MIT-blueviolet.svg)
</div>