/**
 * Created by Dankuer on 2016/8/17.
 */
var crypto=require('crypto');

exports.md5=function(str){
    return crypto.createHash('md5')
                .update(str)
                .digest('hex');
}