export interface SuccessBaseDTO {
  message: string;
  data: object;
}

export interface FailureDTO {
  status: number;
  code: string;
  errorMsg: string;
  reason: string;
}
