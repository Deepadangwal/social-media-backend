const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
	content: {
		type: String,
		required: true,
		max: 10000
	},
	likes: {
		type: Number,
		default: 0
	},
	comments: {
		type: [ String ]
	},
	// location: {
	// 	type: Point,
	// 	coordinates: []
	// },
	feelings: {
		type: String
	},
	dateAndTime: {
		type: Date,
		required: true,
		default: Date.now()
	}
});
const Post = mongoose.model('Post', postSchema);
module.export = Post;
