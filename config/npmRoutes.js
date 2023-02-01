const express = require('express');
const validator = require("email-validator")
const jwt = require("jsonwebtoken");
const { passwordStrength } = require('check-password-strength');
const bcrypt = require("bcrypt")

module.exports = {express,validator,jwt,passwordStrength,bcrypt}