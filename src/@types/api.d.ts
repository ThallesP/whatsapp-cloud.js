export interface IAPIRawReplyButton {
  type: "reply";
  reply: {
    id: string;
    title: string;
  };
}

export interface IAPIRawButtonsAction {
  buttons: IAPIRawReplyButton[];
}

export interface IAPIRawSectionRow {
  id: string;
  title: string;
  description: string;
}

export interface IAPIRawSection {
  title: string;
  rows: IAPIRawSectionRow[];
}

export interface IAPIRawListAction {
  button: string;
  sections: IAPIRawSection[];
}

export interface IAPIRawDateTime {
  fallback_value: string;
  /* component: {
    day_of_week?: number;
    year?: number;
    month?: number;
    day_of_month?: number;
    hour?: number;
    minute?: number;
    calendar?: "GREGORIAN" | "SOLAR_HIJRI";
  }; */
}

export interface IAPIRawDateTimeComponent {
  type: string;
  parameters: {
    type: "date_time";
    date_time: IAPIRawDateTime;
  }[];
}
