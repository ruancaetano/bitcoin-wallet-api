import 'reflect-metadata';
import 'express-async-errors';
import './app/configs/dotenv.config';


import { container } from 'tsyringe';
import { App } from './app';


const app = container.resolve(App)

app.server.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}!`);
});
