import { exec } from 'child_process';
import http from 'http';
import fs from 'fs';
import uuidv4 from 'uuid/v4';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const OUTPUT_DIRECTORY = "videos"

// https://stackoverflow.com/questions/13542667/create-directory-when-writing-to-file-in-node-js
const mkdirp = (filepath) => {
    var dirname = path.dirname(filepath);
    if (!fs.existsSync(dirname)) {
        mkdirp(dirname);
    }
    fs.mkdirSync(filepath);
}

const getVideo = (url, res) => {
  // Create uuid to uniquely identify movie
  const uuid = uuidv4();

  // Creating paths and file types
  const type = url.split('.').pop().split(/\#|\?/)[0];
  const resolvePath = path.resolve(appDirectory, OUTPUT_DIRECTORY);
  const videoPath = `${resolvePath}/${uuid}/`;
  const video = `${videoPath}${uuid}.${type}`;
  mkdirp(videoPath);

  let new_res = null;

  // Open stream for writing
  let file = fs.createWriteStream(`${video}`);
  console.log(`Writing to: ${video}`);

  // ffmpeg console commands
  let request = http.get(url, (response) => {
    const stream = response.pipe(file);
    let dog = stream.on('finish', () => {
      // ffmpeg console command adapted from: https://superuser.com/questions/538112/meaningful-thumbnails-for-a-video-using-ffmpeg
      exec(`ffmpeg -i ${video} -vf "select='gt(scene\,0.4)'" -frames:v 5 -vsync vfr ${videoPath}/thumb%02d.jpg`, (err, stdout, stderr) => {
        console.log("Creating thumbnails")
      if (err) {
        console.log("Error");
        console.log(`stderr: ${stderr}`);
        res.send(err);
      } else {
        // send uuid if successful
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.send(uuid);
        }
      });
    console.log(new_res);
    });
  });

  // console.log(request);
  return
};

const test = (url, res) => {
  url = "http://mcs-dev.testing.s3.amazonaws.com/sample_videos/despicableme-tlr1_h1080p_5seconds.MP4";
  let response = getVideo(url, res);
  console.log("RESPONSE: " + response);
  return response;
};

export default test;