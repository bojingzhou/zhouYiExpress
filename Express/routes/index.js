var express = require('express');
var request = require("request");
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '118.193.159.239',
    user: 'root',
    password: '',
    database: 'test'
});

// connection.connect();
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next)
{
    res.render("index")
    // let url = 'http://v.juhe.cn/calendar/day';
    // let date = new Date();
    // let monty = parseInt(date.getMonth() + 1);
    // let full_date = date.getFullYear() + "-" + monty + "-" + date.getDate();
    // request.post(url, {
    //     formData: {date: full_date, "key": "71bbb3d83e4400097ea45a486c977ec4"},
    //     json: true
    // }, function (err, data, body)
    // {
    //     console.log(body);
    //     res.json(body);
    //
    // })
});
router.post('/xingzuo', function (req, res, next)
{
    let consName = req.body.consName;
    let url = 'http://web.juhe.cn:8080/constellation/getAll';
    request.post(url, {
        formData: {consName: req.body.consName, "key": "fa5cbcf89dbbbb98d0b1edc0281cc9e7", type: "today"},
        json: true
    }, function (err, data, body)
    {
        console.log(body);
        res.json(body);

    })
});
router.post('/promise', function (req, res, next)
{
    let type = req.body.type;
    let content = req.body.con;
    let sql = "INSERT INTO fengshui(con,type) VALUES(?,?)";
    let sqlPara = [content, type];
    connection.query(sql, sqlPara, function (err, result)
    {
        if (err)
        {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json({status: "ok"});
    });
});
router.post('/getPromise', function (req, res, next)
{
    let page = req.body.page;
    let count = req.body.count;
    let sql = "select * from fengshui limit ?,?";
    let sqlPara = [(page - 1) * count, count];
    connection.query(sql, sqlPara, function (err, result)
    {
        if (err)
        {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json(result);
        console.log(result);
    });
});
router.post('/love', function (req, res, next)
{
    let sql = "update fengshui set love=love+1 where id=?";
    let sqlPara = [req.body.id];
    connection.query(sql, sqlPara, function (err, result)
    {
        if (err)
        {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json(result);
        console.log(result);
    });
});
router.post('/login', function (req, res, next)
{
    let nick_name = req.body.nick_name;
    let password = req.body.password;
    let sql ="select * from user where nickname=?";
    let sqlPara = [nick_name];
    connection.query(sql, sqlPara, function (err, result)
    {
        if (err)
        {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        var result_password=result[0].password
        if(result_password==password){
            res.json({status: "ok","txt":"登陆成功!","id":result[0].id});
        }else{
            res.json({status: "fail","txt":"密码错误!"});
        }

    });
});
router.post('/reg', function (req, res, next)
{
    let nick_name = req.body.nick_name;
    let password = req.body.password;
    let mail = req.body.mail;
    let sql = "INSERT INTO user(nickname,password,mail) VALUES(?,?,?)";
    let sqlPara = [nick_name, password, mail];
    connection.query(sql, sqlPara, function (err, result)
    {
        if (err)
        {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json({status: "ok"});
    });
});

module.exports = router;
