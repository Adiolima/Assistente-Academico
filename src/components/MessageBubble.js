/**
 * MessageBubble - Bolha de mensagem estilo WhatsApp.
 * - Enviadas: verde à direita com ponta + ticks de entrega/leitura.
 * - Recebidas: brancas à esquerda com avatar do bot.
 * - Agrupa mensagens consecutivas e suporta anexos (documento/PDF).
 */
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS, FONTS } from "../utils/theme";
import { TickIcon } from "./Icons";
import DocumentCard from "./DocumentCard";

/**
 * Converte texto com formatação Markdown simples em elementos Text.
 * Suporta: **negrito**, *itálico*, • bullets, \n quebras de linha.
 */
function FormattedText({ children: text, style }) {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <Text style={style}>
      {lines.map((line, lineIdx) => (
        <Text key={lineIdx}>
          {lineIdx > 0 ? "\n" : ""}
          {formatLine(line)}
        </Text>
      ))}
    </Text>
  );
}

function formatLine(line) {
  // Divide por **negrito** ou *itálico*
  const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Text key={i} style={{ fontWeight: FONTS.bold }}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <Text key={i} style={{ fontStyle: "italic" }}>
          {part.slice(1, -1)}
        </Text>
      );
    }
    return <Text key={i}>{part}</Text>;
  });
}

export default function MessageBubble({
  message,
  isUser,
  grouped = false,
  status = "read",
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(isUser ? 30 : -30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  };

  const hasAttachment = !!message.attachment;
  const tickColor = status === "read" ? COLORS.tickRead : COLORS.tickDelivered;
  const tickDouble = status !== "sent";

  return (
    <Animated.View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowBot,
        grouped ? styles.rowGrouped : styles.rowSpaced,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      {/* Avatar do bot (oculto em mensagens agrupadas) */}
      {!isUser && (
        <View style={styles.avatarSlot}>
          {!grouped && (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>CE</Text>
            </View>
          )}
        </View>
      )}

      <View style={isUser ? styles.userWrapper : styles.botWrapper}>
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          {hasAttachment && <DocumentCard attachment={message.attachment} />}
          <FormattedText
            style={[
              styles.messageText,
              isUser ? styles.userText : styles.botText,
            ]}
          >
            {message.content}
          </FormattedText>

          <View style={styles.footer}>
            <Text style={styles.timestamp}>
              {formatTime(message.timestamp)}
            </Text>
            {isUser && (
              <View style={styles.ticks}>
                <TickIcon color={tickColor} double={tickDouble} size={15} />
              </View>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 8,
    alignItems: "flex-end",
  },
  rowUser: {
    justifyContent: "flex-end",
  },
  rowBot: {
    justifyContent: "flex-start",
  },
  rowSpaced: {
    marginTop: 8,
  },
  rowGrouped: {
    marginTop: 2,
  },

  // Avatar (recebidas)
  avatarSlot: {
    width: 28,
    marginRight: 6,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.headerBg,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: FONTS.bold,
  },

  // Wrappers
  userWrapper: {
    maxWidth: "80%",
    alignItems: "flex-end",
  },
  botWrapper: {
    maxWidth: "80%",
    alignItems: "flex-start",
  },

  // Bolha
  bubble: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingTop: 6,
    paddingBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: COLORS.userBubble,
    borderTopRightRadius: 2,
  },
  botBubble: {
    backgroundColor: COLORS.botBubble,
    borderTopLeftRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.botBubbleBorder,
  },
  messageText: {
    fontSize: FONTS.messageText,
    lineHeight: 22,
    color: COLORS.textPrimary,
  },
  userText: {},
  botText: {},

  // Rodapé (hora + ticks) encaixado no canto inferior direito
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginTop: 2,
    marginBottom: -3,
    marginRight: -3,
    marginLeft: 8,
  },
  timestamp: {
    fontSize: FONTS.timestamp,
    color: COLORS.textSecondary,
    lineHeight: 13,
  },
  ticks: {
    marginLeft: 3,
    marginBottom: 1,
  },
});
