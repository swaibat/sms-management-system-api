import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { testdata, testAds } from '../apiV2/data/data';
import userRoutes from '../apiV2/routes/auth';
import propertyRoutes from '../apiV2/routes/property';
import client from '../apiV2/services/db';


const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);
const should = chai.should();
let agentToken = '';
let userToken = '';
let agentTwo =''

chai.use(chaiHttp);

describe('/POST/signup routes', () => {
  it('CREATES a new User', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(201);
        userToken = res.body.data.token;
        done();
      });
  });
  it('CREATES a new Agent', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[5])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(201);
        agentToken = res.body.data.token;
        done();
      });
  });
  it('CREATES a new Agent two', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[11])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(201);
        agentTwo = res.body.data.token;
        done();
      });
  });
  it('CHECKS if User already Exists', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[5])
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(409);
        done();
      });
  });
});

describe('/POST/signin routes', () => {
  it('ENABLE User login', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signin')
      .send(testdata[5])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        res.body.should.have.property('message').eql('signed in successfully');
        done();
      });
  });
  it('CHECK if User provided details are wrong', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signin')
      .send(testdata[4])
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message').eql('user doesnt exist please signup');
        done();
      });
  });
  it('CHECK if User doesnt Exists', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signin')
      .send(testdata[101])
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        // res.body.should.have.property('message').eql('user doesnt exist please signup');
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
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('price');
        res.body.data.should.have.property('city');
        res.body.should.have.property('status').eql(201);
        done();
      });
  });
  it('CREATES a new Property validation', (done) => {
    chai.request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testAds[9])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
  it('CHECK if property exists', (done) => {
    chai.request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testAds[0])
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You can not post this propety again');
        done();
      });
  });
  it('UPDATE a Property', (done) => {
    chai.request(app)
      .patch('/api/v1/property/1')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testAds[2])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('address');
        res.body.data.should.have.property('city');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('PATCH a Property', (done) => {
    chai.request(app)
      .patch('/api/v1/property/1/sold')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testAds[2])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('status').eql('sold');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('GET a specific Property', (done) => {
    chai.request(app)
      .get('/api/v1/property/1')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('CHECK agent ownership', (done) => {
    chai.request(app)
      .patch('/api/v1/property/1/sold')
      .set('Authorization', `Bearer ${agentTwo}`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
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
        res.body.data.should.be.a('array');
        res.body.should.have.property('status').eql(200);
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
        done();
      });
  });
  
  it('GET NOTFOUND Property', (done) => {
    chai.request(app)
      .get('/api/v1/property/9')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('QUERY PARAMS validate id', (done) => {
    chai.request(app)
      .get('/api/v1/property/9-')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('provide a valid number in parameters');
        done();
      });
  });
  it('check user is agent', (done) => {
    chai.request(app)
      .patch('/api/v1/property/1/sold')
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
        res.body.should.have.property('message').eql('isAgent should be a boolean');
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
        res.body.should.have.property('message').eql('address field  is invalid ');
        done();
      });
  });
  it('view specific Invalid property', (done) => {
    chai.request(app)
      .get('/api/v1/property?type=bedrooms')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('We only have these types 1bedrooms, 3bedrooms, 5bedrooms, miniFlat ,others');
        done();
      });
  });
  it('view specific property Not found', (done) => {
    chai.request(app)
      .get('/api/v1/property?type=1bedrooms')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error').eql('Ooop not found');
        done();
      });
  });
  it('DELETE a Property', (done) => {
    chai.request(app)
      .delete('/api/v1/property/1')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('property deleted successfully');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  after(function() {
    client.query('DROP TABLE IF EXISTS users');
    client.query('DROP TABLE IF EXISTS property');
  });
});
