import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response, next: NextFunction) => {
     res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        status: `${StatusCodes.NOT_FOUND}`,
        message: "Not Found",
        error: '',
    });
};

export default notFound;