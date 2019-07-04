/* eslint-disable linebreak-style */
import express from 'express';
import userRoutes from './api/routes/users';
import propertyRoutes from './api/routes/property';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);

// if the page is not found
app.use((req, res, next) => {
  const error = new Error('Resource your looking for notfound');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: error.status || 500, message: error.message });
  next();
});

// eslint-disable-next-line no-console
app.listen(PORT);

export default app;