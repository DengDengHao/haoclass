var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.get('/',(req,res)=>{
    /* let paramss = req.query; */
    let sql = "select classnum from bookingtable;";
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