var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/reg',function(req,res){
    res.render('users/reg',{title:'注册页面'});
});
router.get('/login',function(req,res){
    res.render('users/login',{title:'登录页面'});
});
module.exports = router;
