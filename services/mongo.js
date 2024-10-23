import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.on('open', () =>
  console.log('MongoDB Atlas connected')
);

mongoose.connection.on('error', (err) =>
  console.error(err)
);

async function mongoDbConnect() {
 await mongoose.connect(MONGO_URL);
}

export default mongoDbConnect;

