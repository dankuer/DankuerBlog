/**
 * Created by Dankuer on 2016/8/18.
 */
exports.checkLogin=function(req,res,next){
    var curUser=req.session.user;
    console.log('curssession:',req.session);
    if(curUser){
        next();
    }else{
        req.flash('error','请先登录！');
        return res.redirect('/users/login');
    }
};
exports.checkNotLogin=function(req,res,next){
    var curUser=req.session.user;
    if(curUser){
        req.flash('error','您已经登录，请先退出登陆');
        return res.redirect('/articles/list');
    }else{
        next();
    }
};