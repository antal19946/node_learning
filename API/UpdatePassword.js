const UserData = require("../Modals/registration");
const jwt = require("jsonwebtoken");
const { secrateKey } = require("../keys");
const bcrypt = require("bcrypt");

const UpdatePassword = async(req,res)=>{
    const {password,newPassword} = req.body
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
                const comparePassword = await bcrypt.compare(password, result.password)
                if(comparePassword){
                    const hash = await bcrypt.hash(newPassword, 10)
                    UserData.findOneAndUpdate({user_Id:resp.user_Id},{password:hash},async(err,result)=>{
                        if(err){
                            res.json(err)
                        }else{
                            res.json({
                                message:"password updated successfuly",
                                result
                            })
                        }
                    })
                }else{
                    res.json({
                        message:"old password dose note match"
                    })
                }
                //   res.json(result)
              }
            })
          }
        });
    }else{
      res.json("Failed to authenticate token.")
  }
}
module.exports ={UpdatePassword}