const express = require("express");
const passwordType = require("../API/passwordType")
var bodyParser = require('body-parser');
const { SaveUserNameType, ChangeStatrWith, userNameMathod,getUserNameMethod } = require("../API/userNameType");

const { Login } = require("../API/Login");
const { getProfile, UpdateProfile, register } = require("../API/Profile");
const { UpdatePassword, sendOtp } = require("../API/UpdatePassword");
const { upload } = require("../API/UploadFile");
const { getGeneration } = require("../API/GetGenerationTeam");
const { getTeamDetails } = require("../API/getTeam");
const cors = require('cors');
const { generateToken } = require("../commons/Authorization");
const { save_bank_kyc } = require("../API/Kyc");

var router = express.Router();
var jsonParser = bodyParser.json();
router.use(jsonParser)
router.get('/', (req, res) => {
    res.send("hello")
})
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
};



router.use(cors(corsOpts));
router.use(express.static(__dirname + '../uploads/'))
// router.post('/create_password_type', passwordType.SavePasswordType)
router.post('/change_password_type', passwordType.ChangePasswordType)
router.post('/change_password_mathod', passwordType.passwordMathod)
// router.post('/save_username_type', SaveUserNameType)
router.post('/change_username_mathod', userNameMathod)
router.post('/change_username_startwith', ChangeStatrWith)
router.get('/get_username_method', getUserNameMethod)

router.post('/register', register)
router.post('/Login', Login)
router.get('/getprofile', getProfile)
router.post('/updateProfile', upload, UpdateProfile)
router.post('/updatepassword', UpdatePassword)
router.get('/getGeneration', getGeneration)
router.post('/testclass', getTeamDetails.getDirectTeam)
router.post('/sendotp',sendOtp)
router.post('/save_bank_kyc', upload, save_bank_kyc)
// console.log(generateToken("123456"))
//console.log(Authorization.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzU0MDU4OTAsImV4cCI6MTY3NTQwOTQ5MH0.zMNYctijC2UM8-yDkfL1O2a0Y-8OhN_KupZFw484tJw"))


module.exports = router;