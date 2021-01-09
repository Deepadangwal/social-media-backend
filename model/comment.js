const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	postId: {
		type: String,
		required: true
	},
	dateAndTime: {
		type: Date,
		default: Date.now()
	},
	comment: {
		type: String,
		required: true,
		max: 1000
	}
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
