const router = require('express').Router()
const User = require('../model/user.js')
const validateUser = require('../validate/userValidate')
const bcrypt=require('bcryptjs')
// const newUser = new User()

// newUser.save()

// console.log(validateUser({
//     name: "Deepa Dangwal",
//     email: "deepa123@gmail.com",
//     password: "1223243244",
//     mobile: 9877976755,
//     DOB: new Date(),
// }))

router.post("/register", async (req, res)=> {
    //checking for data validity
    const { error } = validateUser(req.body)
    if(error)
        return res.status(400).send(error.details[0].message)
    //checking if the user exist in the database 
    const userExists =   await User.findOne({email: req.body.email})
    if(userExists){
      return  res.send("user already registered")
    } 
    //Password hashing
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt) 
    const user = {...req.body, password:hashPassword}
    //creating a new user and saving it to database
    try{
        const newUser = new User(user)
        await newUser.save()
        res.status(200).send(newUser)
    }
    catch(err){
        res.status(500).send(err)
    }
    
    
})

module.exports = router