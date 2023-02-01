const jwt = require("jsonwebtoken");
const { secrateKey } = require("../keys");
const UserData = require("../Modals/registration");
const getGeneration = async(req,res)=>{
  const Authorization_Token = await req.header('Authorization')
  if(Authorization_Token){
    jwt.verify(Authorization_Token,secrateKey(), function (err, resp) {
        if (err) {
          res.json({err});
        } else {
          UserData.findOne({user_Id:resp.user_Id},async(err,result)=>{
            if(err){
                res.json(err)
            }else{
                res.json(result.level_Team)
            }
          })
        }
      });
  }else{
    res.json("Failed to authenticate token.")
}
}

module.exports = {getGeneration}
