import express from 'express';
import {  DBType } from '../db/db';
import { QueryCoursesModel } from '../models/QueryCoursesQueryModel';
import { URIParamsCourseIdModel } from '../models/URIParamsCourseIdModel';
import { TypedRequestParams, TypedRequestQuery } from '../types';

export const getInterestingRouter = (db: DBType) => {
    const router = express.Router();
    
    router.get('/:id([0-9]+)', (req: TypedRequestParams<URIParamsCourseIdModel>, res) => {
  
        res.json({title: 'data by id ' + req.params.id});
    });

    router.get('/books', (
        req: TypedRequestQuery<QueryCoursesModel>,
        res
    ) => {
        res.json({title: 'it\'s books handler'});
    });

    return router;
}