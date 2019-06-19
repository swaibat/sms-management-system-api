import express from 'express';
import usersRoute from './api/routes/users';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use('/api/v1/users', usersRoute);


// if the page is not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: error.status || 500, message: error.message  });
  next();
});

app.listen(PORT,()=>console.log(`listening on port ${PORT}...`))