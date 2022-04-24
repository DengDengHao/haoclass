var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();


router.post('/deal',(req,res)=>{
    let paramss = req.body;
    let sql1 = "UPDATE classtable set classcishu=classcishu-'1' where classnum=?;";
    let sql3="UPDATE bookingtable set zhuangtai='已接受,待上课'"
    console.log(paramss.num,paramss.name)
    conn.query(sql3,function(err,result){
        if(err){
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        }
        else{
            console.log('已经更新'+result)
            conn.query(sql1, [paramss.num], function(err, result){
                if (err) {       
                    console.log('发生了错误！:'+err.message);
                    res.send(err.message)
                } 
                else{
                    console.log('已经更新'+result)
                    res.send('100') 
                }
                    
            })
        }
    })
    
    

})

router.post('/delete',(req,res)=>{
    let paramss = req.body;
    let sql2='delete from bookingtable where classnum=?;'
    console.log(paramss.num,paramss.name)
   
                    conn.query(sql2, [paramss.num], function(err, result){
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