const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const commentSchema = new Schema({
  text: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  pinned: Boolean,
  votes: Number,
  createdAt: {type: Date, default: Date.now},
  postID: String
});

commentSchema.statics = {
  getAllByPostID: async function(postID) {
    const query = {postID: postID}
    const operation = await this.find(query).lean().catch(err => {return err.message})

    try {
      return {message: "success", comments: operation}
    }
    catch (err) {
      return {message: err.message, comments: null}
    }
  }
}

// the schema is useless so far
// we need to create a model using it
var Comment = mongoose.model('comment', commentSchema);

// make this available to our users in our Node applications
module.exports = Comment;