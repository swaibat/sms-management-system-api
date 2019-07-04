import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { testdata, testAds } from '../api/data/data';
// import { testdata, testAds } from '../api/models/users';
import userRoutes from '../api/routes/users';
import propertyRoutes from '../api/routes/property';

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);
const should = chai.should();
let agentToken = '';
let userToken = '';
let agentOne = '';

chai.use(chaiHttp);

describe('/POST/signup routes', () => {
  it('CREATES a new User', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('lastName');
        res.body.user.should.have.property('address');
        res.body.should.have.property('status').eql(201);
        userToken = res.body.user.token;
        done();
      });
  });
  it('CHECKS if User already Exists', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[0])
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql(409);
        res.body.should.have.property('message').eql('user already exists');
        done();
      });
  });
});

describe('/POST/signin routes', () => {
  it('ENABLE User login', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signin')
      .send(testdata[3])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('isAdmin');
        res.body.user.should.have.property('email');
        res.body.should.have.property('status').eql(200);
        agentToken = res.body.user.token;
        done();
      });
  });
  it('CHECK if User doesnt Exists', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signin')
      .send(testdata[4])
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('wrong username or password');
        done();
      });
  });
});

describe('ALL AGENT strict routes', () => {
  it('CREATES a new Property', (done) => {
    chai.request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testAds[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.property.should.be.a('object');
        res.body.property.should.have.property('price');
        res.body.property.should.have.property('city');
        res.body.should.have.property('status').eql(201);
        done();
      });
  });
  it('UPDATE a Property', (done) => {
    chai.request(app)
      .patch('/api/v1/property/15')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testAds[2])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.property.should.be.a('object');
        res.body.property.should.have.property('address').eql('nansana');
        res.body.property.should.have.property('city').eql('kampala');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('PATCH a Property', (done) => {
    chai.request(app)
      .patch('/api/v1/property/15/sold')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.property.should.be.a('object');
        res.body.property.should.have.property('status').eql('sold');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('GET a specific Property', (done) => {
    chai.request(app)
      .get('/api/v1/property/15')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.property.should.be.a('object');
        res.body.property.should.have.property('address');
        res.body.property.should.have.property('status');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('DELETE a Property', (done) => {
    chai.request(app)
      .delete('/api/v1/property/20')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('property deleted successfully');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('VIEW all Property', (done) => {
    chai.request(app)
      .get('/api/v1/property')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.property.should.be.a('array');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('view specific property', (done) => {
    chai.request(app)
          .get('/api/v1/property?type=3bedrooms')
          .set('Authorization', `Bearer ${agentToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
});
describe('/CHECK tokens and relevant middlewares', () => {
  it('CHECK if token is provided', (done) => {
    chai.request(app)
      .get('/api/v1/property')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('provide a token to get our services');
        done();
      });
  });
  it('CHECK for ivalid token', (done) => {
    chai.request(app)
      .get('/api/v1/property')
      .set('Authorization', `Bearer ${agentToken}1`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  // it('CHECK agent ownership', (done) => {
  //   chai.request(app)
  //     .patch('/api/v1/property/28/sold')
  //     .set('Authorization', `Bearer ${agentToken}`)
  //     .end((err, res) => {
  //       res.should.have.status(403);
  //       res.body.should.be.a('object');
  //       done();
  //     });
  // });
  it('GET NOTFOUND Property', (done) => {
    chai.request(app)
      .get('/api/v1/property/900')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('check user is agent', (done) => {
    chai.request(app)
      .patch('/api/v1/property/15/sold')
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('Only agent can access this service');
        done();
      });
  });
});

describe('/VALIDATES all input fields', () => {
  it('VALIDATES signup required fields', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[1])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql("\"firstName\" is required");
        done();
      });
  });
  it('VALIDATES property input', (done) => {
    chai.request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testAds[4])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
