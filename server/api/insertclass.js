var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/',(req,res)=>{
    let paramss = req.body;
    let sql = 'insert into classtable(classtype,classcishu,teachername,RegisStatus,classimg) values(?,?,?,?,?);';
    conn.query(sql, [paramss.type,paramss.value,paramss.username,'未报名',paramss.img], function(err, result){
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