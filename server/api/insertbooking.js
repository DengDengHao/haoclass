var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/',(req,res)=>{
    let paramss = req.body;
    let sql = 'insert into bookingtable(classnum,daytime,classway,note) values(?,?,?,?);';
    console.log(paramss.datea)
    conn.query(sql, [paramss.classnums,paramss.datea,paramss.classway,paramss.note], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log('已经插入'+result)
            res.send('100') 
        }
            
    })

})


module.exports=router