import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// can catch all exception
// @Catch()
@Catch(HttpException)
export class CustomFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    let message;
    const context = host.switchToHttp()
    const req = context.getRequest<Request>()
    const res = context.getResponse<Response>()
    const status = exception.getStatus()

    switch(status){
        case 403:
          message = "forbidden"
          break;
        case 404:
          message = "not found"
          break;
        case 500:
          message = "internal server error"
          break;
    }

    res.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toString()
    })
  }
}