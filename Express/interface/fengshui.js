var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://122.152.218.9:27017/";


/* GET home page. */
router.all('/fs', function (req, res, next) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        console.log("数据库已创建!");
        db.close();
        console.log(req.body.username);
    });

});


module.exports = router;
