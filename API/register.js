const UserData = require('../Modals/registration')
const validator = require("email-validator")
const userNameType = require('../Modals/userNameType')
const passwordType = require('../Modals/passwordType')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { passwordStrength } = require('check-password-strength')

const register = async(req,res)=>{
    const bodyTest = req.body
    const velidUserName = await generateUserName(bodyTest?.user_Id)
    const isEmail = await validator.validate(bodyTest.email)
    if (bodyTest.phone >= 1000000000 && bodyTest.phone <= 9999999999) {
        if (isEmail) {
            if (velidUserName) {
                try {
                    const sponsor_Data = await UserData.findOne({ user_Id: bodyTest.sponsor_Id })
                    const isexist = await UserData.findOne({ user_Id: velidUserName })
                    const isStrongPassword = await generatePassword(bodyTest.password)
                    if (isStrongPassword) {
                        if (isexist) {
                            res.status(400).json({ massage: 'username already exist' })
                        } else
                            if (sponsor_Data !== null) {
                                const user = new UserData(
                                    {
                                        name: bodyTest.name,
                                        email: bodyTest.email,
                                        phone: bodyTest.phone,
                                        password: isStrongPassword,
                                        status: "inactive",
                                        user_Id: velidUserName,
                                        sponsor_Id: bodyTest.sponsor_Id,
                                        level_upline:
                                        {
                                            sponsor_1: bodyTest.sponsor_Id,
                                            sponsor_2: sponsor_Data.level_upline?.sponsor_1,
                                            sponsor_3: sponsor_Data.level_upline?.sponsor_2,
                                            sponsor_4: sponsor_Data.level_upline?.sponsor_3,
                                            sponsor_5: sponsor_Data.level_upline?.sponsor_4,
                                            sponsor_6: sponsor_Data.level_upline?.sponsor_5,
                                            sponsor_7: sponsor_Data.level_upline?.sponsor_6,
                                            sponsor_8: sponsor_Data.level_upline?.sponsor_7,
                                            sponsor_9: sponsor_Data.level_upline?.sponsor_8,
                                            sponsor_10: sponsor_Data.level_upline?.sponsor_9,
                                        },

                                        level_Team:
                                        {
                                            level_1: [],
                                            level_2: [],
                                            level_3: [],
                                            level_4: [],
                                            level_5: [],
                                            level_6: [],
                                            level_7: [],
                                            level_8: [],
                                            level_9: [],
                                            level_10: []
                                        }
                                    }
                                )
                                const accessToken = jwt.sign(
                                    { user_Id: user.user_Id },
                                    "secretkeyappearsheregdsahgdahdcasdfdcasgdfdafsadf\dsasdajsdghf\dhashdga\sdfhfdj",
                                    { expiresIn: "1h" }
                                  )
                                const result = await user.save()
                                // const income = new IncomeData(
                                //     {
                                //         user_Id: result.user_Id,
                                //         level_Income: [],
                                //         total_level_Income: 0
                                //     }
                                // )
                                // const income_Result = await income.save()
                                res.status(201).json({
                                    massage: 'registration success',
                                    accessToken:accessToken,
                                    result
                                })
                                updateLevel(result.user_Id)
                            } else {
                                res.status(400).json({ massage: 'sponsor id not exist' })
                            }
                    } else {
                        res.status(400).json({ massage: 'please enter strongest password' })
                    }
                } catch (e) {
                    console.log(e)
                    res.status(400).json(e)
                }
            } else {
                res.status(400).json({ massage: 'please enter valid username' })
            }
        } else {
            res.status(400).json({ massage: 'please enter valid email' })
        }
    } else {
        res.status(400).json({ massage: 'please enter valid mobile number' })
    }
}

const generateUserName = async (userName) => {
    const userName_structure = await userNameType.findOne()
    if (userName) {
        if (userName_structure.structure === "auto") {
            const userNmae = `${userName_structure.startwith}${Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)}`
            console.log(userNmae)
            return userNmae
        } else if (userName_structure.structure === "menual") {
            var alfanum = /^[0-9a-zA-Z]+$/
            if (userName.match(alfanum)) {
                console.log(true)
                return userName
            } else {
                console.log(false)
                return false
            }
        }
    } else {
        console.log("please enter user Id")
    }
}

const generatePassword = async (password) => {
    const password_structure = await passwordType.findOne()
    if (password_structure.structure === "auto") {
        return hashPassword(generateString(6))
    } else if (password_structure.structure === "menual") {
        if (password_structure.passwordType === "basic") {
            return hashPassword(password)
        } else if (password_structure.passwordType === "strong") {
            if (password.length === 7) {
                return hashPassword(password)
            } else {
                return false
            }
        } else if (password_structure.passwordType === "strongest") {
            const isStrong = await passwordStrength(password).value
            console.log(isStrong)
            if (isStrong === "Strong") {
                console.log(password)
                return hashPassword(password)
            } else {
                console.log(false)
                return false
            }
        }
    }
}
const updateLevel = async (user_Id) => {
    const new_userdata = await UserData.findOne({ user_Id })
    let level_upline = new_userdata.level_upline
    objectLenght = Object.keys(level_upline).length;
    var k = 0;
    for (let x in level_upline) {
        var update = await UserData.findOne({ user_Id: level_upline[x] })
        if (update !== null) {
            const objKeys = Object.keys(update?.level_Team)[k]
            console.log(`${objKeys} ${k}`)
            const newTeamData = await update?.level_Team[objKeys].push({
                name: new_userdata.name,
                phone: new_userdata.phone,
                status: new_userdata.status,
                user_Id: new_userdata.user_Id,
                sponsor_Id: new_userdata.sponsor_Id,
            })
            const upload_updated_data = await UserData.findOneAndUpdate({ user_Id: level_upline[x] }, update)
        }
        k++;
        if (k === objectLenght) {
            break;
        }
    }
}
const hashPassword = async (plaintextPassword) => {
    const hash = await bcrypt.hash(plaintextPassword, 10)
    return await hash
}
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
module.exports = {register}