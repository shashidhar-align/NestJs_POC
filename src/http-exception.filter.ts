import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from "@nestjs/common";
import { Request, Response } from 'express';
// import { BaseExceptionFilter } from "@nestjs/core";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // catch(exception: unknown, host: ArgumentsHost) {
  //   super.catch(exception, host);
  // }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
