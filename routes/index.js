const express = require("express");
const passwordType = require("../API/passwordType")
var bodyParser = require('body-parser');
const { SaveUserNameType, ChangeStatrWith, userNameMathod } = require("../API/userNameType");
const { register } = require("../API/register");
const { Login } = require("../API/Login");
const { getProfile } = require("../API/Profile");
const { UpdateProfile } = require("../API/UpdateProfile");
const { UpdatePassword } = require("../API/UpdatePassword");
const { upload } = require("../API/UploadFile");
const { getGeneration } = require("../API/GetGenerationTeam");
const {getTeamDetails} = require("../API/getTeam");
var router = express.Router();
var jsonParser = bodyParser.json();
router.use(jsonParser)
router.get('/', (req, res) => {
    res.send("hello")
})
router.use(express.static(__dirname + '../uploads/'))
// router.post('/create_password_type', passwordType.SavePasswordType)
router.post('/change_password_type', passwordType.ChangePasswordType)
router.post('/change_password_mathod', passwordType.passwordMathod)
// router.post('/save_username_type', SaveUserNameType)
router.post('/change_username_mathod', userNameMathod)
router.post('/change_username_startwith', ChangeStatrWith)
router.post('/register', register)
router.post('/Login', Login)
router.get('/getProfile', getProfile)
router.post('/updateProfile', upload, UpdateProfile)
router.post('/updatepassword', UpdatePassword)
router.get('/getGeneration', getGeneration)
router.post('/testclass', getTeamDetails.getDirectTeam)


module.exports = router;