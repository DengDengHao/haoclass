var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.get('/',(req,res)=>{
    /* let paramss = req.query; */
    let sql = "select signtable.signnum,signtable.classnum,signtable.classtype,signtable.teachername,signtable.studentname from signtable left join classtable on signtable.classnum=classtable.classnum where 1=1 and classtable.RegisStatus='报名中';";
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