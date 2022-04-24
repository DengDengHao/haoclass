var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/student',(req,res)=>{
    let paramss = req.body;
    let sql = 'delete from studenttable where studentname=?;';
    conn.query(sql, [paramss.namee], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log('已经删除'+result)
            res.send('100') 
        }
            
    })

})

router.post('/teacher',(req,res)=>{
    let paramss = req.body;
    let sql1 = 'delete from teachertable where teachername=?;';
    let sql2 = 'delete from classtable where teachername=?;';
    conn.query(sql2, [paramss.namee], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log('已经删除'+result)
            conn.query(sql1, [paramss.namee], function(err, result){
                if (err) {       
                    console.log('发生了错误！:'+err.message);
                    res.send(err.message)
                } 
                else{
                    console.log('已经删除'+result)
                    res.send('100') 
                }
                    
            })
        }
            
    })

})


module.exports=router