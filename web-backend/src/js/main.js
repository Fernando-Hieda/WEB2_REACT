import express from 'express';
import cors from 'cors'; // Just use in development. In production, set policies correctly!

import userRouter from './routes/userRouter.js';
import playlistRouter from './routes/playlistRouter.js';
import playlistRemoveRouter from './routes/playlistRemoveRouter.js';
import songRouter from './routes/songRouter.js';
import songRemoveRouter from './routes/songRemoveRouter.js';


const app = express();

const port = 5000;

app.use(cors()); // Just use in development. In production, set policies correctly!
app.use(express.json());
app.use('/user', userRouter);
app.use('/playlist', playlistRouter);
app.use('/playlistRemove', playlistRemoveRouter);
app.use('/song', songRouter);
app.use('/songRemove', songRemoveRouter);

app.listen(port, () => { console.log('Listening on port ' + port); });