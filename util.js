/**
 * Created by Dankuer on 2016/8/17.
 */
var crypto=require('crypto');
var moment=require('moment');
exports.md5=function(str){
    return crypto.createHash('md5')
                .update(str)
                .digest('hex');
}
//exports.dateFormat=function(date){
//    return moment(date).format('YYYY年MM月DD日hh:mm:ss');
//}