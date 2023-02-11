"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesRouter = exports.getCourseViewModel = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils");
const getCourseViewModel = (dbCourse) => {
    return {
        id: dbCourse.id,
        title: dbCourse.title,
    };
};
exports.getCourseViewModel = getCourseViewModel;
const getCoursesRouter = (db) => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => {
        let foundCourses = db.courses;
        if (req.query.title) {
            foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
        }
        res.json(foundCourses.map(exports.getCourseViewModel));
    });
    router.get('/:id', (req, res) => {
        const foundCourse = db.courses.find(course => course.id === Number(req.params.id));
        if (!foundCourse) {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.json((0, exports.getCourseViewModel)(foundCourse));
    });
    router.post('/', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const createdCourse = {
            id: Number(new Date()),
            title: req.body.title,
            studentsCount: 0
        };
        db.courses.push(createdCourse);
        res
            .status(utils_1.HTTP_STATUSES.CREATED_201)
            .json((0, exports.getCourseViewModel)(createdCourse));
    });
    router.delete('/:id', (req, res) => {
        db.courses = db.courses.filter(course => course.id !== Number(req.params.id));
        res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    router.put('/:id', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const foundCourse = db.courses.find(course => course.id === Number(req.params.id));
        if (!foundCourse) {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        foundCourse.title = req.body.title;
        res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    return router;
};
exports.getCoursesRouter = getCoursesRouter;
