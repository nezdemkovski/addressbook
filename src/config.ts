import dotenv from 'dotenv';

dotenv.config();

const PORT: number | string = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

export { PORT, MONGO_URL };
