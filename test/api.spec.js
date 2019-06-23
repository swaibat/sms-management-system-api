/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import request from 'supertest';
import should from 'should';
import { testdata, testlength } from '../api/data/data';
import app from '../index';


describe('Test Signup route', () => {
  it('check requires feilds', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({ email: 'om' })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('"firstName" is required');
        done();
      });
  });
  it('check input length', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testlength)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('"firstName" length must be at least 3 characters long');
        done();
      });
  });

  it('check if user is posted', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata)
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });

  it('chek if user exists', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('You have signed in successfully');
        done();
      });
  });
});

describe('User Signin', () => {
  it('check if user data exists', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'testme@gmail.com',
        password: 'kanyanyama01',
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('You have signed in successfully');
        done();
      });
  });

  it('check for wrong email', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'testss@gmail.com',
        password: 'kanyanyama01',
      })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('wrong username or password');
        done();
      });
  });

  it('check for wrong Password', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'testme@gmail.com',
        password: 'kanyanyama01s',
      })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('wrong username or password');
        done();
      });
  });
});

describe('Testproduct create', () => {
  it('checks for required feilds', (done) => {
    request(app)
      .post('/api/v1/property')
      .send({
        price: 200,
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('"state" is required');
        done();
      });
  });

  it('check input length', (done) => {
    request(app)
      .post('/api/v1/property')
      .send({
        price: 200,
        city: 'b',
        state: 'testme@gmail.com',
        address: ' bbp',
        type: '3 bedrooms',
        imageUrl: 'images/hose1.jpg',
        status: 'available',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('"city" length must be at least 2 characters long');
        done();
      });
  });

  it('check if post is created', (done) => {
    request(app)
      .post('/api/v1/property')
      .send({
        price: 200,
        city: 'kla',
        state: 'kasnje',
        address: 'bbp',
        type: '3 bedrooms',
        imageUrl: 'images/hose1.jpg',
      })
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });
});

describe('Test property update', () => {
  it('checks for updated product', (done) => {
    request(app)
      .put('/api/v1/property/1')
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
});

describe('Test patch method', () => {
  it('mark property sold', (done) => {
    request(app)
      .patch('/api/v1/property/1/sold')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('status', 'sold');
        done();
      });
  });
  it('view all property', (done) => {
    request(app)
      .get('/api/v1/property')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        done();
      });
  });
  it('check if propert exists', (done) => {
    request(app)
      .get('/api/v1/property/12')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('property with given id not Found');
        done();
      });
  });
  it('view specific property', (done) => {
    request(app)
      .get('/api/v1/property/1')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        done();
      });
  });
  it('view specific property', (done) => {
    request(app)
      .get('/api/v1/property/1?type=3bedrooms')
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
  it('deletes property', (done) => {
    request(app)
      .delete('/api/v1/property/1')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        res.body.message.should.equal('property deleted successfully');
        done();
      });
  });
});
