import * as dotenv from 'dotenv';
dotenv.config();
import express, { urlencoded } from 'express';
import routes from './routes';
import mongoose from 'mongoose';
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(fileUpload());

// Routing
app.use(routes);

// Establish DB Connection
mongoose.connect(process.env.MONGODB_URI!).then((res) => {
    app.listen(5000, () => console.log('Server is running on the port 5000! & connected to MongoDB'));
});
