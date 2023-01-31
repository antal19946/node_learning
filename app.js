const express = require('express')
require('./DBconnection/connection')
const app = express()
const config = require('config')
const port = config.get('server.port')
const router = require('./routes/index')
app.use(express.urlencoded({extended: false}))
const test = require('./API/passwordType')
app.use(router)
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json())

app.post('/test',(req,res)=>{
    console.log(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))