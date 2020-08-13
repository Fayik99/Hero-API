const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router =  express.Router();

const SECRET_KEY = "123456789";

const User = require("../models/user");
const { use } = require("bcrypt/promises");

router.post("/",  async (req, res) => {

    try{

        let user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(400).send("Invalid email/password");
 
        let pwValid = await bcrypt.compare(req.body.password, user.password);
        if(!pwValid) return res.status(400).send("Invalid email/password");

        let token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, SECRET_KEY);

        res.send({ token: token});
    

    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;