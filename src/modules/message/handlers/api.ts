import { Axios, AxiosError } from "axios";
import { getInstance } from "../../../core/api";
import { ResponseList } from "../../../core/interfaces";
import {
  CreateMessageRequest,
  CompletionMessageResponse,
  Message,
} from "../interfaces";
import __, { Index } from "../../../settings/i18n";

// Função para criar uma mensagem e iniciar uma conclusão assíncrona
export const createMessage = async (
  data: CreateMessageRequest
): Promise<CompletionMessageResponse> => {
  const response = await getInstance().post<CompletionMessageResponse>(
    `/api/channels/embed/messages`,
    data
  );
  return response.data;
};

// Função para recuperar uma mensagem por ID
export const listMessages = async (): Promise<ResponseList<Message>> => {
  try {
    const url = `/api/channels/embed/messages?order=asc&orderBy=id&limit=100`;
    const response = await getInstance().get<ResponseList<Message>>(url);
    return response.data;
  } catch (err: any) {
    if (err.response.status === 400 && err.response.data.error) {
      if (err.response.data.error === "Chat is not open") {
        throw __(Index.CHAT_CLOSED);
      }
    }

    throw err;
  }
};
