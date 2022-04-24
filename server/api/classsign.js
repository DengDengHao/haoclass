var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/',(req,res)=>{
    let paramss = req.body;
    let sql1 = "UPDATE classtable set RegisStatus='报名中' where classnum=? and teachername=?";
    let sql2='insert into signtable(classnum,classtype,teachername,studentname) values(?,?,?,?);'
    console.log(paramss.num,paramss.name)
    conn.query(sql1, [paramss.num,paramss.name], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log('已经更新'+result)
            conn.query(sql2, [paramss.num,paramss.type,paramss.name,paramss.names], function(err, result){
                if (err) {       
                    console.log('发生了错误！:'+err.message);
                    res.send(err.message)
                } 
                else{
                    console.log('已经插入'+result)
                    res.send('100') 
                }                 
            })
        }
            
    })
    

})


module.exports=router