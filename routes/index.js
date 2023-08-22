const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
router.get('/en', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
router.get('/zh', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/index-zh.html'));
});

module.exports = router;
