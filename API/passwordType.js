const express = require("express");
const app = express();
const UserData = require("../Modals/registration");
const validator = require("email-validator");
const userNameType = require("../Modals/userNameType");
const passwordType = require("../Modals/passwordType");

const SavePasswordType = async (req, res) => {
  console.log(req.body);
  const structure = new passwordType({
    structure: req.body.structure,
    passwordType: req.body.passwordType,
  });
  const result = await structure.save();
  res.json(result);
};

const ChangePasswordType = async (req, res) => {
    if (req.body.passwordType === "basic" || req.body.passwordType === "strong" || req.body.passwordType === "strongest") {
        const structure = await passwordType.find()
        const update = { passwordType: req.body.passwordType }
        const updatestructure = await passwordType.findOneAndUpdate({ structure: structure[0].structure }, update)
        res.send(updatestructure)
    } else {
        res.send('bad credentials')
    }
}

const passwordMathod = async (req, res) => {
    if (req.body.structure === "auto" || req.body.structure === "menual") {
        const structure = await passwordType.find()
        const update = { structure: req.body.structure }
        const updatestructure = await passwordType.findOneAndUpdate({ structure: structure[0].structure }, update)
        res.send(updatestructure)
    } else {
        res.send('bad credentials')
    }
}

module.exports = { SavePasswordType,ChangePasswordType,passwordMathod };
