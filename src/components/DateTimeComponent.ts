import { IGenericComponent } from "../@types";
import { IAPIRawDateTimeComponent } from "../@types/api";

export class DateTimeComponent implements IGenericComponent {
  public type: "header" | "body" = "body";
  public fallbackValue: string = new Date().toString();

  setType(type: "body" | "header"): this {
    this.type = type;

    return this;
  }

  setFallbackValue(fallbackValue: string | Date): this {
    this.fallbackValue = fallbackValue.toString();

    return this;
  }

  // For some reason, I can't get this to work and the whatsapp reference documentation doesn't even mention this
  // I will remove it and test it later
  /* setDate(date: Date) {
    this.date = date;

    return this;
  } */

  toAPIObject(): IAPIRawDateTimeComponent {
    return {
      type: this.type,
      parameters: [
        {
          type: "date_time",
          date_time: {
            fallback_value: this.fallbackValue,
            /* component: {
              calendar: "GREGORIAN",
              day_of_month: this.date.getDate(),
              day_of_week: this.date.getDay(),
              month: this.date.getMonth(),
              hour: this.date.getHours(),
              minute: this.date.getMinutes(),
              year: this.date.getFullYear(),
            }, See comment above  */
          },
        },
      ],
    };
  }
}
