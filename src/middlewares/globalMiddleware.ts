import { NextFunction, Request, Response } from "express";

export function globalMiddleware(req: Request, res: Response, next: NextFunction){
    console.log(`este es un global middleware en la ruta ${req.url}, el metodo ${req.method} y la fecha ${new Date}`);
    next();
}