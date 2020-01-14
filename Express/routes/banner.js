var express = require('express');
var https = require('https');
var iconv = require("iconv-lite");
var url = require('url');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next)
{
    let dir = "https://" + req.headers.host + "/images/";
    res.json({"code": 200, "data": [dir + 'timg.jpg', dir + 'timg1.jpg', dir + 'timg2.jpg']})
});


module.exports = router;
