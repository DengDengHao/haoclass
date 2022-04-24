let express=require('express')
let app=express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var Login=require('./api/login') 
app.use('/login',Login)

/* var testt=require('./api/test')
app.use('/test',testt) */
var Register=require('./api/register')
app.use('/register',Register)

var Teacherclass=require('./api/teacherclass')
app.use('/teacherclass',Teacherclass)

var Insertclass=require('./api/insertclass')
app.use('/insertclass',Insertclass)

var Deleteclass=require('./api/deleteclass')
app.use('/deleteclass',Deleteclass)

var Selectclass=require('./api/selectclass')
app.use('/selectclass',Selectclass)

var Signclass=require('./api/classsign')
app.use('/classsign',Signclass)

var Insertsignclass=require('./api/insertsignclass')
app.use('/insertsignclass',Insertsignclass)

var Selectsign=require('./api/selectsign')
app.use('/selectsign',Selectsign)

var Passsign=require('./api/passsign')
app.use('/passsign',Passsign)

var Yuyueselect=require('./api/selectsignbaoming')
app.use('/yuyue',Yuyueselect)

var Insertbooking=require('./api/insertbooking')
app.use('/insertbooking',Insertbooking)

var isbooking=require('./api/isbooking')
app.use('/isbooking',isbooking)

var Selectbooking=require('./api/selectbooking')
app.use('/selectbooking',Selectbooking)

var Dealbooking=require('./api/dealbooking')
app.use('/dealbooking',Dealbooking)

var Selectuser=require('./api/selectuser')
app.use('/selectuser',Selectuser)

var Deleteuser=require('./api/deleteuser')
app.use('/deleteuser',Deleteuser)

var Uploadimage=require('./api/uploadimage')
app.use('/uploadimage',Uploadimage)

var Classview=require('./api/classview')
app.use('/classview',Classview)

app.use(express.static('uploads')) 
app.listen(3000,()=>{
    console.log('app start port 3000')
    })