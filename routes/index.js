const express = require("express");
const passwordType = require("../API/passwordType")
var bodyParser = require('body-parser');  
const { SaveUserNameType,ChangeStatrWith,userNameMathod } = require("../API/userNameType");
const { register } = require("../API/register");
const { Login } = require("../API/Login");
var router = express.Router();  
  
var jsonParser = bodyParser.json();
router.use(jsonParser)

router.post('/create_password_type',passwordType.SavePasswordType)
router.post('/change_password_type',passwordType.ChangePasswordType)
router.post('/change_password_mathod',passwordType.passwordMathod)
router.post('/save_username_type',SaveUserNameType)
router.post('/change_username_mathod',userNameMathod)
router.post('/change_username_startwith',ChangeStatrWith)
router.post('/register',register)
router.post('/Login',Login)

module.exports = router;