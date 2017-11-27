import express from 'express';
import bodyParser from 'body-parser';
import ffmpeg from './ffmpeg.js';
import request from 'superagent';

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static('videos'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
  const ffmp = new ffmpeg(req.body.url, res)
  ffmp.getThumbnail();
});

app.listen(
  5000,
  () => console.log(`Listening on localhost:5000`)
);