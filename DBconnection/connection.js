const mongoose = require('mongoose')
const config = require('config')
console.log(process.env.MONGODB_URI)
const dbName = config.get('server.dbName')
const uri = `mongodb://0.0.0.0:27017/matrix-api${dbName}`
mongoose.set("strictQuery", false);
mongoose.connect(uri,{
   
    useNewUrlParser:true
}).then(()=>{
    console.log('mongoose connected successfully')
}).catch((e)=>{
    console.log(e)
})
