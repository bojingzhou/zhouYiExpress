var mysql = require('mysql');
var settings = require('../settings');
var opts = settings.database.mysql;
module.exports = {
    GetConnection: function (cb)
    {
        var connection = mysql.createConnection({
            host: opts.host,
            user: opts.user,
            password: opts.password,
            database: opts.database
        });
        cb(connection);
    },
    Transaction: (get, cb) =>
    {
        var conn = mysql.createConnection({
            host: opts.host,
            user: opts.user,
            password: opts.password,
            database: opts.database
        });
        conn.beginTransaction((err) =>
        {
            if (err)
            {
                return res.send({"fail": err});
            }
            get(conn, (...arg) =>
            {
                if (arg[0])
                {
                    return conn.rollback();
                }
                return conn.commit();
            });

        });
    }
};