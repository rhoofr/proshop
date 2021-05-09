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
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { getCurrentDateTimeLocal } from './utils/datetime.js';
// import errorHandler from './middleware/error.js';
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
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

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
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);

app.get('/api/v1/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Set up error handler
app.use(errorHandler);
app.use(notFound);

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
