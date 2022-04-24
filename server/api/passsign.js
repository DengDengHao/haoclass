var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/',(req,res)=>{
    let paramss = req.body;
    let sql1 = "UPDATE classtable set RegisStatus='已报名' where classnum=? and teachername=?";
    conn.query(sql1, [paramss.id,paramss.te], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log('已经更新'+result)
            res.send('100') 
        }
            
    })
    

})


module.exports=router