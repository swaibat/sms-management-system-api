import express from 'express';
import request from 'supertest';
import should from 'should';
import { testdata } from '../api/data/data';
import userRoutes from '../api/routes/users';
import propertyRoutes from '../api/routes/property';

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);

let token = '';
let userToken = '';
describe('Test Authentication routes', () => {
  it('check if user is posted', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata)
      .end((err, res) => {
        res.status.should.equal(201);
        const result = JSON.parse(res.text);
        userToken = result.user.token;
        done();
      });
  });
  it('chek if user exists', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('user already exists');
        done();
      });
  });

  it('tests user signin', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'admin@gmail.com',
        password: 'admin123',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        const result = JSON.parse(res.text);
        token = result.user.token;
        done();
      });
  });
  it('tests user signin wrong details', (done) => {
    request(app)
      .post('/api/v1/users/auth/signin')
      .send({
        email: 'admn@gmail.com',
        password: 'admin123',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('wrong username or password');
        done();
      });
  });
});
describe('property routes', () => {
  it('check if post is created', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({
        price: 200,
        city: 'kampla',
        state: 'central',
        address: 'wakiso',
        type: '3bedrooms',
        imageUrl: 'images/hose1.jpg',
      })
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });
  it('checks for updated product', (done) => {
    request(app)
      .put('/api/v1/property/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 200,
        city: 'kampla',
        state: 'central',
        address: 'wakiso',
        type: '3bedrooms',
        imageUrl: 'images/hose1.jpg',
      })
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
  it('mark property sold', (done) => {
    request(app)
      .patch('/api/v1/property/1/sold')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('status', 'sold');
        done();
      });
  });
  it('view all property', (done) => {
    request(app)
      .get('/api/v1/property')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        done();
      });
  });
  it('check if propert exists', (done) => {
    request(app)
      .get('/api/v1/property/12')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('property with given id not Found');
        done();
      });
  });
  it('view specific property', (done) => {
    request(app)
      .get('/api/v1/property/1')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        done();
      });
  });
  it('view specific property', (done) => {
    request(app)
      .get('/api/v1/property/1?type=3bedrooms')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
  it('deletes property', (done) => {
    request(app)
      .delete('/api/v1/property/1')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        res.body.message.should.equal('property deleted successfully');
        done();
      });
  });
  it('operation by none owner', (done) => {
    request(app)
      .patch('/api/v1/property/2/sold')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('Your do not own this property');
        done();
      });
  });
});

describe('Not agent access', () => {
  it('check if post is created', (done) => {
    request(app)
      .patch('/api/v1/property/1/sold')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}1`)
      .end((err, res) => {
        res.status.should.equal(403);
        done();
      });
  });
  it('check if post is created', (done) => {
    request(app)
      .patch('/api/v1/property/1/sold')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('provide a token to get our services');
        done();
      });
  });
  it('check if post is created', (done) => {
    request(app)
      .patch('/api/v1/property/1/sold')
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('Only agent can access this service');
        done();
      });
  });
});

describe('test validation and required fields', () => {
  it('chek signup required fields', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        address: 'kampala',
        phoneNumber: '+256758307272',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('All field are  required');
        done();
      });
  });
  it('check string fields', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        address: 'kampala',
        phoneNumber: '+256758307272',
        password: 5,
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('fields  should be in string fomat');
        done();
      });
  });
  it('check if user exists', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName: 'admin',
        lastName: 'ad min',
        email: 'admin@gmail.com',
        address: 'kampala',
        phoneNumber: '+256758307272',
        password: '+256758307272',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('all names should contain only aphabets minimum 3 characters');
        done();
      });
  });

  it('validate email address', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admingmail.com',
        address: 'kampala',
        phoneNumber: '256758307272',
        password: '256758307272',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Please provide a valid email address');
        done();
      });
  });

  it('validate phone number', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        address: 'kampala',
        phoneNumber: 'hs hs',
        password: '256758307272',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('phone number should be numeric with length of 10 to 13');
        done();
      });
  });

  it('check all required fields', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({
        price: 200,
        state: 'central',
        address: 'wakiso',
        type: '3bedrooms',
        imageUrl: 'images/hose1.jpg',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('All fields are  required');
        done();
      });
  });

  it('validate special characters in the fields', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({
        price: 200,
        city: 'kam pla',
        state: 'central',
        address: 'wakiso',
        type: '3bedrooms',
        imageUrl: 'images/hose1.jpg',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Make your fields Strings with no special characters & min 3');
        done();
      });
  });
  it('test image suported fomat and type', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({
        price: 200,
        city: 'kampla',
        state: 'central',
        address: 'wakiso',
        type: '3bedrooms',
        imageUrl: 'images/hose1.mp4',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('provide a supported image format like .jpg .jpeg .png .gif .webp');
        done();
      });
  });
  it('test string input fields', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({
        price: 200,
        city: 'kampla',
        state: 200,
        address: 'wakiso',
        type: '3bedrooms',
        imageUrl: 'images/hose1.jpg',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Address, City, State, Type, ImageUrl should be a string');
        done();
      });
  });
  it('test whether price is a number', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({
        price: 'kampla',
        city: 'kampla',
        state: 'kampla',
        address: 'wakiso',
        type: '3bedrooms',
        imageUrl: 'images/hose1.jpg',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('price should be a number');
        done();
      });
  });
});
