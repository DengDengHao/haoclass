var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.get('/wei',(req,res)=>{
    let paramss = req.query;
    let sql = "select bookingtable.bookingnum,bookingtable.classnum,DATE_FORMAT(bookingtable.daytime, '%Y-%m-%d %T') as daytime,signtable.studentname,bookingtable.classway,bookingtable.note from bookingtable left join signtable on bookingtable.classnum=signtable.classnum where signtable.teachername=? and zhuangtai='未上课';";
    /* console.log('这是：'+paramss.data) */
    conn.query(sql,[paramss.data],function(err, result){
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

router.get('/yishang',(req,res)=>{
    let paramss = req.query;
    let sql = "select bookingtable.bookingnum,bookingtable.classnum,DATE_FORMAT(bookingtable.daytime, '%Y-%m-%d %T') as daytime,signtable.studentname,bookingtable.classway,bookingtable.note from bookingtable left join signtable on bookingtable.classnum=signtable.classnum where signtable.teachername=? and zhuangtai='已接受,待上课';";
    /* console.log('这是：'+paramss.data) */
    conn.query(sql,[paramss.data],function(err, result){
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