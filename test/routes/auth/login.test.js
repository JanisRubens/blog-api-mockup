process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../../../server/models/userModel');
const { JWT_SECRET }    = require('../../../config')
const jwt               = require('jsonwebtoken')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../index');
let should = chai.should();

chai.use(chaiHttp);

/*
@THINKER: Security issue, have to double check the scope, once user gets created.
          Otherwise it can be set in POST req, and it will work.
*/


describe('Auth login Endpoint', () => {
    //once mongo sandbox is configured for test, remove the comment lines
    const email = "jhon.cena@power.com"
    const password = "password1"
    beforeEach((done) => { 
        User.findOneAndRemove({email: email},(err) => { 
           done();         
        });     
    });

    describe('/POST /auth/login', () => {
        it('it should POST unexisting user details and return 401', (done) => {
        chai.request(app)
                .post('/auth/login/')
                .send({email: "fake@email.com", password: "password"})
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('err').eql('User does not exist');
                    res.body.should.have.property('status').eql(401);
                    res.body.should.have.property('user').eql(null);
                done();
            });
        });
        it('it should POST basic user details and return token and user information', (done) => {
            let user = new User({
                            firstName: "Jhon",
                            lastName: "Cena",
                            email: email,
                            password: password,
                            posts: [],
                            comments: []
                        });
            user.save((err, user) => {
                chai.request(app)
                    .post('/auth/login/')
                    .send({email: email, password: password})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('err').eql(null);
                        res.body.should.have.property('message');
                        res.body.should.have.property('token').eql(jwt.sign({id: user._id, scope: user.scope }, JWT_SECRET));
                        res.body.should.have.property('user')
                        res.body.user.should.have.property('id').eql(user._id.toString())
                        res.body.user.should.have.property('firstName').eql(user.firstName)
                        res.body.user.should.have.property('lastName').eql(user.lastName)
                        res.body.user.should.have.property('email').eql(user.email)
                    done();
                });
            });
        });
        it('it should GET 404', (done) => {
            done()
        });
    });
});

