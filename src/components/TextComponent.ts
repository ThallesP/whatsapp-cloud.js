import { IGenericComponent } from "../@types";

export class TextComponent implements IGenericComponent {
  public type: "body" | "header" | "button" = "body";
  public text = "";

  setType(type: "body" | "header" | "button"): this {
    this.type = type;

    return this;
  }

  setText(text: string): this {
    this.text = text;

    return this;
  }

  toAPIObject(): any {
    return { type: this.type, parameters: [{ type: "text", text: this.text }] };
  }
}
