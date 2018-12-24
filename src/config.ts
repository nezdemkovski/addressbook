import dotenv from 'dotenv';

dotenv.config();

const PORT: number | string = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || '';
const JWT_SECRET = process.env.JWT_SECRET || '';

export { PORT, MONGO_URL, JWT_SECRET };
