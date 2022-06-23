import { IAPIRawReplyButton } from "../@types/api";

export class ReplyButton {
  public title = "";
  public id = "";

  setTitle(title: string): this {
    this.title = title;

    return this;
  }

  setId(id: string): this {
    this.id = id;

    return this;
  }

  toAPIObject(): IAPIRawReplyButton {
    return { type: "reply", reply: { title: this.title, id: this.id } };
  }
}
