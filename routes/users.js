var express = require('express');
var router = express.Router();
var Models=require('../db');

var md5=require('../util').md5;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/reg',function(req,res){
    res.render('users/reg',{title:'注册页面'});
});
router.post('/reg',function(req,res){
    var user=req.body;
    //console.log(user);
    if(user.password!=user.repassword){
        //密码不一致
        req.flash('error','两次密码输入不一致！');
        return res.redirect('back');
    }
    delete user.repassword;
    Models.User.findOne({username:user.username},function(err,doc){
        if(err){
            console.log(err);
            req.flash('error',err);
            return res.redirect('back');
        }else{
            console.log(doc);
            if(doc){
                req.flash('error',`用户名${doc.username}已经存在`);
                return res.redirect('back');
            }else{
                user.password=md5(user.password);
                user.avatar="https://secure.gravatar.com/avatar/"+md5(user.email)+"?s=25";
                Models.User.create(user,function(err,doc){
                    if(err){
                        console.log(err);
                        req.flash('error',err);
                        return res.redirect('back');
                    }else{
                        req.session.user=doc;
                        req.flash('success','用户添加成功！');
                        return res.redirect('/');
                    }
                });
            }
        }
    })

});
router.get('/login',function(req,res){
    res.render('users/login',{title:'登录页面'});
});
router.post('/login',function(req,res){
    var user=req.body;
    console.log('login:',user);
    Models.User.findOne({username:user.username,password:md5(user.password)},function(err,doc){
        if(err){
            console.log(err);
            req.flash('error',err);
            return res.redirect('back');
        }else{
            if(doc){
                //用户存在

                req.session.user=doc;
                console.log('登录成功！');
                req.flash('success','登陆成功！');
                return res.redirect('/');
            }else{
                req.flash('error','用户名或密码错误!');
                return res.redirect('back');
            }
        }
    })
});
router.get('/logout',function(req,res){
   var user=req.session.user;
    if(user){
        req.session.user=null;
        res.redirect('/users/login');
    }
});
module.exports = router;
