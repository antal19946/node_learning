const express = require('express')
require('./DBconnection/connection')
const app = express()
const config = require('config')
const port = config.get('server.port')
const router = require('./routes/index')
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/uploads/'))
const cors = require('cors')

// app.use(cors)
app.use(router)
var bodyParser = require('body-parser'); 
// const { cors } = require('./config/npmRoutes')
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());
app.use(express.json())
// app.use(cors)

// app.post('/',(req,res)=>{
//     res.send("hello")
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))