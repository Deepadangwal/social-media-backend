const router = require('express').Router();
const Post = require('../model/post.js');
const Comment = require('../model/comment.js');
const auth = require('./verifyToken');

router.post('/new/comment', auth, async (req, res) => {
	// checking if user is logged in
	const { _id } = req.user;
	try {
		// creating new comment
		const comment = new Comment({
			userId: _id,
			postId: req.body.postId,
			dateAndTime: new Date(),
			comment: req.body.comment
		});
		comment.save();
		const post = await Post.findById(req.body.postId);
		post.comments.push(comment._id);
		post.save();
		res.status(200).send('comment added');
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get('/:postId', auth, async (req, res) => {
	const post = await Post.findById(req.params.postId);
	Promise.all(post.comments.map((commentId) => Comment.findById(commentId)))
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});
module.exports = router;
