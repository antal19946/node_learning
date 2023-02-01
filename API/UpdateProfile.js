const UserData = require("../Modals/registration");
const jwt = require("jsonwebtoken");
const { secrateKey } = require("../keys");
const os = require("os");
// const hostName = os.hostname();
const UpdateProfile = async(req,res)=>{
    const {name,email,phone} = req.body
    let fileName = req.file.filename
    let hostName = req.headers.host
    const profile_pic = 'http://'+ hostName + '/' + fileName
    const Authorization_Token = await req.header('Authorization')
    if(Authorization_Token){
      jwt.verify(Authorization_Token,secrateKey(), function (err, resp) {
          if (err) {
            res.json({err});
          } else {
            UserData.findOneAndUpdate({user_Id:resp.user_Id},{name,email,phone,profile_pic},async(err,result)=>{
              if(err){
                  res.json(err)
              }else{
                  res.json(result)
              }
            })
          }
        });
    }else{
      res.json("Failed to authenticate token.")
  }
}
module.exports ={UpdateProfile}