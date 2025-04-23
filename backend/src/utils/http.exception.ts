// src/utils/HttpException.ts
export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data: any = null
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(
    message: string = "Petición incorrecta",
    data?: any
  ): HttpException {
    return new HttpException(400, message, data);
  }

  static unauthorized(
    message: string = "No Autorizado",
    data?: any
  ): HttpException {
    return new HttpException(401, message, data);
  }

  static forbidden(message: string = "Forbidden", data?: any): HttpException {
    return new HttpException(403, message, data);
  }

  static notFound(
    message: string = "No se ha encontrado el recurso",
    data?: any
  ): HttpException {
    return new HttpException(404, message, data);
  }

  static internal(
    message: string = "Error interno del servidor, comuniquese con el administrador",
    data?: any
  ): HttpException {
    return new HttpException(500, message, data);
  }
}
