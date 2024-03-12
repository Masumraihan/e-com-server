export type TErrorSources = {
  path: string | number;
  message: string;
};

export type TErrorType = {
  errorSources: TErrorSources[];
  message: string;
  statusCode: number;
  stack?: string;
};
