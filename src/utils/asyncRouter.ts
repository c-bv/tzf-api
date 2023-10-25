import { NextFunction, Request, Response, Router } from 'express';

const asyncHandler = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await Promise.resolve(fn(req, res, next));
    } catch (err) {
        return next(err);
    }
};

export const asyncRouter = (router: Router) => {
    for (const route of router.stack) {
        for (const handler of route.route.stack) {
            handler.handle = asyncHandler(handler.handle.bind(handler));
        }
    }
    return router;
};
