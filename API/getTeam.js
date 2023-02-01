const {express,validator,jwt,passwordStrength,bcrypt} = require('../config/npmRoutes')
const {UserData,userNameType,passwordType,IncomeData} = require('../config/DBroutes')
const { updateLevel } = require('./Update_Lavel_Team');
const { secrateKey } = require('../keys');
class getTeam{
   async getDirectTeam(req,res){
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
                    const {level_Team} = result
                    const {level_1} =level_Team
                      res.json(level_1)

                  }
                })
              }
            });
        }else{
          res.json("Failed to authenticate token.")
      }
    }
   
}
const getTeamDetails = new getTeam()
module.exports = {getTeamDetails}