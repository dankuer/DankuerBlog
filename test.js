/**
 * Created by Dankuer on 2016/8/17.
 */
var moment=require('moment');
//var user={
//    username:1,
//    password:2
//};
//username=user.username;
//
//var user1={
//
//}
//console.log(`用户名${username}已经存在`);
console.log(Date.now());
console.log(new Date());
console.log(Date.now().toLocaleString());
console.log(moment(new Date()*1000).format('YYYY年MM月DD日hh:mm:ss'));