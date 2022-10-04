import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const output = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    //add stacktrace for local debugging
    console.log({
      ...output,
      stack: exception.stack,
      message: exception.message,
    });

    response.json(output);
  }
}
