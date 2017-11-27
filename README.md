# Thumbnail Creator 
## Installation
Requires NodeJS v8.2.0 or above
### Frontend
```bash
cd client
npm install
npm start
```
Client will start on localhost:3000

### Backend
```bash
cd service
npm install
npm start
```
Service will start on localhost:5000
Screenshots will be saved in /service/videos/ by default.

## Requirements
* Accepts URL for video
* Download video
* Runs FFMPEG as a console application to extract thumbnail
* Reload page with thumbnail

## References
* https://stackoverflow.com/questions/16316330/how-to-write-file-if-parent-folder-doesnt-exist
* https://superuser.com/questions/538112/meaningful-thumbnails-for-a-video-using-ffmpeg
* https://www.ffmpeg.org/documentation.html

## Videos used to test
* http://mcs-dev.testing.s3.amazonaws.com/sample_videos/despicableme-tlr1_h1080p_5seconds.MP4
* http://videos2.sendvid.com/fe/f9/bgmyb5g7.mp4
* http://videos2.sendvid.com/d7/5c/s0dbu7rv.mp4
