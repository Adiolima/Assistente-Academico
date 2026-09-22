/**
 * ChatScreen - Tela principal do assistente acadêmico.
 *
 * Layout estilo WhatsApp com:
 * - Header com avatar e status
 * - Wallpaper bege com padrão discreto
 * - Quick replies quando o chat está vazio
 * - Aviso de criptografia de ponta a ponta
 * - Separadores de data
 * - Mensagens agrupadas com animações de entrada
 * - Indicador de "a escrever..."
 * - Menu dropdown com opções
 */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChatHeader from "../components/ChatHeader";
import ChatMenu from "../components/ChatMenu";
import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";
import QuickReplies from "../components/QuickReplies";
import Wallpaper from "../components/Wallpaper";
import DateSeparator, { formatDateLabel } from "../components/DateSeparator";
import EncryptionNotice from "../components/EncryptionNotice";
import { sendMessage, clearHistory } from "../services/api";
import {
  saveMessages,
  loadMessages,
  clearLocalMessages,
} from "../utils/storage";
import { COLORS } from "../utils/theme";

const WELCOME_MESSAGE = {
  id: "welcome-init",
  role: "assistant",
  content:
    "👋 Bem-vindo ao *Colégio Estrela do Saber*!\n\n" +
    "Sou o assistente virtual da escola. Posso ajudar com:\n" +
    "💰 Propinas e valores\n" +
    "📅 Calendário escolar\n" +
    "📄 Documentos para matrícula\n" +
    "📚 Cursos e disciplinas\n\n" +
    "Como posso ajudar hoje?",
  timestamp: new Date().toISOString(),
};

/* ------------------------------------------------------------------ */
/* Helpers de apresentação (agrupamento, datas, ticks)                  */
/* ------------------------------------------------------------------ */

function sameDayKey(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Mensagens consecutivas do mesmo autor num intervalo curto ficam agrupadas. */
function isSameGroup(tsA, tsB) {
  if (!tsA || !tsB) return false;
  const a = new Date(tsA);
  const b = new Date(tsB);
  return (
    sameDayKey(a, b) && Math.abs(a.getTime() - b.getTime()) < 3 * 60 * 1000
  );
}

/** Devolve o rótulo do separador apenas quando a data muda em relação à anterior. */
function getDateLabel(ts, prevTs) {
  const cur = formatDateLabel(ts);
  const prev = prevTs ? formatDateLabel(prevTs) : null;
  return cur === prev ? null : cur;
}

/** Estado de leitura das mensagens enviadas (visual). */
function getUserStatus(messages, index) {
  for (let i = index + 1; i < messages.length; i++) {
    if (messages[i].role === "assistant") return "read";
  }
  return "delivered";
}

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const flatListRef = useRef(null);

  // =========================================================================
  // Inicialização: carrega mensagens salvas
  // =========================================================================
  useEffect(() => {
    const init = async () => {
      await clearLocalMessages();
      const saved = await loadMessages();
      if (saved.length > 0) {
        setMessages(saved);
        setShowQuickReplies(false);
      } else {
        setMessages([WELCOME_MESSAGE]);
        await saveMessages([WELCOME_MESSAGE]);
      }
    };
    init();
  }, []);

  // =========================================================================
  // Persistência local
  // =========================================================================
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  // =========================================================================
  // Ajuste de scroll com o teclado
  // =========================================================================
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, () => {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 120);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // =========================================================================
  // Envio de mensagem
  // =========================================================================
  const handleSend = useCallback(async (text) => {
    setShowQuickReplies(false);

    const userMsg = {
      id: "u-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const data = await sendMessage(text);
      const botMsg = {
        id: "b-" + Date.now(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errMsg = {
        id: "e-" + Date.now(),
        role: "assistant",
        content: `❌ Ocorreu um erro: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  // =========================================================================
  // Quick reply
  // =========================================================================
  const handleQuickReply = useCallback(
    (text) => handleSend(text),
    [handleSend]
  );

  // =========================================================================
  // Limpar histórico
  // =========================================================================
  const handleClearHistory = useCallback(() => {
    Alert.alert(
      "Limpar conversa",
      "Todo o histórico será removido permanentemente.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            try {
              setIsTyping(false);
              await clearHistory();
              await clearLocalMessages();
              setMessages([WELCOME_MESSAGE]);
              setShowQuickReplies(true);
            } catch (error) {
              Alert.alert("Erro", error.message);
            }
          },
        },
      ]
    );
  }, []);

  // =========================================================================
  // Renderização
  // =========================================================================
  const renderItem = useCallback(
    ({ item, index }) => {
      const prev = index > 0 ? messages[index - 1] : null;
      const grouped =
        !!prev &&
        prev.role === item.role &&
        isSameGroup(prev.timestamp, item.timestamp);
      const dateLabel = getDateLabel(item.timestamp, prev ? prev.timestamp : null);
      const status =
        item.role === "user" ? getUserStatus(messages, index) : null;

      return (
        <View>
          {dateLabel && <DateSeparator label={dateLabel} />}
          <MessageBubble
            message={item}
            isUser={item.role === "user"}
            grouped={grouped}
            status={status}
          />
        </View>
      );
    },
    [messages]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar backgroundColor={COLORS.headerBg} barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Wallpaper de fundo (atrás da conversa) */}
        <Wallpaper />

        {/* Header */}
        <ChatHeader
          isTyping={isTyping}
          onMenuPress={() => setMenuVisible(true)}
        />

        {/* Mensagens */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
          ListHeaderComponent={
            <>
              <EncryptionNotice />
              {showQuickReplies ? (
                <QuickReplies onSelect={handleQuickReply} />
              ) : null}
            </>
          }
        />

        {/* Indicador de digitação */}
        {isTyping && <TypingIndicator />}

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </KeyboardAvoidingView>

      {/* Menu dropdown */}
      <ChatMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onClearHistory={handleClearHistory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.chatBg,
  },
  flex: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingVertical: 6,
    flexGrow: 1,
  },
});
