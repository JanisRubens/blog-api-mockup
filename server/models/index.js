const initializeDB = ( url, mongoose ) => {
  //set mongoose def promise lib
  mongoose.Promise = global.Promise;
  // connect to the database
  mongoose.connect(url, function(err) {
    if (err) { throw err; }
    else { console.log("Connection established succesfully") }
  });

    // loading models
    require('./postModel');
    require('./categoryModel');
    require('./commentModel');
    require('./userModel');
    
};

module.exports = initializeDB
