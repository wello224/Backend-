const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require("../../models/User")
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');

//route post api/users
//desc Register user 
//access public









router.post(
    "/",
    [
        check("name", "Name is requierd").not().isEmpty(),
        check("email", " please include a vaild email ").isEmail(),
        check("password", "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number").isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        }).matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        ),
        check('Birthday').toDate().isISO8601('yyyy-mm-dd'),
        check('phone').isLength({ atmost: 11 }).isMobilePhone()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password, Birthday, phone } = req.body;
        try {
            //check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'user already exists' }] });
            }
            //get users gravatar 
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            user = new User({
                name,
                email,
                password,
                Birthday,
                phone
            });
            //encrypt password 
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();



            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload,
                config.get('jwtsecret'),
                { expiresIn: 360000 }
                , (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                })

        } catch (error) {
            console.error(err.message)
            res.status(500).send('server eroor')
        }



    }
);

module.exports = router;



