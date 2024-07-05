export class ErroException extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
  public readonly message: string;
}
