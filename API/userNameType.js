const express = require("express");
const app = express();
const UserData = require("../Modals/registration");
const validator = require("email-validator");
const userNameType = require("../Modals/userNameType");

const SaveUserNameType = async (req, res) => {
  console.log(req.body);
  const structure = new userNameType({
    structure: req.body.structure,
    startwith: req.body.startwith,
  });
  const result = await structure.save();
  res.json(result);
};

const ChangeStatrWith = async (req, res) => {
        const structure = await userNameType.find()
        const update = { startwith: req.body.startwith }
        const updatestructure = await userNameType.findOneAndUpdate({ structure: structure[0].structure }, update)
        res.send(updatestructure)
   
}

const userNameMathod = async (req, res) => {
    if (req.body.structure === "auto" || req.body.structure === "menual") {
        const structure = await userNameType.find()
        const update = { structure: req.body.structure }
        const updatestructure = await userNameType.findOneAndUpdate({ structure: structure[0].structure }, update)
        res.send(updatestructure)
    } else {
        res.send('bad credentials')
    }
}

module.exports = { SaveUserNameType,ChangeStatrWith,userNameMathod };
