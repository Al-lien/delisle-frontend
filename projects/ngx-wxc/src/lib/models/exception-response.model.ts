export interface IExceptionResponse {
  businessErrorCode?: number;
  businessErrorDescription?: string;
  error?: string;
  validationErrors?: string[];
  errors?: string[];
}
