import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as ExFilter,
} from '@nestjs/common';

@Catch(Error)
export class ExceptionFilter implements ExFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const output = {
      timestamp: new Date().toISOString(),
      message: exception.message,
    };

    //add stacktrace for local debugging
    console.log({
      ...output,
      stack: exception.stack,
    });
  }
}
