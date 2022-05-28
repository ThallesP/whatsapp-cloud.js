import { Message } from "../structures/Message";

export interface IAuthOptions {
  accessToken: string;
  phoneNumberID: string;
}

export interface IClientOptions {
  auth: IAuthOptions;
}

export interface IClientEvents {
  message: (message: Message) => void;
}
