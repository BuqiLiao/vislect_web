const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/privacypolicy-en.html'));
});
router.get('/en', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/privacypolicy-en.html'));
});
router.get('/zh', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/privacypolicy-zh.html'));
});

module.exports = router;
