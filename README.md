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

## Requirements
* Accepts URL for video
* Download video
* Runs FFMPEG as a console application to extract thumbnail
* Reload page with thumbnail

## References
* https://stackoverflow.com/questions/16316330/how-to-write-file-if-parent-folder-doesnt-exist
* https://superuser.com/questions/538112/meaningful-thumbnails-for-a-video-using-ffmpeg
* https://www.ffmpeg.org/documentation.html
