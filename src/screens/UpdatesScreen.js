import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { COLORS } from "../utils/theme";
import GreenHeader from "../components/GreenHeader";
import Avatar from "../components/Avatar";

const STATUSES = [
  { name: "Secretaria Académica", text: "SA", color: "#53BDEB", time: "há 12 minutos" },
  { name: "Coordenação Pedagógica", text: "CP", color: "#00897B", time: "há 1 hora" },
  { name: "Pais e Encarregados", text: "PE", color: "#FFA726", time: "hoje 08:11" },
];

const CHANNELS = [
  { name: "Avisos do Colégio", text: "SG", color: "#00A884", info: "12 mil seguidores" },
  { name: "Ministério da Educação", text: "ME", color: "#5C6BC0", info: "Canal oficial" },
];

export default function UpdatesScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={COLORS.headerBg} barStyle="light-content" />
      <GreenHeader title="Atualizações" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.section}>Estado</Text>
        <View style={styles.row}>
          <View>
            <Avatar text="EU" color="#90A4AE" size={52} />
            <View style={styles.plus}>
              <Text style={styles.plusText}>+</Text>
            </View>
          </View>
          <View style={styles.rowText}>
            <Text style={styles.name}>O meu estado</Text>
            <Text style={styles.meta}>Toque para adicionar uma atualização</Text>
          </View>
        </View>

        <Text style={styles.section}>Atualizações recentes</Text>
        {STATUSES.map((item) => (
          <View key={item.name} style={styles.row}>
            <View style={styles.ring}>
              <Avatar text={item.text} color={item.color} size={48} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.time}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.section}>Canais</Text>
        {CHANNELS.map((item) => (
          <View key={item.name} style={styles.row}>
            <Avatar text={item.text} color={item.color} size={52} />
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.info}</Text>
            </View>
            <View style={styles.follow}>
              <Text style={styles.followText}>Seguir</Text>
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
  section: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rowText: { flex: 1, marginLeft: 14 },
  name: { fontSize: 16, fontWeight: "600", color: COLORS.textPrimary },
  meta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  plus: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  plusText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", marginTop: -1 },
  ring: {
    padding: 2,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.statusRing,
  },
  follow: {
    backgroundColor: "#D9FDD3",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followText: { color: "#056E4A", fontWeight: "700", fontSize: 13 },
});
