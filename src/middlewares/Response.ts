import { NextFunction, Request, Response } from "express";

const responseFormat = (req: Request, res: Response, next: NextFunction) => {
    const message: any = {}
    message.data = (<any>res).body
    message.success = 'true'
    message.status = res.statusCode
    console.log(res.statusCode)
    res.end({ message })
    next()
}

export = responseFormat