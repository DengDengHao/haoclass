var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    console.log(req.params)
    res.send('这是一个测试！')
})

module.exports=router