import { Request, Response } from 'express';
import Analytics from '../models/Analytics';

export const logAction = async (type: string, referenceId: string, action: string, extraData?: any) => {
  const record = new Analytics({ type, referenceId, action, extraData });
  await record.save();
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const { type, startDate, endDate } = req.query;

    const filter: any = {};
    if (type) filter.type = type;
    if (startDate || endDate) filter.timestamp = {};
    if (startDate) filter.timestamp.$gte = new Date(startDate as string);
    if (endDate) filter.timestamp.$lte = new Date(endDate as string);

    const analytics = await Analytics.find(filter).sort({ timestamp: -1 });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
};
