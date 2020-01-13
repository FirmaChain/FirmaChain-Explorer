import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import expressRequestId from 'express-request-id';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import route from './route';
import logger, { stream } from './logger';


const ENV = process.env.NODE_ENV;

const sendError = (err, req, res) => {
  logger.error(err.stack);
  const code = err.status || 500;
  let { message } = err;
  if (code >= 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal Server Error'; // hide error message on production
  }

  res.status(code).send(message);
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return sendError(err, req, res);
};

// SSE stands for Server Sent Event
const sseMiddleware = (req, res, next) => {
  res.sseSetup = () => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
  };

  res.sseSend = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.flush();
  };

  next();
};

export default () => {
  const app = express();

  app.use(expressRequestId());
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(sseMiddleware);
  app.use(morgan('tiny', { stream }));

  app.use('/api', route);
  app.use('/', express.static('build'));
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
  app.use(errorHandler);
  return app;
};
