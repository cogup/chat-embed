// Interfaces para as respostas das rotas da API
import { getInstance, updateAuthorization } from "../../../core/api";
import { Config } from "../interfaces";

export const startChat = async (): Promise<Config> => {
  if (!getInstance().defaults.headers.common["Authorization"]) {
    const token = localStorage.getItem("token");

    if (token) {
      updateAuthorization(token);
    }
  }

  //active keep a live
  const headers = {
    "Content-Type": "application/json",
    "keep-alive": "true",
  };

  const response = await getInstance().get<Config>(`/api/channels/embed`, {
    headers,
  });

  const data = response.data as Config;

  updateAuthorization(data.token);
  localStorage.setItem("token", data.token);

  return data;
};
