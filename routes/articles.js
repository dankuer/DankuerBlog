/**
 * Created by Dankuer on 2016/8/16.
 */
var express=require('express');
var router=express.Router();

router.get('/list',function(req,res){
    res.render('articles/list',{title:'文章列表'});
});
router.get('/add',function(req,res){
    res.render('articles/add',{title:'增加文章'});
});
module.exports=router;