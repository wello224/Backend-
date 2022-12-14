const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const profile = require("../../models/profile");

//route post api/profile/me
//desc Authenticate user & get the token
//access private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            "user",
            ["name"]
        );
        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("server error");
    }
});

//route post api/profile
//desc Craete or Update User Profile
//access private
router.post(
    "/",
    [
        auth,
        [
            check("Gender", "Gender is required").not().isEmpty(),
            check("Address", "Address is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { Address, Gender, handle } = req.body;
        const profileFields = {};
        profileFields.user = req.user.id;
        if (Address) profileFields.Address = Address;
        if (Gender) profileFields.Gender = Gender;
        if (handle) profileFields.handle = handle;
        console.log(Gender);
        console.log(Address);
        console.log(handle);
      
        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                //update
                 profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }
            //create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("server error");
        }
    }
);

module.exports = router;
