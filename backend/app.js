const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./src/routes/router');
const limiter = require('./src/middlewares/rateLimiter');
const errorHandler = require('./src/middlewares/errorHandler');
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

const { requestLogger, errorLogger } = require('./src/middlewares/logger');

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
}));
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use(routes);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
