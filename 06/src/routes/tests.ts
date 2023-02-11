import express from 'express';
import { DBType } from '../db/db';
import { HTTP_STATUSES } from '../../utils/index';

export const getTestsRouter = (db: DBType) => {
    const router = express.Router();

    router.delete('/data', (req, res) => {
        db.courses = [];
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });

    return router;
}
