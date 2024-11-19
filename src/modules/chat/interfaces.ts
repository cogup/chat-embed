export enum ChatStatus {
  Open = "open",
  Closed = "closed",
  ClosedByUser = "closed_by_user",
  ClosedByPlatform = "closed_by_platform",
}

export interface Chat {
  title?: string;
  resume?: string;
  userChatId: string;
  createdAt: string;
  updatedAt: string;
  status: ChatStatus;
}

export type Config = {
  colors?: {
    primary: string;
    background?: string;
  };
  darkMode?: boolean;
  token: string;
};
