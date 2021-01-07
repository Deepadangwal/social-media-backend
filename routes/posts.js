const router = require('express').Router();
const Post = require('../model/post.js');

router.get('/', (req, res) => {
	res.json({
		title: 'This is my first post',
		likes: 5
	});
});

module.exports = router;
