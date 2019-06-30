import express from 'express'
import chai from 'chai';
import chaiHttp from 'chai-http';
import { testdata } from '../api/data/data';
import userRoutes from '../api/routes/users';
import propertyRoutes from '../api/routes/property';

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);
let should = chai.should();

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
        res.body.user.should.have.property('firstName').eql('arora');
        res.body.should.have.property('status').eql(201);
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
  it('VALIDATES user input fields', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[1])
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql(409);
        res.body.should.have.property('message').eql('user already exists');
        done();
      });
  });
});

//   describe('/POST book', () => {
//       it('it should not POST a book without pages field', (done) => {
//           let book = {
//               title: "The Lord of the Rings",
//               author: "J.R.R. Tolkien",
//               year: 1954
//           }
//             chai.request(server)
//             .post('/book')
//             .send(book)
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('errors');
//                   res.body.errors.should.have.property('pages');
//                   res.body.errors.pages.should.have.property('kind').eql('required');
//               done();
//             });
//       });
//       it('it should POST a book ', (done) => {
//           let book = {
//               title: "The Lord of the Rings",
//               author: "J.R.R. Tolkien",
//               year: 1954,
//               pages: 1170
//           }
//             chai.request(server)
//             .post('/book')
//             .send(book)
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('message').eql('Book successfully added!');
//                   res.body.book.should.have.property('title');
//                   res.body.book.should.have.property('author');
//                   res.body.book.should.have.property('pages');
//                   res.body.book.should.have.property('year');
//               done();
//             });
//       });
//   });
//   describe('/GET/:id book', () => {
//       it('it should GET a book by the given id', (done) => {
//           let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
//           book.save((err, book) => {
//               chai.request(server)
//             .get('/book/' + book.id)
//             .send(book)
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('title');
//                   res.body.should.have.property('author');
//                   res.body.should.have.property('pages');
//                   res.body.should.have.property('year');
//                   res.body.should.have.property('_id').eql(book.id);
//               done();
//             });
//           });

//       });
//   });
//   describe('/PUT/:id book', () => {
//       it('it should UPDATE a book given the id', (done) => {
//           let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
//           book.save((err, book) => {
//                 chai.request(server)
//                 .put('/book/' + book.id)
//                 .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
//                 .end((err, res) => {
//                       res.should.have.status(200);
//                       res.body.should.be.a('object');
//                       res.body.should.have.property('message').eql('Book updated!');
//                       res.body.book.should.have.property('year').eql(1950);
//                   done();
//                 });
//           });
//       });
//   });
//  /*
//   * Test the /DELETE/:id route
//   */
//   describe('/DELETE/:id book', () => {
//       it('it should DELETE a book given the id', (done) => {
//           let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
//           book.save((err, book) => {
//                 chai.request(server)
//                 .delete('/book/' + book.id)
//                 .end((err, res) => {
//                       res.should.have.status(200);
//                       res.body.should.be.a('object');
//                       res.body.should.have.property('message').eql('Book successfully deleted!');
//                       res.body.result.should.have.property('ok').eql(1);
//                       res.body.result.should.have.property('n').eql(1);
//                   done();
//                 });
//           });
//       });
//   });
// });





























// import express from 'express';
// import request from 'supertest';
// import should from 'should';
// import { testdata } from '../api/data/data';
// import userRoutes from '../api/routes/users';
// import propertyRoutes from '../api/routes/property';

// const app = express();
// app.use(express.json());

// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/property', propertyRoutes);

// let token = '';
// let userToken = '';
// describe('Test Authentication routes', () => {
//   it('check if user is posted', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signup')
//       .send(testdata)
//       .end((err, res) => {
//         res.status.should.equal(201);
//         const result = JSON.parse(res.text);
//         userToken = result.user.token;
//         done();
//       });
//   });
//   it('chek if user exists', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signup')
//       .send(testdata)
//       .end((err, res) => {
//         res.status.should.equal(409);
//         res.body.message.should.equal('user already exists');
//         done();
//       });
//   });

//   it('tests user signin', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signin')
//       .send({
//         email: 'admin@gmail.com',
//         password: 'admin123',
//       })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(200);
//         const result = JSON.parse(res.text);
//         token = result.user.token;
//         done();
//       });
//   });
//   it('tests user signin wrong details', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signin')
//       .send({
//         email: 'admn@gmail.com',
//         password: 'admin123',
//       })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(401);
//         res.body.message.should.equal('wrong username or password');
//         done();
//       });
//   });
// });
// describe('property routes', () => {
//   it('check if post is created', (done) => {
//     request(app)
//       .post('/api/v1/property')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'application/json')
//       .send({
//         price: 200,
//         city: 'kampla',
//         state: 'central',
//         address: 'wakiso',
//         type: '3bedrooms',
//         imageUrl: 'images/hose1.jpg',
//       })
//       .end((err, res) => {
//         res.status.should.equal(201);
//         done();
//       });
//   });
//   // it('checks for updated property', (done) => {
//   //   request(app)
//   //     .patch('/api/v1/property/1')
//   //     .set('Authorization', `Bearer ${token}`)
//   //       address = 'wakiso'
//   //       city = 'kampla'
//   //     .end((err, res) => {
//   //       res.status.should.equal(200);
//   //       done();
//   //     });
//   // });
//   it('mark property sold', (done) => {
//     request(app)
//       .patch('/api/v1/property/1/sold')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         res.status.should.equal(200);
//         done();
//       });
//   });
//   it('view all property', (done) => {
//     request(app)
//       .get('/api/v1/property')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.status.should.equal(200);
//         done();
//       });
//   });
//   it('check if propert exists', (done) => {
//     request(app)
//       .get('/api/v1/property/12')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         res.status.should.equal(404);
//         res.body.message.should.equal('property with given id not Found');
//         done();
//       });
//   });
//   it('view specific property', (done) => {
//     request(app)
//       .get('/api/v1/property/1')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.status.should.equal('success');
//         done();
//       });
//   });
//   it('view specific property', (done) => {
//     request(app)
//       .get('/api/v1/property/1?type=3bedrooms')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         res.status.should.equal(200);
//         done();
//       });
//   });
//   it('deletes property', (done) => {
//     request(app)
//       .delete('/api/v1/property/1')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.status.should.equal('success');
//         res.body.message.should.equal('property deleted successfully');
//         done();
//       });
//   });
//   it('operation by none owner', (done) => {
//     request(app)
//       .patch('/api/v1/property/2/sold')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         res.status.should.equal(403);
//         res.body.message.should.equal('Your do not own this property');
//         done();
//       });
//   });
// });

// describe('Not agent access', () => {
//   it('check if post is created', (done) => {
//     request(app)
//       .patch('/api/v1/property/1/sold')
//       .set('Accept', 'application/json')
//       .set('Authorization', `Bearer ${token}1`)
//       .end((err, res) => {
//         res.status.should.equal(403);
//         done();
//       });
//   });
//   it('check if post is created', (done) => {
//     request(app)
//       .patch('/api/v1/property/1/sold')
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(403);
//         res.body.message.should.equal('provide a token to get our services');
//         done();
//       });
//   });
//   // it('check user is agent', (done) => {
//   //   request(app)
//   //     .patch('/api/v1/property/1/sold')
//   //     .set('Authorization', `Bearer ${userToken}`)
//   //     .set('Accept', 'application/json')
//   //     .end((err, res) => {
//   //       res.status.should.equal(403);
//   //       res.body.message.should.equal('Only agent can access this service');
//   //       done();
//   //     });
//   // });
// });

// describe('test validation and required fields', () => {
//   it('chek signup required fields', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signup')
//       .send({
//         firstName: 'admin',
//         lastName: 'admin',
//         email: 'admin@gmail.com',
//         address: 'kampala',
//         phoneNumber: '+256758307272',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('All fields are required');
//         done();
//       });
//   });
//   it('check string fields', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signup')
//       .send({
//         firstName: 'admin',
//         lastName: 'admin',
//         email: 'admin@gmail.com',
//         address: 'kampala',
//         phoneNumber: '+256758307272',
//         password: 5,
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('Your password is invalid make it a string');
//         done();
//       });
//   });
//   it('check if user exists', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signup')
//       .send({
//         firstName: 'admin',
//         lastName: 'ad min',
//         email: 'admin@gmail.com',
//         address: 'kampala',
//         phoneNumber: '+256758307272',
//         password: '+256758307272',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('Use valid characters with minimum of 3');
//         done();
//       });
//   });

//   it('validate email address', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signup')
//       .send({
//         firstName: 'admin',
//         lastName: 'admin',
//         email: 'admingmail.com',
//         address: 'kampala',
//         phoneNumber: '256758307272',
//         password: '256758307272',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('Please provide a valid email address');
//         done();
//       });
//   });

//   it('validate phone number', (done) => {
//     request(app)
//       .post('/api/v1/users/auth/signup')
//       .send({
//         firstName: 'admin',
//         lastName: 'admin',
//         email: 'admin@gmail.com',
//         address: 'kampala',
//         phoneNumber: 'hs hs',
//         password: '256758307272',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('phone number should be numeric with length of 10 to 13');
//         done();
//       });
//   });

//   it('check all required fields', (done) => {
//     request(app)
//       .post('/api/v1/property')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'application/json')
//       .send({
//         price: 200,
//         state: 'central',
//         address: 'wakiso',
//         type: '3bedrooms',
//         imageUrl: 'images/hose1.jpg',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('All fields are required');
//         done();
//       });
//   });

//   it('validate special characters in the fields', (done) => {
//     request(app)
//       .post('/api/v1/property')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'application/json')
//       .send({
//         price: 200,
//         city: 'kam pla',
//         state: 'central',
//         address: 'wakiso',
//         type: '3bedrooms',
//         imageUrl: 'images/hose1.jpg',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('Make your fields Strings with no special characters & min 3');
//         done();
//       });
//   });
//   it('test image suported fomat and type', (done) => {
//     request(app)
//       .post('/api/v1/property')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'application/json')
//       .send({
//         price: 200,
//         city: 'kampla',
//         state: 'central',
//         address: 'wakiso',
//         type: '3bedrooms',
//         imageUrl: 'images/hose1.mp4',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('provide a supported image format like .jpg .jpeg .png .gif .webp');
//         done();
//       });
//   });
//   it('test string input fields', (done) => {
//     request(app)
//       .post('/api/v1/property')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'application/json')
//       .send({
//         price: 200,
//         city: 'kampla',
//         state: 200,
//         address: 'wakiso',
//         type: '3bedrooms',
//         imageUrl: 'images/hose1.jpg',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('Your state is invalid make it a string');
//         done();
//       });
//   });
//   it('test whether price is a number', (done) => {
//     request(app)
//       .post('/api/v1/property')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'application/json')
//       .send({
//         price: 'kampla',
//         city: 'kampla',
//         state: 'kampla',
//         address: 'wakiso',
//         type: '3bedrooms',
//         imageUrl: 'images/hose1.jpg',
//       })
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.message.should.equal('price should be a number');
//         done();
//       });
//   });
// });
