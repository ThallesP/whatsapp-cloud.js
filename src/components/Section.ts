import { IAPIRawSection } from "../@types/api";
import { RowSection } from "./SectionRow";

export class Section {
  public title = "";

  public rows: RowSection[] = [];

  setTitle(title: string): this {
    this.title = title;

    return this;
  }

  addRow(row: RowSection): this {
    this.rows.push(row);
    return this;
  }

  addRows(...rows: RowSection[]): this {
    this.rows.push(...rows);

    return this;
  }

  setRows(rows: RowSection[]): this {
    this.rows = rows;

    return this;
  }

  toAPIObject(): IAPIRawSection {
    return {
      title: this.title,
      rows: this.rows.map((row) => row.toAPIObject()),
    };
  }
}
