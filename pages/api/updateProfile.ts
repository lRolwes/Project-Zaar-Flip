// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import initializeCors from 'nextjs-cors';
const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //await initializeCors(req, res); // Initialize CORS
  

  try {
    // Query your Prisma database based on the user's address
    const ownerAddress = req.query.ownerAddress?.toString() || ""; // Assuming the address is passed as a query parameter
    const userName = req.query.uName?.toString() || ""; // Assuming the address is passed as a query parameter
    const newBio = req.query.bio?.toString() || ""; // Assuming the address is passed as a query parameter
    const newEmail = req.query.email?.toString() || ""; // Assuming the address is passed as a query parameter
    const newProfPicURL = req.query.profPicUrl?.toString() || ""; // Assuming the address is passed as a query parameter
    const newBannerPicURL = req.query.bannerPicUrl?.toString() || ""; // Assuming the address is passed as a query parameter
    const userData = await prisma.profile.upsert({
        where: { authorAddress: ownerAddress },
        update: { uName: userName, bio: newBio, email: newEmail, profPicUrl: newProfPicURL, bannerPicUrl: newBannerPicURL},
        create: {uName: userName, bio: newBio, authorAddress: ownerAddress, email: newEmail, profPicUrl: newProfPicURL, bannerPicUrl: newBannerPicURL} ,
        });
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default allowCors(handler);

