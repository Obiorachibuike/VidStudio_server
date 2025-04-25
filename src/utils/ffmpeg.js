import ffmpeg from 'fluent-ffmpeg';

import fs from 'fs';

const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}


// export const compressVideo = (inputPath, outputPath) => {
//   return new Promise((resolve, reject) => {
//       ffmpeg(inputPath)
//       .outputOptions('-vcodec libx264', '-crf 28')
//       .on('end', () => resolve(outputPath))
//       .on('error', reject)
//       .save(outputPath);
//     });
// };


// // Trim video



// export const trimVideo = (videoUrl, start, end) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg(videoUrl)
//       .setStartTime(start)
//       .setDuration(end - start)
//       .output(`${outputDir}/trimmed_video.mp4`)
//       .on('end', () => resolve(`${outputDir}/trimmed_video.mp4`))
//       .on('error', reject)
//       .run();
//   });
// };

// export const addSubtitles = (videoUrl, text, startTime, endTime) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg(videoUrl)
//       .outputOptions([`-vf "subtitles='${text}:force_style='FontSize=24,PrimaryColour=&HFFFFFF&'"`])
//       .output(`${outputDir}/video_with_subtitles.mp4`)
//       .on('end', () => resolve(`${outputDir}/video_with_subtitles.mp4`))
//       .on('error', reject)
//       .run();
//   });
// };

// export const renderVideo = (videoUrl) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg(videoUrl)
//       .output(`${outputDir}/final_rendered_video.mp4`)
//       .on('end', () => resolve(`${outputDir}/final_rendered_video.mp4`))
//       .on('error', reject)
//       .run();
//   });
// };
