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
  "Quanto custa a propina?",
  "Quais documentos preciso?",
  "Quais cursos existem?",
  "Qual é o calendário escolar?",
  "Onde fica a escola?",
  "Qual é o horário da secretaria?",
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
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.chipText}>{item}</Text>
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
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.quickReplyBorder,
    ...SHADOWS.small,
  },
  chipText: {
    fontSize: FONTS.quickReply,
    color: COLORS.quickReplyText,
    fontWeight: FONTS.medium,
  },
});
