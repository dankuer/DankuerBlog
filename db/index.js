/**
 * Created by Dankuer on 2016/8/16.
 */
var mongoose=require('mongoose');
var dbUrl=require('../setting').dbUrl;
mongoose.connect(dbUrl);
//mongoose.connect('mongodb://localhost:27017/dankuerblog');
exports.User=mongoose.model('User',new mongoose.Schema({
    username:{type:String,isRequired:true},
    password:{type:String,isRequired:true},
    email:{type:String},
    avatar:{type:String}
}));
exports.Article=mongoose.model('Article',new mongoose.Schema({
    title:{type:String,isRequire:true},
    content:{type:String,isRequire:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    createAt:{type:Date,default:Date.now()}
}));