/**
 * QuickReplies - Sugestões de perguntas rápidas para início de conversa.
 * Exibido quando o chat está vazio (apenas mensagem de boas-vindas).
 * Visual discreto integrado ao wallpaper.
 */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from "../utils/theme";

const SUGGESTIONS = [
  { emoji: "💰", text: "Valor das propinas" },
  { emoji: "📅", text: "Calendário escolar" },
  { emoji: "📄", text: "Documentos p/ matrícula" },
  { emoji: "📚", text: "Cursos disponíveis" },
  { emoji: "⏰", text: "Horário das aulas" },
  { emoji: "📍", text: "Localização da escola" },
];

export default function QuickReplies({ onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perguntas frequentes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SUGGESTIONS.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.chip}
            onPress={() => onSelect(item.text)}
            activeOpacity={0.7}
          >
            <Text style={styles.chipEmoji}>{item.emoji}</Text>
            <Text style={styles.chipText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
    paddingLeft: SPACING.md,
  },
  title: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: FONTS.medium,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingRight: SPACING.md,
    gap: SPACING.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.quickReplyBorder,
    ...SHADOWS.small,
  },
  chipEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  chipText: {
    fontSize: FONTS.quickReply,
    color: COLORS.quickReplyText,
    fontWeight: FONTS.medium,
  },
});
