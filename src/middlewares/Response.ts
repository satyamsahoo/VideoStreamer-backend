import { NextFunction, Request, Response } from "express";

const responseFormat = (req: Request, res: Response, next: NextFunction) => {
    const message: any = {}
    message.data = (<any>res).body
    message.success = 'true'
    message.status = res.statusCode
    // console.log({ req })
    console.log('responseFormat', res)
    console.log('--', message)
    // res.status(message.status).send(message)
    // return next()
}

export = responseFormat