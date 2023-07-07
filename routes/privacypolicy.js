const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res, next) {
  console.log('privacypolicy.js: router.get(/)');
  res.sendFile(path.join(__dirname, '../public/views/privacypolicy.html'));
});

module.exports = router;
