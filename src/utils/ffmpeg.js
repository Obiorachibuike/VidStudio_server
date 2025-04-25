import ffmpeg from 'fluent-ffmpeg';

import fs from 'fs';

const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

export const compressVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
      .outputOptions('-vcodec libx264', '-crf 28')
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .save(outputPath);
    });
};
