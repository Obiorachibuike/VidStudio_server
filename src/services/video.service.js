import fs from 'fs';
import prisma from '../config/db.js';
import cloudinary from '../config/cloudinary.js';
import { compressVideo } from '../utils/ffmpeg.js';

export const uploadVideoService = async (file) => {
  const uploadDir = 'uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const compressedPath = `uploads/compressed-${file.filename}`;

  try {
    await compressVideo(file.path, compressedPath);
  } catch (error) {
    fs.unlinkSync(file.path);
    throw new Error('Compression failed');
  }

  const result = await cloudinary.uploader.upload(compressedPath, {
    resource_type: 'video',
    folder: 'videos'
  });

  fs.unlinkSync(file.path);
  fs.unlinkSync(compressedPath);

  const metadata = {
    filename: file.originalname,
    url: result.secure_url,
    size: file.size,
    duration: 0 // Optional: You could use a helper function to extract this
  };

  const savedVideo = await prisma.video.create({ data: metadata });
  return savedVideo;
};




// Trim video



export const processTrim = (videoUrl, start, end) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoUrl)
      .setStartTime(start)
      .setDuration(end - start)
      .output(`${outputDir}/trimmed_video.mp4`)
      .on('end', () => resolve(`${outputDir}/trimmed_video.mp4`))
      .on('error', reject)
      .run();
  });
};

export const addSubtitlesToVideo = (videoUrl, text, startTime, endTime) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoUrl)
      .outputOptions([`-vf "subtitles='${text}:force_style='FontSize=24,PrimaryColour=&HFFFFFF&'"`])
      .output(`${outputDir}/video_with_subtitles.mp4`)
      .on('end', () => resolve(`${outputDir}/video_with_subtitles.mp4`))
      .on('error', reject)
      .run();
  });
};

export const renderFinalVideo = (videoUrl) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoUrl)
      .output(`${outputDir}/final_rendered_video.mp4`)
      .on('end', () => resolve(`${outputDir}/final_rendered_video.mp4`))
      .on('error', reject)
      .run();
  });
};