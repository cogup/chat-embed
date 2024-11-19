export enum MessageStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  ERROR = "error",
  AWAIT = "await",
}

export enum MessageOwners {
  ASSISTANT = "assistant",
  USER = "user",
  SYSTEM = "system",
  FUNCTION = "function",
}

export interface Message {
  referenceId: string;
  message: string;
  status: MessageStatus;
  replyTo?: number;
  owner: MessageOwners;
  createdAt: string;
  updatedAt: string;
}

export interface CompletionMessageResponse {
  message: Message;
}

export interface CreateMessageRequest {
  message: string;
  referenceId?: string;
}
