const { jwt } = require("./common_Routes/npmRoutes")
const { secrateKey } = require("../keys")

class Auth{
    constructor(auth) {
      this.user_Id = auth
      }
    generateToken(user_Id){
       return jwt.sign(
            { user_Id},
            secrateKey(),
            { expiresIn: "1h" }
          )

    }
    verifyToken(){
     return jwt.verify(this.user_Id,secrateKey(), function (err, resp) {
            if (err) {
              return err
            }else{
                return resp
            }
        }
        )
    }
}
const {generateToken} = new Auth()
module.exports = {generateToken}