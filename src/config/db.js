import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Video = prisma.video;

export default Video;
