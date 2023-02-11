"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../utils/index");
const getTestsRouter = (db) => {
    const router = express_1.default.Router();
    router.delete('/data', (req, res) => {
        db.courses = [];
        res.sendStatus(index_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    return router;
};
exports.getTestsRouter = getTestsRouter;
