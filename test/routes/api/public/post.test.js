process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Post = require('../../../../server/models/postModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../../index');
let should = chai.should();

chai.use(chaiHttp);


/*

@THINKER: Should i move all env related includes in single file? Might have conflicts with single file tests
@THINKER: Think of a nice way how to test, the public and private routes with seperated files,
          Options: Do all in one file( results in huge ass file)
                   Investigate a sequence script for mocha tests
                   Use perfect mathes only on private routes
                   ...

*/

describe('Public accessable Post Endpoint', () => {
    // once mongo sandbox is configured for test, remove the comment lines
    // beforeEach((done) => { 
    //     Post.remove({}, (err) => { 
    //        done();         
    //     });     
    // });

    describe('/GET /api/public/post', () => {
        it('it should GET all the posts', (done) => {
        chai.request(app)
                .get('/api/public/post/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.posts.should.be.a('array')
                    res.body.message.should.be.a('string')
                    res.body.posts.length.should.be.eql(9);
                done();
            });
        });
        it('it should GET 404', (done) => {
            done()
        });
    });
    describe('/GET/:postID /api/public/post/postID', () => {
        it('it should GET single post', (done) => {
            done()
        });
        it('it should GET 404', (done) => {
            done()
        });
    });
});

