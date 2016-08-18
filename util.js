/**
 * Created by Dankuer on 2016/8/17.
 */
var crypto=require('crypto');
var moment=require('moment');
var markdown=require('markdown').markdown;
exports.md5=function(str){
    return crypto.createHash('md5')
                .update(str)
                .digest('hex');
}
exports.dateFormat=function(date){
    moment.locale('zh-cn');
    return moment(date).format('YYYY年MM月DD日 HH:mm:ss');
};
exports.markdownToHtml=function(markdownStr){
    return markdown.toHTML(markdownStr);
};