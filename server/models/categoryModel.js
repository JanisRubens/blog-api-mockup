const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const categorySchema = new Schema({
  name: String,
});

// the schema is useless so far
// we need to create a model using it
var Category = mongoose.model('category', categorySchema);

// make this available to our users in our Node applications
module.exports = Category;