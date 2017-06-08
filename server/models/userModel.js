const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 10; //I honestly have no idea how this affects it 

// create a schema

/*
    change: 
        isAdmin as SCOPE: []
 */

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, required: true, index: { unique: true }},
  password: {type: String, required: true},
  scope: {type: Array, default: ['BASE']},
  isSubscriber: {type: Boolean, default: false},
  isLoggedIn: {type: Boolean, default: false},
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});


userSchema.pre('save', function(next) {
    const user = this; //declare or bind this, to all functiions
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) { 
        return next();
    }        
    // generate a salt
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) {
            return next(err);
        }
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            // override the cleartext password with the hashed one
            user.password = hash;
            return next();
        })
    })
});

userSchema.statics = {
    //add requried fields for userModel, don't let it be empty
    createOne: async function(newUser) {
        const query = {}
        const modifier = newUser
        const operation = await new this(newUser).save( function( err, user) {
            if (err) {
                return {err: {message: err.message}, user: null}
            }
            return { 
                err: null,
                message: "you successfuly registered!",
                user: {id: user._id, scope: user.scope, firstName: user.firstName, lastName: user.lastName, email: user.email}
            }
        }).catch( err => {
            return {err: {message: err.message}, user: null}
        });

        return operation
    },
    updateOne: async function(newUser) {},
    deleteOne: async function(userID) {},
    getOne: async function(userID) {
        const query = {_id: userID}
        const operation = await this.findOne(query).lean()//.catch(err => {return err.message})
        try {
            const {firstName, lastName, email, comments, posts, isSubscriber, scope} = operation
            return {message: "success", user: {firstName, lastName, email, comments, posts, isSubscriber, scope}}
        }
        catch (err) {
            return {message: err.message, user: null}
        }
    },
    verifyIdentity: async function(user) {
        const query = {email: user.email}
        const operation = await this.findOne(query).lean()//.catch(err => {return err.message})
        if (!operation) {
            return {err: "User does not exist", user: null, status: 401} //after code is stable change this to be "wrong user/pass combination"
        }
        const res = await new Promise( (resolve, reject) => {
            this.comparePassword( user.password, operation.password, function(err, isMatch) {
                if (err) {
                    reject( err )
                }
                resolve( {err: null, message: "success!", user: {
                    id: operation._id,
                    scope: operation.scope,
                    firstName: operation.firstName,
                    lastName: operation.lastName,
                    email: operation.email
                }})
            })
        })

        try {
            return res
        } catch( err ) {
            return { message: err.message, user: null}
        }
    },
    comparePassword: async function(candidatePassword, hashPassword, cb) {
        bcrypt.compare(candidatePassword, hashPassword, function(err, isMatch) {
            if (!isMatch) {
                return cb(new Error("Incorrect email or password"), isMatch);
            }
            return cb(null, isMatch);
        });
    }
}

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('user', userSchema);

// (function(User){
// var testUser = new User({
//   firstName: "Janis",
//   lastName: "Rubens",
//   email: "janis.rubens@gmail.com",
//   password: "random123",
//   isAdmin: true,
//   isSubscriber: false,
//   posts: ['5927354054cd6c2c101384df','59288b6e20c4773434625c7b'],
//   comments: ['5926a62c734d1d24d07e53c0']
// });

// testUser.save(function(err) {
//     if (err) throw err;
// })
// }(User))

// make this available to our users in our Node applications
module.exports = User;