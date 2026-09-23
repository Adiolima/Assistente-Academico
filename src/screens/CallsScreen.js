import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { COLORS } from "../utils/theme";
import GreenHeader from "../components/GreenHeader";
import Avatar from "../components/Avatar";
import { CallArrowIcon, PhoneIcon } from "../components/Icons";

const CALLS = [
  {
    name: "Secretaria Académica",
    text: "SA",
    color: "#53BDEB",
    info: "Hoje, 09:14",
    incoming: true,
    missed: false,
  },
  {
    name: "Tesouraria",
    text: "TS",
    color: "#7C4DFF",
    info: "Ontem, 17:02",
    incoming: false,
    missed: false,
  },
  {
    name: "Coordenação Pedagógica",
    text: "CP",
    color: "#00897B",
    info: "20 de setembro, 11:40",
    incoming: true,
    missed: true,
  },
];

export default function CallsScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={COLORS.headerBg} barStyle="light-content" />
      <GreenHeader title="Chamadas" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.linkRow}>
          <View style={styles.linkIcon}>
            <PhoneIcon color="#FFFFFF" size={18} />
          </View>
          <View>
            <Text style={styles.name}>Criar ligação de chamada</Text>
            <Text style={styles.meta}>Partilhe uma ligação para a sua chamada</Text>
          </View>
        </View>

        <Text style={styles.section}>Recentes</Text>
        {CALLS.map((item) => (
          <View key={item.name} style={styles.row}>
            <Avatar text={item.text} color={item.color} size={50} />
            <View style={styles.rowText}>
              <Text style={[styles.name, item.missed && styles.missed]}>
                {item.name}
              </Text>
              <View style={styles.infoRow}>
                <CallArrowIcon incoming={item.incoming} missed={item.missed} />
                <Text style={styles.meta}>{item.info}</Text>
              </View>
            </View>
            <PhoneIcon color={COLORS.headerBg} size={20} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: 24 },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  linkIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rowText: { flex: 1, marginLeft: 14 },
  name: { fontSize: 16, fontWeight: "600", color: COLORS.textPrimary },
  missed: { color: COLORS.missedCall },
  meta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
});
