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
