'use strict';
import express from 'express';
import router from './router.js'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
