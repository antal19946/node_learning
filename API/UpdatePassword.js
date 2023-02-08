const UserData = require("../Modals/registration");
const jwt = require("jsonwebtoken");
const { secrateKey } = require("../keys");
const bcrypt = require("bcrypt");
const config = require('config')
const mailerUserName = config.get('server.mailerUserName')
const nodemailer = require("nodemailer");
const mailerPassword = config.get('server.mailerPassword')
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

class forgotPassword{
  async sendOtp(req,res){
    const {email} = req.body
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: mailerUserName, // generated ethereal user
        pass: mailerPassword, // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      from: 'rajeevkumar001834@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    res.send(info.messageId)
  }
}
const {sendOtp}=new forgotPassword()
module.exports ={UpdatePassword,sendOtp}