export class WhatsappAPIError extends Error {
  constructor(
    public code: number,
    public message: string,
    public extraData?: any
  ) {
    super();
  }
}
