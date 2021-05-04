import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import moment from 'moment-timezone';
// import cookieParser from 'cookie-parser');
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';
import { getCurrentDateTimeLocal } from './utils/datetime.js';
import errorHandler from './middleware/error.js';
import connectDB from './config/db.js';

// ES Modules don't have __dirname
const __dirname = path.resolve();

// Load env vars
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '/config/config.test.env' });
} else {
  dotenv.config({
    path: path.resolve(__dirname, './backend/config/config.env')
  });
}

// Connect to database
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Route files
// const bootcamps = require('./routes/bootcamps');
// const courses = require('./routes/courses');
// const auth = require('./routes/auth');
// const users = require('./routes/users');
// const reviews = require('./routes/reviews');

// Body parser
app.use(express.json({ limit: '5mb' }));

// Cookie parser
// app.use(cookieParser());

app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format('MM-DD-YYYY HH:mm:ss a');
  });
  morgan.format(
    'myformat',
    '\n:date[America/New_York] - Method=:method - URL=:url - Status=:status - ContentLength=:res[content-length] - ResponseTime=:response-time ms - UserAgent=:user-agent'
  );

  app.use(morgan('myformat'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
// app.use('/api/v1/bootcamps', bootcamps);
// app.use('/api/v1/courses', courses);
// app.use('/api/v1/auth', auth);
// app.use('/api/v1/users', users);
// app.use('/api/v1/reviews', reviews);

// Set up error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV
    } mode on port ${PORT}. Current Date/Time: ${getCurrentDateTimeLocal()}`
      .yellow.bold
  );
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});

export default app;
