const express = require('express')
const router = express.Router()
const regForm = require('../models/usersinfo.js')
const bcrypt = require('bcrypt')

router.route('/registerform').post(async (req, res) => {

    const saltpsw = await bcrypt.genSalt(10);
    const securepsw = await bcrypt.hash(req.body.password, saltpsw);

    const registeredUser = new regForm({
        fname : req.body.fname,
        lname : req.body.lname,
        username : req.body.username,
        email : req.body.email,
        reg : req.body.reg,
        degree : req.body.degree,
        spc : req.body.spc,
        city : req.body.city,
        states : req.body.states,
        country : req.body.country,
        password : securepsw,
    });
    registeredUser.save()
    .then(data =>{
        res.json(data)
    })
    .catch(error =>{
        res.json(error)
    });
});

router.route('/login').post(async (req, res) => {
    regForm.findOne({ username: req.body.username })
        .then(user => {
            console.log("User from login", user)
            if (!user) res.sendStatus(204);
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
            }
        });
});

router.route('/validate').post(async (req, res) => {
    regForm.findOne({username: req.body.username})
    .then(user => user ? res.sendStatus(204) : res.sendStatus(200))

        // .then(user => user ? res.json({val : 1}) : res.json({val : 0}))

        // res.json(req.body)
        // res.json(req.body)

        // .then(user => {
        //     let errors = {}
        //     if(user.username === req.body.username)   
        //         errors.username = "Username exists";
        //     else 
        //         errors.username = "does not exist";
        //     res.json(errors)
        // })
        // .catch(err => res.json(err))
        // {
        //     if(username === '') res.sendStatus(200) 
            // else res.send("0")
        // });
});

module.exports = router