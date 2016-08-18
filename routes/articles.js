/**
 * Created by Dankuer on 2016/8/16.
 */
var express=require('express');
var router=express.Router();
var Models=require('../db');
router.get('/list',function(req,res){
    res.render('articles/list',{title:'文章列表'});
});
router.get('/add',function(req,res){
    res.render('articles/add',{title:'增加文章'});
});
router.post('/add',function(req,res){
    var article=req.body;
    //console.log(article);
    //article.createAt=Date.now();
    article.author=req.session.user._id;
    Models.Article.create(article,function(err,doc){
        if(err){
            console.log(err);
            req.flash('error',err);
            return res.redirect('back');
        }else{
            req.flash('success','添加成功！');
            return res.redirect('/');
        }
    })
});
module.exports=router;