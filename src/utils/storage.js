/**
 * Utilitário para persistência local de mensagens usando AsyncStorage.
 * As mensagens são salvas localmente para que o chat sobreviva a fechamentos do app.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const MESSAGES_KEY = "@assAcad:messages";

/**
 * Salva o array de mensagens no AsyncStorage.
 *
 * @param {Array<object>} messages - Lista de mensagens do chat
 *   Cada mensagem: { id, role, content, timestamp }
 */
export async function saveMessages(messages) {
  try {
    const json = JSON.stringify(messages);
    await AsyncStorage.setItem(MESSAGES_KEY, json);
  } catch (error) {
    console.warn("[storage] Erro ao salvar mensagens:", error.message);
  }
}

/**
 * Carrega as mensagens salvas do AsyncStorage.
 *
 * @returns {Promise<Array<object>>} Lista de mensagens ou array vazio
 */
export async function loadMessages() {
  try {
    const json = await AsyncStorage.getItem(MESSAGES_KEY);
    if (json !== null) {
      return JSON.parse(json);
    }
    return [];
  } catch (error) {
    console.warn("[storage] Erro ao carregar mensagens:", error.message);
    return [];
  }
}

/**
 * Remove todas as mensagens do AsyncStorage (limpa o chat local).
 */
export async function clearLocalMessages() {
  try {
    await AsyncStorage.removeItem(MESSAGES_KEY);
  } catch (error) {
    console.warn("[storage] Erro ao limpar mensagens:", error.message);
  }
}
