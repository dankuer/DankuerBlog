/**
 * Created by Dankuer on 2016/8/16.
 */
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/dankuerblog');
var User=mongoose.model('User',new mongoose.Schema({
    username:{type:String,isRequired:true},
    password:{type:String,isRequired:true},
    email:{type:String},
    avatar:{type:String}
}));
var articles=mongoose.model('Article',new mongoose.Schema({
    title:{type:String,isRequire:true},
    content:{type:String,isRequire:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    createAt:{type:Date,default:new Date()}
}));