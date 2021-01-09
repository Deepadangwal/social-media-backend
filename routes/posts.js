const router = require('express').Router();
const Post = require('../model/post.js');
const auth = require('./verifyToken');
const User = require('../model/user.js');

router.post('/new/post', auth, async (req, res) => {
	// checkingif user is logged in
	const { _id } = req.user;
	//creating a new post
	try {
		const newPosts = new Post(req.body);
		await newPosts.save();
		// finding the user in the database
		const user = await User.findById(_id);
		user.posts.push(newPosts._id);
		await user.save();
		res.status(200).send(newPosts._id);
	} catch (err) {
		res.status(500).send(err);
	}
});
router.get('/', auth, async (req, res) => {
	const { _id } = req.user;
	const user = await User.findById(_id);
	Promise.all(user.posts.map((postId) => Post.findById(postId)))
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});
router.get('/post/:id', async (req, res) => {
	const post = await Post.findById(req.params.id);
	res.status(200).json(post);
});

module.exports = router;
