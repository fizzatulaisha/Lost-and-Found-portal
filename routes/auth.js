const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/signup", async (req, res) => {

    const { name, email, pass, cpass } = req.body;

    if(pass !== cpass){
      req.flash("error","Passwords don't match");
        return res.redirect("/signup");
    }

    const existingUser = await User.findOne({ email });

    if(existingUser){
        req.flash("error","Email already registered");
        return res.redirect("/signup");
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const user = new User({
        name,
        email,
        pass: hashedPassword
    });

    await user.save();
  req.flash("success","User registered successfully");
    res.redirect("/login");

});
router.post("/login", async (req, res) => {

    try {

        const { email, pass } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/login");
        }
        // console.log(pass);
        // console.log(user.pass);

        const isMatch = await bcrypt.compare(
            pass,
            user.pass
        );

        if (!isMatch) {
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/login");
        }

        req.session.userId = user._id;
        req.session.isLoggedIn = true;

        req.flash("success", "Welcome Back!");

        res.redirect("/");

    } catch (err) {

        console.log(err);

        req.flash("error", "Something went wrong.");

        res.redirect("/login");

    }

});
router.get("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.redirect("/browse");
        }

        res.redirect("/login");

    });

});
module.exports = router;