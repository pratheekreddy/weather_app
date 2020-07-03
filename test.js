const express=require('express')
var bodyParser = require('body-parser')

const app=express()
app.use(bodyParser.json())

app.get('/ab?cd',(req,res)=>{
    console.log('hello')
})

app.listen(3000)