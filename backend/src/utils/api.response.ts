// src/utils/ApiResponse.ts
export class ApiResponse<T> {
  constructor(
    public readonly ok: boolean,
    public readonly data: T | null,
    public readonly message?: string,
    public readonly statusCode: number = 200
  ) {}

  static success<T>(
    data: T,
    message?: string,
    statusCode: number = 200
  ): ApiResponse<T> {
    return new ApiResponse<T>(true, data, message, statusCode);
  }

  static error<T>(
    message: string,
    statusCode: number = 400,
    data: T | null = null
  ): ApiResponse<T> {
    return new ApiResponse<T>(false, data, message, statusCode);
  }
}
