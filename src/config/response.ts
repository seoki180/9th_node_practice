export class ResponseBase {
  resultType: string = 'FAIL';
  data: any = null;
  message: string = '';
  error?: string;

  constructor({
    resultType,
    data,
    message,
    error
  }: {
    resultType: string;
    data: any;
    message: string;
    error?: string;
  }) {
    this.resultType = resultType;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}
