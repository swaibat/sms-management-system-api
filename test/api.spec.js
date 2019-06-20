/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
import express from 'express';
import request from 'supertest';
// eslint-disable-next-line no-unused-vars
import should from 'should';
import userRoutes from '../api/routes/users';
import productRoutes from '../api/routes/products';
import { testdata, testlength } from '../api/data/data';

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

describe('Test Signup route', () => {
  it('check requires feilds', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        email: 'om',
      })
      .set('Accept', 'application/json')
      .expect({
        message: '"firstName" is required',
      })
      .expect(400, done);
  });
  it('check input length', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testlength)
      .set('Accept', 'application/json')
      .expect({
        message: '"firstName" length must be at least 3 characters long',
      })
      .expect(400, done);
  });

  it('check if user is posted', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata)
      .set('Accept', 'application/json')
      .expect(201, done);
  });

  it('chek if user exists', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata)
      .set('Accept', 'application/json')
      .expect(409, done);
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
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('You have signed in successfully');
        done();
      });
  });

  it('check for wrong details', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'b@gmail.com',
        password: 'anderson',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('wrong username or password');
        done();
      });
  });
});

describe('Test product create', () => {
  it('checks for required feilds', (done) => {
    request(app)
      .post('/api/v1/products')
      .send({
        price: 200,
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('"state" is required');
        done();
      });
  });

  it('check input length', (done) => {
    request(app)
      .post('/api/v1/products')
      .send({
        price: 200,
        city: 'b',
        state: 'testme@gmail.com',
        address: ' bbp',
        type: '3 bedrooms',
        imageUrl: 'images/hose1.jpg',
        status: 'available',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('"city" length must be at least 2 characters long');
        done();
      });
  });

  it('check if post is created', (done) => {
    request(app)
      .post('/api/v1/products')
      .send({
        price: 200,
        city: 'kla',
        state: 'kasnje',
        address: 'bbp',
        type: '3 bedrooms',
        imageUrl: 'images/hose1.jpg',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });
});