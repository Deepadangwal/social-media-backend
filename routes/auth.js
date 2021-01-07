const router = require('express').Router();
const User = require('../model/user.js');
const { validateUserRegister, validateUserLogin } = require('../validate/userValidate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
	//checking for data validity
	const { error } = validateUserRegister(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if the user exist in the database
	const userExists = await User.findOne({ email: req.body.email });
	if (userExists) {
		return res.send('user already registered');
	}

	//Password hashing
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	const user = { ...req.body, password: hashPassword };

	//creating a new user and saving it to database
	try {
		const newUser = new User(user);
		await newUser.save();

		//Create and assign a token
		const token = jwt.sign({ _id: newUser._id }, process.env.Token_SECRET);
		res.header('auth-token', token).send(token);

		//res.status(200).send(newUser)
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post('/login', async (req, res) => {
	//validating the data
	console.log(req.body);
	const { error } = validateUserLogin(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if user exist
	const userExist = await User.findOne({ email: req.body.email });
	if (!userExist) return res.status(400).send('No user found please register');

	//Matching the password
	const isPasswordValid = await bcrypt.compare(req.body.password, userExist.password);
	if (!isPasswordValid) return res.status(400).send('Invalid password');

	//Create and assign a token
	const token = jwt.sign({ _id: userExist._id }, process.env.Token_SECRET);
	res.header('auth-token', token).status(200).send('sucessfully login');
});
module.exports = router;
