// import { Controller, Get, Res, StreamableFile, Header } from '@nestjs/common';
// import * as ffmpeg from 'fluent-ffmpeg';
// import { createReadStream, mkdirSync, existsSync } from 'fs';
// import { resolve } from 'path';

// @Controller('stream')
// export class StreamController {
//     @Get()
//     async getStream(@Res() res) {
//         const pathToStream = resolve('streams', 'stream.m3u8');

//         // check if the directory exists
//         if (!existsSync('streams')) {
//             // if not, create it
//             mkdirSync('streams', { recursive: true });
//         }
        
//         ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe');
        
//         ffmpeg('rtsp://admin:harmony1234@169.254.166.200:554/streaming/channels/101/')
//             .outputOptions('-f hls')
//             .outputOptions('-hls_time 10')
//             .outputOptions('-hls_list_size 10')
//             .output(pathToStream)
//             .on('end', () => {
//                 console.log('Stream ended');
//             })
//             .run();

//         res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
//         const file = createReadStream(pathToStream);
//         const streamFile = new StreamableFile(file);
//         return streamFile.getStream();
//     }
// }
