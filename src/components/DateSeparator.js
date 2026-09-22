/**
 * DateSeparator - Separador de data centralizado estilo WhatsApp.
 * Exporta também `formatDateLabel` para derivar o rótulo a partir do timestamp.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../utils/theme";

const WEEKDAYS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

function toDateKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/**
 * Rótulo do separador a partir do timestamp (em português).
 * - Hoje / Ontem
 * - Nome do dia (últimos 7 dias)
 * - dd/mm/aaaa para datas mais antigas
 */
export function formatDateLabel(ts) {
  if (!ts) return null;
  const now = new Date();
  const date = new Date(ts);
  const todayKey = toDateKey(now.toISOString());

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const key = toDateKey(ts);

  if (key === todayKey) return "Hoje";
  if (key === toDateKey(yesterday.toISOString())) return "Ontem";

  const diffDays = Math.round((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays > 1 && diffDays <= 6) {
    return WEEKDAYS[date.getDay()];
  }

  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

export default function DateSeparator({ label }) {
  if (!label) return null;
  return (
    <View style={styles.wrapper}>
      <View style={styles.pill}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  pill: {
    backgroundColor: COLORS.dateSeparatorBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 1,
  },
  text: {
    fontSize: FONTS.dateSeparator,
    color: COLORS.dateSeparatorText,
    fontWeight: FONTS.medium,
    textTransform: "lowercase",
  },
});
