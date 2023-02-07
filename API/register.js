const express = require('express');
const validator = require("email-validator")
const jwt = require("jsonwebtoken");
const { passwordStrength } = require('check-password-strength');
const bcrypt = require("bcrypt")
const cors = require('cors')
const IncomeData = require("../Modals/IncomeData")
const passwordType = require("../Modals/passwordType")
const UserData = require("../Modals/registration")
const userNameType = require("../Modals/userNameType")
const { updateLevel } = require('./Update_Lavel_Team');
const { secrateKey } = require('../keys');
// console.log(secrateKey())
const register = async(req,res)=>{
    const {name,email,phone,password,user_Id,sponsor_Id} = req.body
    const velidUserName = await generateUserName(user_Id)
    const isEmail = await validator.validate(email)
    if (phone >= 1000000000 && phone <= 9999999999) {
        if (isEmail) {
            if (velidUserName) {
                try {
                    const sponsor_Data = await UserData.findOne({ user_Id: sponsor_Id })
                    const isexist = await UserData.findOne({ user_Id: velidUserName })
                    const isStrongPassword = await generatePassword(password)
                    if (isStrongPassword) {
                        if (isexist) {
                            res.status(400).json({ massage: 'username already exist' })
                        } else
                            if (sponsor_Data !== null) {
                                const user = new UserData(
                                    {
                                        name,
                                        email,
                                        phone,
                                        password: await hashPassword(isStrongPassword),
                                        user_Id: velidUserName,
                                        sponsor_Id,
                                        level_upline:
                                        {
                                            sponsor_1: sponsor_Id,
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
                                    secrateKey(),
                                    { expiresIn: "10h" }
                                  )
                                const result = await user.save()
                                const income = new IncomeData(
                                    {
                                        user_Id: result.user_Id,
                                        level_Income: [],
                                        total_level_Income: 0
                                    }
                                )
                                const income_Result = await income.save()
                                res.status(201).json({
                                    massage: true,
                                    accessToken,
                                    password:isStrongPassword,
                                    result
                                })
                                updateLevel(result.user_Id)
                            } else {
                                res.status(400).json({ message: 'sponsor id not exist' })
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
        } else if (userName_structure.structure === "manual") {
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
        return generateString(6)
    } else if (password_structure.structure === "manual") {
        if (password_structure.passwordType === "basic") {
            return password
        } else if (password_structure.passwordType === "strong") {
            if (password.length === 7) {
                return password
            } else {
                return false
            }
        } else if (password_structure.passwordType === "strongest") {
            const isStrong = await passwordStrength(password).value
            console.log(isStrong)
            if (isStrong === "Strong") {
                console.log(password)
                return password
            } else {
                console.log(false)
                return false
            }
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