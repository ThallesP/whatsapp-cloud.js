import { IAPIRawSectionRow } from "../@types/api";

export class RowSection {
  public id = "";
  public title = "";
  public description = "";

  setId(id: string): this {
    this.id = id;

    return this;
  }

  setTitle(title: string): this {
    this.title = title;

    return this;
  }

  setDescription(description: string): this {
    this.description = description;

    return this;
  }

  toAPIObject(): IAPIRawSectionRow {
    return { id: this.id, title: this.title, description: this.description };
  }
}
