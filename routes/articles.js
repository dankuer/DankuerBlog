/**
 * Created by Dankuer on 2016/8/16.
 */
var express=require('express');
var router=express.Router();
var Models=require('../db');
var markdown=require('markdown').markdown;
var moment=require('moment');
var auth=require('../middleWare');
router.get('/list',function(req,res){
    Models.Article.find({}).populate('author').exec(function(err,docs){
       if(err){
           throw err;
       }else{
           //docs.forEach(function(article){
           //    //article.createAt=moment(article.createAt).format('YYYY年MM月DD日hh:mm:ss');
           //    article.createAt=article.createAt.toLocaleString();
           //    article.content=markdown.toHTML(article.content);
           //});
           //console.log(docs);
           return res.render('articles/list',{title:'文章列表',articles:docs});
       }
    });

});
router.get('/detail/:id',function(req,res){
    var id=req.params.id;
    console.log('id:',id);
    if(id){
        Models.Article.findById(id).populate('author').exec(function(err,doc){
            if(err){
                console.log(err);
                req.flash('error',err);
                return res.redirect('back');
            }else{
                if(doc){
                    console.log('找到对应文章：',doc);
                    //doc.content=markdown.toHTML(doc.content);
                    //console.log(moment(doc.createAt).format('YYYY年MM月DD日 hh:mm:ss'));
                    //doc.createAt=moment(doc.createAt).format('YYYY年MM月DD日 hh:mm:ss');
                    //console.log(doc.createAt);
                    return res.render('articles/detail',{title:'文章内容',article:doc});

                }else{
                    req.flash('error','未找到指定的文章');
                    return res.redirect('back');
                }
            }
        });
    }else{
        //若id为空或者未找到对应文章
        req.flash('error','文章id不能为空');
        return res.redirect('back');
    }
});
router.get('/edit/:id',function(req,res){
    var id=req.params.id;
    //console.log('id:',id);
    if(id){
        Models.Article.findById(id).populate('author').exec(function(err,doc){
            if(err){
                console.log(err);
                req.flash('error',err);
                return res.redirect('back');
            }else{
                if(doc){
                    return res.render('articles/edit',{title:'编辑文章',article:doc});
                }else{
                    req.flash('error','未找到指定的文章');
                    return res.redirect('back');
                }
            }
        });
    }else{
        //若id为空或者未找到对应文章
        req.flash('error','文章id不能为空');
        return res.redirect('back');
    }

});
router.get('/add',auth.checkLogin,function(req,res){
    res.render('articles/add',{title:'增加文章'});
});
router.post('/add',auth.checkLogin,function(req,res){
    var article=req.body;
    //console.log(article);
    //article.createAt=Date.now();
    article.author=req.session.user._id;
    //article.createAt=article.createAt.toLocaleString();
    Models.Article.create(article,function(err,doc){
        if(err){
            console.log(err);
            req.flash('error',err);
            return res.redirect('back');
        }else{
            req.flash('success','添加成功！');
            return res.redirect('/articles/list');
        }
    })
});
router.post('/edit',function(req,res){
    var article=req.body;
    Models.Article.findById(article._id,function(err,doc){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }else{
            if(doc){
                doc.title=article.title;
                doc.content=article.content;
                doc.save(function(err,result){
                    if(err){
                        req.flash('error',err);
                        return res.redirect('back');
                    }else{
                        req.flash('success','修改成功！');
                        return res.redirect('/articles/detail/'+result._id);
                    }
                })
            }
        }
    });
});
module.exports=router;