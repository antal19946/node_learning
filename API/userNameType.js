const express = require("express");
const app = express();
const UserData = require("../Modals/registration");
const validator = require("email-validator");
const userNameType = require("../Modals/userNameType");
const passwordType = require("../Modals/passwordType");


class userName {
  async SaveUserNameType(req, res) {
    console.log(req.body);
    const structure = new userNameType({
      structure: req.body.structure,
      startwith: req.body.startwith,
    });
    const result = await structure.save();
    res.json(result);
  };

  async ChangeStatrWith(req, res) {
    const structure = await userNameType.find()
    const update = { startwith: req.body.startwith }
    const updatestructure = await userNameType.findOneAndUpdate({ structure: structure[0].structure }, update)
    res.send(updatestructure)

  }

  async userNameMathod(req, res) {
    if (req.body.structure === "auto" || req.body.structure === "manual") {
      const structure = await userNameType.find()
      const update = { structure: req.body.structure }
      const updatestructure = await userNameType.findOneAndUpdate({ structure: structure[0].structure }, update)
      res.send(updatestructure)
    } else {
      res.send('bad credentials')
    }
  }

  async getUserNameMethod(req, res) {
    try {
      const userNameResult = await userNameType.find()
      const passwordResult = await passwordType.find()
      res.json({userNameResult,passwordResult})
    } catch (err) {
      res.json(err)
    }

  }
}

// const SaveUserNameType = async (req, res) => {
//   console.log(req.body);
//   const structure = new userNameType({
//     structure: req.body.structure,
//     startwith: req.body.startwith,
//   });
//   const result = await structure.save();
//   res.json(result);
// };

// const ChangeStatrWith = async (req, res) => {
//         const structure = await userNameType.find()
//         const update = { startwith: req.body.startwith }
//         const updatestructure = await userNameType.findOneAndUpdate({ structure: structure[0].structure }, update)
//         res.send(updatestructure)

// }

// const userNameMathod = async (req, res) => {
//     if (req.body.structure === "auto" || req.body.structure === "manual") {
//         const structure = await userNameType.find()
//         const update = { structure: req.body.structure }
//         const updatestructure = await userNameType.findOneAndUpdate({ structure: structure[0].structure }, update)
//         res.send(updatestructure)
//     } else {
//         res.send('bad credentials')
//     }
// }
// const getUserNameMethod = async (req,res)=>{
//   try{
//     const result = await userNameType.find()
//   res.json(result)
//   }catch(err){
//     res.json(err)
//   }

// }
const { SaveUserNameType, ChangeStatrWith, userNameMathod, getUserNameMethod } = new userName

module.exports = { SaveUserNameType, ChangeStatrWith, userNameMathod, getUserNameMethod };
