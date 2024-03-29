const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
// const auth = require("../Controllers/");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ msg: 'Please enter all fields' });
        }
        User.findOne({ email })
            .then(user => {
                if (!user) return res.status(400).json({ msg: 'User does not exist' });
                bcrypt.compare(password, user.password)
                    .then(ismatch => {
                        if (!ismatch) {
                            return res
                                .status(400)
                                .json({ errors: [{ msg: "Invalid Information " }] });
                        }
                        jwt.sign(
                            { id: user._id },
                            config.get('jwtsecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                });
                            }
                        )


                    })



            })

    },
    get_user: async (req, res) => {
        try {
          const user = await User.findById(req.user.id).select("-password");
          res.json(user);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("server eroor");
        }
      }
}

// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server eroor");
//   }
// });


// //route post api/auth
// //desc Authenticate user & get the token
// //access public
// router.post(
//   "/",
//   [
//     check("email", " please include a vaild email ").isEmail(),
//     check("password", "password is required").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;
//     try {
//       //check if user exists
//       let user = await User.findOne({ email });
//       if (!user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "Invalid" }] });
//       }

// const isMatch =  await bcrypt.compare(password  ,  user.password);
// if(!isMatch){
//    return res
//           .status(400)
//           .json({ errors: [{ msg: "Invalid Information " }] });
// }

//       //return jsonwebtoken
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };
//       jwt.sign(
//         payload,
//         config.get("jwtsecret"),
//         { expiresIn: 360000 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (error) {
//       console.error(err.message);
//       res.status(500).send("server eroor");
//     }
//   }
// );