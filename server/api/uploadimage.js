var express = require('express');
var router = express.Router();
var modles=require('../db')
var mysql=require('mysql');
const { json } = require('body-parser');
var conn = mysql.createConnection(modles.mysql);
conn.connect();
var path = require("path");
var fs=require('fs')
var multer = require('multer') //配置 
var storage = multer.diskStorage({ 
	//配置上传的目录 注意路径必须存在
 	destination: function (req, file, cb) { 
 		/* cb(null, 'upload/')  */
        console.log(__dirname);  //获取当前文件在服务器上的完整目录 
        console.log(__filename); //获取当前文件在服务器上的完整路径 
        console.log(path.join(__dirname, '../uploads/')); 
        /* cb(null, path.join(__dirname, '../uploads/')) */
        cb(null, 'uploads/')
 	},
 	//修改上传后的文件名称 
 	filename: function (req, file, cb) { 
 		var fileFormat = (file.originalname).split("."); 
 		cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]); 
 	} 
})
 var upload = multer({ storage: storage })
 router.post('/', upload.single("file"),(req,res)=>{
    console.log(req.file.path)
    res.send({
        stas:'200',
        file: req.file,
        url:'http://localhost:3000/'+req.file.filename,
        realurl:path.join(__dirname, '../uploads/')+req.file.filename
    })
})

router.post('/delt',(req,res)=>{
    let paramss = req.body;
    let sql = "UPDATE teachertable set teachertable.password=?,teacherimg=? where teachername=?";
    console.log(paramss.jiu)
    conn.query(sql, [paramss.pas,paramss.new,paramss.name], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log('已经更新'+result)
            fs.unlink(paramss.jiu,function(err){
                if(err){
                    res.send(err)
                }
                else
                {
                    console.log('已经删除')
                    res.send('100')
                }
                    })
        }
            
    })
    
})

router.post('/dels',(req,res)=>{
    let paramss = req.body;
    let sql = "UPDATE studenttable set studenttable.password=?,studentimg=? where studentname=?";
    console.log(paramss.jiu)
    conn.query(sql, [paramss.pas,paramss.new,paramss.name], function(err, result){
        if (err) {       
            console.log('发生了错误！:'+err.message);
            res.send(err.message)
        } 
        else{
            console.log('已经更新'+result)
            fs.unlink(paramss.jiu,function(err){
                if(err){
                    res.send(err)
                }
                else
                {
                    console.log('已经删除')
                    res.send('100')
                }
                    })
        }
            
    })
    
})

router.post('/delimg',(req,res)=>{
    let paramss = req.body;
    console.log(paramss.data)
            fs.unlink(paramss.data,function(err){
                if(err){
                    res.send(err)
                }
                else
                {
                    console.log('已经删除')
                    res.send('100')
                }
                    })
})


module.exports=router