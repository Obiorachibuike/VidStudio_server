import { uploadVideoService, processTrim, addSubtitlesToVideo, renderFinalVideo } from '../services/video.service.js';
import Video from '../config/db.js'; // Correct import of the Video model

// Upload Video
export const uploadVideo = async (req, res) => {
  try {
    const videoFile = req.file;
    const { originalname, size, duration } = videoFile;  // Renamed 'name' to 'originalname' for clarity
    
    // Upload video to Cloudinary
    const cloudinaryResponse = await uploadVideoService(videoFile);

    // Save metadata to DB using Prisma
    const video = await Video.create({
      data: {
        name: originalname,
        size,
        duration,
        cloudinaryUrl: cloudinaryResponse.url,
        status: 'Uploaded',
      },
    });

    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Video upload failed', error });
  }
};

// Trim Video
export const trimVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { start, end } = req.body;

    const video = await Video.findUnique({ where: { id: Number(id) } });
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const trimmedVideoPath = await processTrim(video.cloudinaryUrl, start, end);
    
    // Save the trimmed video path to DB
    video.status = 'Trimmed';
    video.trimmedVideoPath = trimmedVideoPath;
    await video.save();

    res.status(200).json({ message: 'Video trimmed successfully', trimmedVideoPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Trimming video failed', error });
  }
};

// Add Subtitles
export const addSubtitles = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, startTime, endTime } = req.body;

    const video = await Video.findUnique({ where: { id: Number(id) } });
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const videoWithSubtitles = await addSubtitlesToVideo(video.cloudinaryUrl, text, startTime, endTime);
    
    video.status = 'Subtitled';
    video.subtitlesVideoPath = videoWithSubtitles;
    await video.save();

    res.status(200).json({ message: 'Subtitles added successfully', videoWithSubtitles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Adding subtitles failed', error });
  }
};

// Render Video
export const renderVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findUnique({ where: { id: Number(id) } });
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const finalRenderedVideo = await renderFinalVideo(video.cloudinaryUrl);
    
    // Save the rendered video path to DB
    video.status = 'Rendered';
    video.renderedVideoPath = finalRenderedVideo;
    await video.save();

    res.status(200).json({ message: 'Video rendered successfully', finalRenderedVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Rendering video failed', error });
  }
};

// Download Video
export const downloadVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findUnique({ where: { id: Number(id) } });
    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.download(video.renderedVideoPath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error downloading the video' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Download failed', error });
  }
};
