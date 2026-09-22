import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS, FONTS } from "../utils/theme";
import { TickIcon } from "./Icons";
import DocumentCard from "./DocumentCard";

function FormattedText({ text, style }) {
  if (!text) return null;

  const lines = String(text).split("\n");

  return (
    <Text style={style}>
      {lines.map((line, lineIndex) => {
        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);

        return (
          <Text key={lineIndex}>
            {lineIndex > 0 ? "\n" : ""}
            {parts.map((part, index) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <Text key={index} style={styles.bold}>
                    {part.slice(2, -2)}
                  </Text>
                );
              }

              if (
                part.startsWith("*") &&
                part.endsWith("*") &&
                part.length > 2
              ) {
                return (
                  <Text key={index} style={styles.italic}>
                    {part.slice(1, -1)}
                  </Text>
                );
              }

              return <Text key={index}>{part}</Text>;
            })}
          </Text>
        );
      })}
    </Text>
  );
}

export default function MessageBubble({
  message,
  isUser,
  grouped = false,
  status = "read",
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(
    new Animated.Value(isUser ? 16 : -16)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  const hasAttachment = Boolean(message?.attachment);

  return (
    <Animated.View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowAssistant,
        grouped ? styles.rowGrouped : styles.rowSeparated,
        {
          opacity: fadeAnim,
          transform: [{ translateX: translateAnim }],
        },
      ]}
    >
      {!isUser && (
        <View style={styles.avatarColumn}>
          {!grouped && (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>CE</Text>
            </View>
          )}
        </View>
      )}

      <View
        style={[
          styles.messageContainer,
          isUser
            ? styles.messageContainerUser
            : styles.messageContainerAssistant,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.assistantBubble,
            grouped &&
              (isUser
                ? styles.userBubbleGrouped
                : styles.assistantBubbleGrouped),
          ]}
        >
          {hasAttachment && (
            <DocumentCard attachment={message.attachment} />
          )}

          <View style={styles.contentRow}>
            <FormattedText
              text={message.content}
              style={[
                styles.messageText,
                isUser ? styles.userText : styles.assistantText,
              ]}
            />

            <View style={styles.footer}>
              <Text style={styles.time}>
                {formatTime(message.timestamp)}
              </Text>

              {isUser && (
                <View style={styles.ticks}>
                  <TickIcon
                    color={
                      status === "read"
                        ? COLORS.tickRead
                        : COLORS.tickDelivered
                    }
                    double={status !== "sent"}
                    size={14}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 8,
    alignItems: "flex-end",
  },

  rowUser: {
    justifyContent: "flex-end",
  },

  rowAssistant: {
    justifyContent: "flex-start",
  },

  rowSeparated: {
    marginTop: 3,
  },

  rowGrouped: {
    marginTop: 1,
  },

  avatarColumn: {
    width: 30,
    marginRight: 5,
    alignItems: "center",
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
    fontSize: 9,
    fontWeight: FONTS.bold,
  },

  messageContainer: {
    maxWidth: "82%",
  },

  messageContainerUser: {
    alignItems: "flex-end",
  },

  messageContainerAssistant: {
    alignItems: "flex-start",
  },

  bubble: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 5,
    minWidth: 70,
  },

  userBubble: {
    backgroundColor: "#D9FDD3",
    borderTopRightRadius: 2,
  },

  assistantBubble: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 2,
  },

  userBubbleGrouped: {
    borderTopRightRadius: 8,
  },

  assistantBubbleGrouped: {
    borderTopLeftRadius: 8,
  },

  contentRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  messageText: {
    fontSize: 15.5,
    lineHeight: 21,
    flexShrink: 1,
  },

  userText: {
    color: "#111B21",
  },

  assistantText: {
    color: "#111B21",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginTop: 3,
    alignSelf: "flex-end",
  },

  time: {
    fontSize: 10,
    color: "#667781",
  },

  ticks: {
    marginLeft: 3,
    marginBottom: 1,
  },

  bold: {
    fontWeight: "700",
  },

  italic: {
    fontStyle: "italic",
  },
});