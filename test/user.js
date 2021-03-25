//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../start');
console.log('index', index);

let should = chai.should();

// const User = require('../app/model/user');
// const userRoute = require('../app/route/user');


chai.use(chaiHttp);
//Our parent block
describe('users', (fff) => {
    console.log('fff', fff)
    beforeEach((done) => { //Before each test we empty the database
        User.bulkWrite({}, (err) => {
           done();
        });
    });
    describe('/POST sign-up', (ddd) => {
        console.log('dddd', ddd);
        it('it should not POST a user without some fields', (done) => {
            let user = {
                "first_name": "I didn't svvee",
                "last_name": "I didnt't saw",
                "email": "idseeisaw@vvail.com",
                "phone_number": "08138242853",
                "password": "password"
            }
              chai.request(index)
              .post('/sign-up')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('first_name');
                    res.body.errors.should.have.property('last_name');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                done();
              });
        });
        it('it should POST a user ', (done) => {
            let user = {
                "first_name": "I didn't svvee",
                "last_name": "I didnt't saw",
                "email": "idseeisaw@vvail.com",
                "phone_number": "08138242853",
                "password": "password"
            }
              chai.request(index)
              .post('/user')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('user successfully added!');
                    res.body.user.should.have.property('first_name');
                    res.body.user.should.have.property('last_name');
                    res.body.user.should.have.property('email');
                    res.body.user.should.have.property('phone_number');
                    res.body.user.should.have.property('password');
                done();
              });
        });
    });
   /*
//  /*
//   * Test the /GET/:id route
//   */
//  describe('/GET/:id user', () => {
//     it('it should GET a user by the given id', (done) => {
//         let user = new user({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
//         user.save((err, user) => {
//             chai.request(server)
//           .get(`/user/${user.id}`)
//           .send(user)
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('title');
//                 res.body.should.have.property('author');
//                 res.body.should.have.property('pages');
//                 res.body.should.have.property('year');
//                 res.body.should.have.property('_id').eql(user.id);
//             done();
//           });
//         });

//     });
// });

});