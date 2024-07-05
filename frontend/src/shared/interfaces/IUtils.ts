export interface IMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface IError {
  message: string;
  errors: {};
}
