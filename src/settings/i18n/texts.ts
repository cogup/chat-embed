export enum Index {
  CHAT_CLOSED = "CHAT_CLOSED",
  CHAT_ERROR = "CHAT_ERROR",
  NO_MESSAGES = "NO_MESSAGES",
}

interface LanguageData {
  [key: string]: string;
}

export const PT_BR: LanguageData = {
  CHAT_CLOSED: "Chat encerrado",
  CHAT_ERROR: "Erro ao carregar o chat",
  NO_MESSAGES: "Sem mensagens",
};

export const ES: LanguageData = {
  CHAT_CLOSED: "Chat cerrado",
  CHAT_ERROR: "Error al cargar el chat",
  NO_MESSAGES: "Sin mensajes",
};

export const EN_US: LanguageData = {
  CHAT_CLOSED: "Chat closed",
  CHAT_ERROR: "Error loading chat",
  NO_MESSAGES: "No messages",
};
