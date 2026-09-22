/**
 * Serviço de comunicação com o backend FastAPI.
 * Centraliza todas as chamadas HTTP para a API do assistente acadêmico.
 */
import axios from "axios";

// ⚠️ Configure o IP do seu computador aqui (onde o backend está rodando)
// Exemplo: "http://192.168.1.100:8000"
const API_BASE_URL = "https://nome-assistente-academico-backend-visibilidade-p-production.up.railway.app"; 

// Instância do axios com configuração base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 40000, // 30 segundos de timeout (DeepSeek pode demorar)
  headers: {
    "Content-Type": "application/json",
    "skip-browser-warning": true
  },
});

/**
 * Envia uma mensagem do usuário para o backend e retorna a resposta do bot.
 *
 * @param {string} message - Texto da mensagem do usuário
 * @returns {Promise<{response: string, status: string}>} Resposta do assistente
 */
export async function sendMessage(message) {
  try {
    const { data } = await api.post("/chat", { message });
    return data;
  } catch (error) {
    // Tratamento de erros de rede ou do servidor
    if (error.response) {
      // O servidor respondeu com um status de erro
      const msg = error.response.data?.detail || "Erro no servidor";
      throw new Error(msg);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique sua conexão e o IP configurado."
      );
    } else {
      throw new Error("Erro ao enviar mensagem: " + error.message);
    }
  }
}

/**
 * Solicita ao backend que limpe todo o histórico de mensagens no MySQL.
 *
 * @returns {Promise<{status: string, message: string}>} Confirmação da exclusão
 */
export async function clearHistory() {
  try {
    const { data } = await api.delete("/chat/history");
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.detail || "Erro ao limpar histórico");
    }
    throw new Error("Erro de conexão ao limpar histórico");
  }
}

export default api;
