var express = require('express');
var request = require("request");
var router = express.Router();
router.get('/test', function (req, res, next)
{
    let url = 'https://api.jisuapi.com/huangli/date'+"?appkey=eb791b3452e6ca17"+"&year=2015&month=12&day=11";

    request(url, function (error, response, body) {
        res.json(body)
      });
    
});
module.exports = router;

