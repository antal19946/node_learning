const jwt = require("jsonwebtoken");
const UserData = require("../Modals/registration");
const bcrypt = require("bcrypt");
const { secrateKey } = require("../keys");
const Login = async (req, res) => {
    const user_Id = req.body.user_Id
    const password = req.body.password
    const UserDetail = await UserData.findOne({ user_Id })
    try{
        if (UserDetail) {
            console.log(UserDetail)
            const comparePassword = await bcrypt.compare(password, UserDetail.password)
            if (UserDetail && comparePassword) {
                const accessToken = jwt.sign(
                    { user_Id: UserDetail.user_Id },
                    secrateKey(),
                    { expiresIn: "10h" }
                  )
                 res.json({accessToken,
                    status:true,
                    UserDetail})
            } else {
                res.json({
                    status:false,message:"username or Passwords dose NOT match!"})
            }
        } else {
            res.json({
                status:false,message:"username or Passwords dose NOT match!"})
        }
    }catch(e){
        res.json({
            status:false,messsage:"username or Passwords dose NOT match!"})

    }
   
}
module.exports = {Login}