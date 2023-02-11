import { Request } from "express";

export type TypedRequestBody<T> = Request<{}, {}, T>
export type TypedRequestQuery<T> = Request<{}, {}, {}, T>
export type TypedRequestParams<T> = Request<T>
export type TypedRequestParamsAndBody<T, B> = Request<T, {}, B>