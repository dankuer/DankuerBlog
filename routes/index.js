var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('articles/list', { title: 'Dankuer Blog' });
  res.redirect('articles/list');
});

module.exports = router;
