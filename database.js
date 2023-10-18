const mySql=require('mysql');
var connection = mySql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'7410135881'
    }
)
module.exports =connection;