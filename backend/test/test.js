const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

  describe('POST /api/users/login', () => {

    it('should return a 401 error when logging in with incorrect password', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send({ username: 'johndoe', password: 'wrongpassword' })
        .end((err, res) => {
          expect(res).to.have.status(401);
        //   expect(res.body).to.have.property('message').eq('Invalid username or password');
          done();
        });
    });

    it('should return a 401 error when logging in with incorrect username', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send({ username: 'invalidusername', password: 'password' })
        .end((err, res) => {
          expect(res).to.have.status(401);
        //   expect(res.body).to.have.property('message').eq('Invalid username or password');
          done();
        });
    });  
  });
