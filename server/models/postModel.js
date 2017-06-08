// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var postSchema = new Schema({
  title: String,
  uniq_url: {type: String, index: {unique: true, dropDups: true}, required: true},
  content: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  createdAt: {type: Date, default: Date.now},
  src: String,
  votes: Number,
  featured: Boolean,
  published: {type: Boolean, default: false},
  category: String,
  keywords: Array
});

//cant use arrow functions, lose "this" as module
postSchema.statics = {
  //Eventualy getAll would get replaces with something like getBulk()
  
  
  /*
    getBulk() Return a selected number of post, filtered by date
    param startIndex number for post number
    param count  number of posts returned 
  

    var res = {}
    var k = posts.forEach( post => {
    post.keywords.forEach( keyword => {
      res[keyword] = ( res[keyword] || 0) +1 
    })
    })


    var k = new Set(...posts.map( post => {
    return post.keywords
  }))
  
    If i plan to get the keywords by loading all posts, it makes no sense to load bulk poasts

   */
  getKeyWords: async function() {
    const query = {}
    const operation = await this.find(query).lean();
    const getKeywords = (posts => {
      let keyWords = {}
      posts.forEach( post => {
        post.keywords.forEach( keyword => {
          res[keyword] = ( res[keyword] || 0) +1 
        })
      })
      return keyWords
    })
    try {
      return {message: "success", keywords: operation}
    }
    catch (err) {
      return {message: err.message, keywords: null}
    }
  },
  getAll: async function () {
    const query = {}
    const operation = await this.find(query).populate('author', 'firstName lastName email').lean();
    try {
      return {message: "success", posts: operation}
    }
    catch (err) {
      return {message: err.message, posts: null}
    }
  },
  getBulk: async function(startIndex=0, count=2) {
    const query = {}
    const modifier = {}
    const options = {}
    const operation = await this.find(query).populate('author', 'firstName lastName email').sort({createdAt: -1}).skip(parseInt(startIndex)).limit(parseInt(count))
    try {
      return {message: "success", posts: operation}
    }
    catch (err) {
      return {message: err.message, posts: null}
    }
  },
  saveOne: async function(post) {
  return await new this(post).save(function(err,post) {
              return { message: "Post successfully added!", post: post };
      }).catch(err=> {return err.message;});
  },
  getOne: async function(postID) {
    const query = {uniq_url: postID}
    const operation = await this.find(query).lean().catch(err => {return err.message})

    try {
      return {message: "success", post: operation}
    }
    catch (err) {
      return {message: err.message, post: null}
    }
  },
  updateOne: async function( post ) {
    const query = {_id: post._id}
    const modifier = {$set: post}
    const options = {new: true, upsert: true}
    const operation = await this.findOneAndUpdate(query, modifier, options).catch(err => {return err.message})

    try {
      return {message: "Post successfully updated!!!", post: operation}
    }
    catch (err) {
      return err.message
    }
  },
  deleteOne: async function(postID) {
    const query = {_id: postID}
    const operation = await this.findOneAndRemove(query).catch(err => {return err.message})

    try {
      return {message: "Post successfully deleted!!!", post: operation}
    }
    catch (err) {
      return err.message
    }
  }

}

// the schema is useless so far
// we need to create a model using it
const Post = mongoose.model('post', postSchema);

// make this available to our users in our Node applications
module.exports = Post;