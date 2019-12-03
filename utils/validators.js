const {body} = require('express-validator/check')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
    .isEmail().withMessage('Prease enter correct email')
    .custom(async (value, {req}) => {
        try {
            const user = await User.findOne({ email: value })
            if (user) {
                return Promise.reject('This email already taken')
            }
        } catch (e) {
            console.log(e)
        }
    })
    .normalizeEmail(),
    body('password', 'Password should be minimun 6 symbols')
    .isLength({min: 6, max: 56})
    .isAlphanumeric()
    .trim,
    body('confirm')
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords should match')
        }
        return true
    })
    .trim(),
    body('name')
    .isLength({min: 3}).withMessage('Name should be minimum 3 symbols')
    .trim()
]


exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Minimum 3 symbols in the title').trim(),
    body('price').isNumeric().withMessage('Enter correct price'),
    body('img', 'Enter correct picture URL').isURL()
]