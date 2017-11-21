import express from "express";
import bodyParser from 'body-parser';
import createThumbnail from "./ffmpeg.js";

const app = express();
const gqlApp = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('videos'));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
  createThumbnail(req.body.url, res);
});

app.listen(
  5000,
  () => console.log(`Listening on localhost:5000`)
);