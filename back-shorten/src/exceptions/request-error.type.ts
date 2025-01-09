export type RequestError = {
  code: string;
  status: number;
  message: string;
  details?: ErrorDetails;
};

export type ErrorDetails = object | string;
