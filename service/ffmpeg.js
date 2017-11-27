import { exec } from 'child_process';
import http from 'http';
import fs from 'fs';
import uuidv4 from 'uuid/v4';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const OUTPUT_DIRECTORY = 'videos'

export default class ffmpeg {
  constructor(url, res) {
    this.url = url;
    this.res = res;

    this.createPath = this.createPath.bind(this);
    this.createThumbnails = this.createThumbnails.bind(this);
    this.getVideo = this.getVideo.bind(this);
    this.mkdirp = this.mkdirp.bind(this);

  }

  mkdirp(filepath) {
    var dirname = path.dirname(filepath);
    if (!fs.existsSync(dirname)) {
        this.mkdirp(dirname);
    }
    fs.mkdirSync(filepath);
  }

  createPath(url, uuid) {
    // Creating paths and file types
    const resolvePath = path.resolve(appDirectory, OUTPUT_DIRECTORY);
    const videoPath = `${resolvePath}/${uuid}/`;
    this.mkdirp(videoPath);

    return videoPath;
  }

  createThumbnails(command, uuid) {
    const res = this.res;
    exec(command, (err, stdout, stderr) => {
      console.log('Creating thumbnails', err)
    if (err) {
      console.log(`stderr: ${stderr}`);
      res.status(500).send(JSON.stringify({
        error: 'Something broke!'
      }));
    } else {
      // send uuid if successful
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        id: uuid
      }));
      }
    });
  }

  getVideo() {
    // Create uuid to uniquely identify movie
    const uuid = uuidv4();
    const videoPath = this.createPath(this.url, uuid);
    const type = this.url.split('.').pop().split(/\#|\?/)[0];
    const video = `${videoPath}${uuid}.${type}`;

    // Open stream for writing
    let file = fs.createWriteStream(`${video}`);
    console.log(`Writing to: ${video}`);
    //ffmpeg command - account for videos with same frame throughout
    const ffmpegCommand = 
      `ffmpeg -i ${video} -vf  "thumbnail" -frames:v 1 thumb%02d.jpg &&
      ffmpeg -i ${video} -vf "select='gt(scene\,0.4)+1'" -frames:v 5 -vsync vfr ${videoPath}/thumb%02d.jpg`;
    const res = this.res;

    // ffmpeg console command
    let request = http.get(this.url, (response) => {
      const type = response.headers['content-type']
      console.log(type)
      if (response.statusCode !== 200 || !type.match('video\/*')) {
        console.log('Failed at GET video');
        res.status(500).send(JSON.stringify({
          error: 'Link broke!'
        }));
        return;
      }

      const stream = response.pipe(file);
      stream.on('finish', () => {
        this.createThumbnails(ffmpegCommand, uuid);
      });
    });
  };

  getThumbnail(url, res) {
    return this.getVideo(url, res);
  }
}