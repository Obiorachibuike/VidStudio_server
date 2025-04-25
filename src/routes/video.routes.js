import express from 'express';
import { uploadVideo, trimVideo, addSubtitles, renderVideo, downloadVideo } from '../controllers/video.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Routes
router.post('/upload', upload.single('video'), uploadVideo);
router.post('/:id/trim', trimVideo);
router.post('/:id/subtitles', addSubtitles);
router.post('/:id/render', renderVideo);
router.get('/:id/download', downloadVideo);

export default router;
