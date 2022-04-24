var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/student',(req,res)=>{
    let paramss = req.body;
    let sql = 'insert into studenttable(studentname,password,studentimg) values(?,?,?);';
    console.log(paramss)
    console.log(sql)
    conn.query(sql, [paramss.username,paramss.password,paramss.img], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            res.send('100') 
        }
              
            
    })

})

router.post('/teacher',(req,res)=>{
    let paramss = req.body;
    let sql = 'insert into teachertable(teachername,password,teacherimg) values(?,?,?);';
    conn.query(sql, [paramss.username,paramss.password,paramss.img], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            res.send('100') 
        }
            
    })

})


module.exports=router