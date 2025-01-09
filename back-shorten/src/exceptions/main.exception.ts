import { Logger } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorDetails, RequestError } from './request-error.type';

export class MainException {
  @ApiProperty()
  public code!: string;

  @ApiProperty()
  public message!: string;

  @ApiProperty()
  public status!: number;

  @ApiProperty()
  public details: unknown;

  public constructor(error: RequestError) {
    this.code = error.code;
    this.message = error.message;
    this.status = error.status;
    this.details = error.details;
  }

  static invalidData(details?: ErrorDetails): MainException {
    return new MainException({
      code: 'invalid-data',
      message: 'Provided data is not valid',
      status: 400,
      details: details,
    });
  }

  static internalRequestError(details?: ErrorDetails): MainException {
    Logger.error(details);
    return new MainException({
      code: 'internal-RequestError',
      message: 'Internal RequestError occurred',
      status: 500,
      details: details,
    });
  }

  static entityNotFound(details?: ErrorDetails): MainException {
    return new MainException({
      code: 'not-found',
      message: 'Entity not found',
      status: 404,
      details: details,
    });
  }

  static conflict(details?: ErrorDetails): MainException {
    return new MainException({
      code: 'conflict',
      message: 'Conflict occurred',
      status: 409,
      details: details,
    });
  }

  static unauthorized(details?: ErrorDetails): MainException {
    return new MainException({
      code: 'unauthorized',
      message: 'Request is not authorized',
      status: 401,
      details: details,
    });
  }

  static forbidden(details?: ErrorDetails): MainException {
    return new MainException({
      code: 'forbidden',
      message: 'Action is forbidden',
      status: 403,
      details: details,
    });
  }

  static gone(details?: ErrorDetails): MainException {
    return new MainException({
      code: 'gone',
      message: 'Resource is unavailable',
      status: 410,
      details: details,
    });
  }
}
