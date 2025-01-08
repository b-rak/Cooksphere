'use strict';

import express from 'express';

const router = express.Router();

router.get('/recipes', (req, res) => {
  res.send('/recipes GET');
})

export default router;