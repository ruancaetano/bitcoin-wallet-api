import { resolve } from 'path';
import dotenv from 'dotenv';

// Production build should get variables from OS runtime during deploy
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: resolve(__dirname, '../../../.env.development') });
}
