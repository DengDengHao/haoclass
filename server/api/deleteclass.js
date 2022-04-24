var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/shanchu',(req,res)=>{
    let paramss = req.body;
    let sql = 'delete from classtable where classnum=? and teachername=?;';
    console.log(paramss.id,paramss.name)
    conn.query(sql, [paramss.id,paramss.name], function(err, result){
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

router.post('/jieke',(req,res)=>{
    let paramss = req.body;
    let sql1 = 'delete from classtable where classnum=? and teachername=?;';
    let sql2 = 'delete from signtable where classnum=? and teachername=?;';
    console.log(paramss.id,paramss.name)
    conn.query(sql2, [paramss.id,paramss.name], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log('已经删除'+result)
            conn.query(sql1, [paramss.id,paramss.name], function(err, result){
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