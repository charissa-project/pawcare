import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {

console.log(exception);

    const ctx =
      host.switchToHttp();

    const response =
      ctx.getResponse();

    const request =
      ctx.getRequest();

    const status =
      exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
      ? exception.getResponse()
      : null;

    let message='Terjadi kesalahan';

    if(
      typeof exceptionResponse === 'object'
      &&
      exceptionResponse
    ){

      message=
      (exceptionResponse as any)
      .message || message;

    }

    response.status(status)
    .json({

      success:false,

      message,

      path:
      request.url,

      timestamp:
      new Date()

    });

  }
}