# Cooksphere

Cooksphere creates a space where users can discover, save or share recipes.

# Frontend
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

Once both the frontend and the backend are running open http://localhost:5173 in your browser. Have fun!

## Known Issues and Next Todos
- User updates are not reflected immediately, so when adding a recipe as a favorite or uploading a new one, you have to refresh the browser page manually to fetch the updated user
- Form validation is not complete yet
- Authentication is missing (frontend and backend), you are currently logged in as one user (s. in App.jsx)
- Use env variables for PORTs, URLs etc
- Split router (backend) and apiclient (frontend) to multiple files to separate recipe and user related functions
- Create more common components like button or headings