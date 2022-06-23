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

export interface IAPIRawSection {
  title: string;
  rows: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface IAPIRawListAction {
  button: string;
  sections: IAPIRawSection[];
}
