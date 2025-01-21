'use strict';
import cors from 'cors';
import express from 'express';
import router from './router.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🙌✨`);
  console.log("")
});
