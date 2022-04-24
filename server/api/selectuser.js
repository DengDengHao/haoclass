var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.get('/student',(req,res)=>{
    let paramss = req.query;
    let sql = "select studenttable.index,studentname from studenttable";
    /* console.log('这是：'+paramss.data) */
    conn.query(sql,[paramss.namee],function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log(result)
            res.send(result) 
        }
            
    })

})

router.get('/teacher',(req,res)=>{
    let paramss = req.query;
    let sql = "select teachertable.index,teachername from teachertable;";
    /* console.log('这是：'+paramss.data) */
    conn.query(sql,[paramss.namee],function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log(result)
            res.send(result) 
        }
            
    })

})
router.get('/teachermessage',(req,res)=>{
    let paramss = req.query;
    let sql = "select * from teachertable where teachername=?;";
    /* console.log('这是：'+paramss.data) */
    conn.query(sql,[paramss.namee],function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log(result)
            res.send(result) 
        }
            
    })

})

router.get('/studentmessage',(req,res)=>{
    let paramss = req.query;
    let sql = "select * from studenttable where studentname=?;";
    /* console.log('这是：'+paramss.data) */
    conn.query(sql,[paramss.namee],function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log(result)
            res.send(result) 
        }
            
    })

})

router.get('/querys',(req,res)=>{
    /* let paramss = req.query; */
    let sql = "select studentname from signtable group by studentname;";
    /* console.log('这是：'+paramss.data) */
    conn.query(sql,function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log(result)
            res.send(result) 
        }
            
    })

})

router.get('/queryt',(req,res)=>{
    let sql = "select teachername from signtable group by teachername;";
    /* console.log('这是：'+paramss.data) */
    conn.query(sql,function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log(result)
            res.send(result) 
        }
            
    })

})


module.exports=router