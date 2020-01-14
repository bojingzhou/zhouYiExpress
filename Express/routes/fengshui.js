var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/fs', function (req, res, next) {
    res.json({"status": 200})
});


module.exports = router;
