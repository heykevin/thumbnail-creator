import express from "express";
import test from "./ffmpeg.js";

const app = express();
const gqlApp = express();

app.use(express.static('videos'));

app.get("/", function(req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
  test("dfasdf", res);
});

app.listen(
  5000,
  () => console.log(`Listening on localhost:5000`)
);