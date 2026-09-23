/**
 * Persistência local de mensagens por conversa (AsyncStorage).
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const LEGACY_KEY = "@assAcad:messages";

function keyFor(chatId) {
  return `@assAcad:messages:${chatId || "school"}`;
}

export async function saveMessages(messages, chatId = "school") {
  try {
    await AsyncStorage.setItem(keyFor(chatId), JSON.stringify(messages));
  } catch (error) {
    console.warn("[storage] Erro ao salvar mensagens:", error.message);
  }
}

export async function loadMessages(chatId = "school") {
  try {
    const json = await AsyncStorage.getItem(keyFor(chatId));
    if (json !== null) return JSON.parse(json);

    if (chatId === "school") {
      const legacy = await AsyncStorage.getItem(LEGACY_KEY);
      if (legacy !== null) return JSON.parse(legacy);
    }
    return [];
  } catch (error) {
    console.warn("[storage] Erro ao carregar mensagens:", error.message);
    return [];
  }
}

export async function clearLocalMessages(chatId = "school") {
  try {
    await AsyncStorage.removeItem(keyFor(chatId));
    if (chatId === "school") {
      await AsyncStorage.removeItem(LEGACY_KEY);
    }
  } catch (error) {
    console.warn("[storage] Erro ao limpar mensagens:", error.message);
  }
}
