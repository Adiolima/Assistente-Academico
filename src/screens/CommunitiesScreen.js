import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { COLORS } from "../utils/theme";
import GreenHeader from "../components/GreenHeader";
import Avatar from "../components/Avatar";
import { SCHOOL_NAME } from "../config";

const GROUPS = [
  { name: "Avisos da Direção", preview: "Reunião de pais na quinta-feira", text: "AD", color: "#00A884" },
  { name: "Pais e Encarregados", preview: "Maria: Confirmado, estaremos presentes.", text: "PE", color: "#FFA726" },
  { name: "Turma 12.ª A", preview: "Trabalho de Física até sexta", text: "12", color: "#5C6BC0" },
];

export default function CommunitiesScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={COLORS.headerBg} barStyle="light-content" />
      <GreenHeader title="Comunidades" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.newCard}>
          <View style={styles.newIcon}>
            <Text style={styles.newPlus}>+</Text>
          </View>
          <Text style={styles.newTitle}>Nova comunidade</Text>
        </View>

        <View style={styles.community}>
          <Avatar text="SG" color="#075E54" size={48} />
          <View style={styles.communityText}>
            <Text style={styles.communityName}>{SCHOOL_NAME}</Text>
            <Text style={styles.communityMeta}>Comunidade da escola</Text>
          </View>
        </View>

        {GROUPS.map((g) => (
          <View key={g.name} style={styles.row}>
            <Avatar text={g.text} color={g.color} size={46} />
            <View style={styles.rowText}>
              <Text style={styles.name}>{g.name}</Text>
              <Text style={styles.meta} numberOfLines={1}>
                {g.preview}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: 24 },
  newCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#F0F2F5",
  },
  newIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  newPlus: { color: "#FFFFFF", fontSize: 28, fontWeight: "400", marginTop: -2 },
  newTitle: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  community: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.rowDivider,
  },
  communityText: { marginLeft: 14 },
  communityName: { fontSize: 17, fontWeight: "700", color: COLORS.textPrimary },
  communityMeta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowText: { flex: 1, marginLeft: 14 },
  name: { fontSize: 16, fontWeight: "600", color: COLORS.textPrimary },
  meta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
});
