var isEmpty = function (v) {
    if (v === undefined || v === null || v === '') {
        return true;
    }
    return false;
};
var isNotEmpty = function (v) {
    return !isEmpty(v);
};
exports.isEmpty = isEmpty;
exports.isNotEmpty = isNotEmpty;

exports.formatDate = function (dt, fmt) {
    var o = {
        "M+": dt.getMonth() + 1, //月份
        "d+": dt.getDate(), //日
        "h+": dt.getHours(), //小时
        "m+": dt.getMinutes(), //分
        "s+": dt.getSeconds(), //秒
        "q+": Math.floor((dt.getMonth() + 3) / 3), //季度
        "S": dt.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups:3,
            category: 'normal'
        }
    ]
});

exports.logger=function(name){
    var logger;
    if (!!name) {
        logger = log4js.getLogger(name);
    } else {
        logger = log4js.getLogger('normal');
    }
    logger.setLevel('INFO');
    return logger;
}
