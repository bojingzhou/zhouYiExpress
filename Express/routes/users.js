var express = require('express');
var client = require('redis').createClient(6379, '127.0.0.1');
var Redlock = require('redlock');

var redlock = new Redlock(
    // you should have one client for each independent redis node
    // or cluster
    [client],
    {
        // the expected clock drift; for more details
        // see http://redis.io/topics/distlock
        driftFactor: 0.01, // time in ms

        // the max number of times Redlock will attempt
        // to lock a resource before erroring
        retryCount: 10,

        // the time in ms between attempts
        retryDelay: 200, // time in ms

        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter: 200 // time in ms
    }
);

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next)
{
    redlock.on('clientError', function (err)
    {
        console.error('A redis error has occurred:', err);
    });
    var ttl = 10000;

    redlock.lock("redlock", ttl).then(function (lock)
    {
        // console.log(lock);
        console.log("加锁成功")

    }).catch(function (err)
    {
        console.log("加锁失败");
    });


    res.send('respond with a resource');
});

module.exports = router;
