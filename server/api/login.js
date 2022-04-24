var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/student',(req,res)=>{
    let paramss = req.body;
    let sql = 'select * from studenttable where studentname=? and password = ?;';
    console.log(paramss)
    console.log(sql)
    conn.query(sql, [paramss.username,paramss.password], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
        } 
            res.send(result)   
            
    })

})

router.post('/teacher',(req,res)=>{
    let paramss = req.body;
    let sql = 'select * from teachertable where teachername=? and password = ?;';
    conn.query(sql, [paramss.username,paramss.password], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
        } 
            res.send(result)   
            
    })

})

router.post('/admin',(req,res)=>{
    let paramss = req.body;
    let sql = 'select * from admintable where adminname=? and password = ?;';
    conn.query(sql, [paramss.username,paramss.password], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
        } 
            res.send(result)   
            
    })

})

module.exports=router