import express from 'express';
import { db } from './db/db';
import { getCoursesRouter } from './routes/courses';
import { getTestsRouter } from './routes/tests';
import { getInterestingRouter } from './routes/interesting';

export const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);
app.use('/courses', getCoursesRouter(db));
app.use('/__test__', getTestsRouter(db));
app.use('/interesting', getInterestingRouter(db));


