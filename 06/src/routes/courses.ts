import express, { Response } from 'express';
import { HTTP_STATUSES } from '../../utils';
import { CourseType, DBType } from '../db/db';
import { CourseViewModel } from '../models/CourseViewModel';
import { CreateCourseModel } from '../models/CreateCourseModel';
import { QueryCoursesModel } from '../models/QueryCoursesQueryModel';
import { URIParamsCourseIdModel } from '../models/URIParamsCourseIdModel';
import { TypedRequestBody, TypedRequestParams, TypedRequestParamsAndBody, TypedRequestQuery } from '../types';

export const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
     return {
        id: dbCourse.id,
        title: dbCourse.title,
     }
}

export const getCoursesRouter = (db: DBType) => {
    const router = express.Router();

    router.get('/', (
        req: TypedRequestQuery<QueryCoursesModel>,
        res: Response<CourseViewModel[]>
    ) => {
        let foundCourses = db.courses;
    
        if (req.query.title) {
            foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
        }
    
        res.json(foundCourses.map(getCourseViewModel));
    });
    
    router.get('/:id', (req: TypedRequestParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
        const foundCourse = db.courses.find(course => course.id === Number(req.params.id));
    
        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.json(getCourseViewModel(foundCourse));
    });
    
    router.post('/', (req: TypedRequestBody<CreateCourseModel >, res: Response<CourseViewModel>) => {
        if (!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const createdCourse: CourseType = {
            id: Number(new Date()),
            title: req.body.title,
            studentsCount: 0
        }
        db.courses.push(createdCourse);
        res
            .status(HTTP_STATUSES.CREATED_201)
            .json(getCourseViewModel(createdCourse));
    });
    
    router.delete('/:id', (req: TypedRequestParams<URIParamsCourseIdModel>, res:Response<CourseViewModel>) => {
        db.courses = db.courses.filter(course => course.id !== Number(req.params.id));
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
    
    router.put('/:id', (req: TypedRequestParamsAndBody<URIParamsCourseIdModel, {title: string}>, res) => {
    
        if (!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
    
        const foundCourse = db.courses.find(course => course.id === Number(req.params.id));
    
        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
    
        foundCourse.title = req.body.title;
    
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });

    return router;
}