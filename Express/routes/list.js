var express = require('express');
var log4js = require('log4js');
//先建日志目录，不然无法生成
log4js.configure({
    appenders: {
        info: {
            type: "dateFile",
            filename: '../logs/log.log',
            pattern: "-yyyy-MM-dd.log",
        },
        console: {type: 'console'}
    }, categories: {
        default: {appenders: ['console'], level: 'all'},//去掉'out'。控制台不打印日志
        console: {appenders: ['info'], level: 'all'}

    }
});

var logger = log4js.getLogger("console");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next)
{
    console.log(__dirname);
    logger.info("its log");
    res.send('respond with a resource');
    console.log(1);
});

module.exports = router;
