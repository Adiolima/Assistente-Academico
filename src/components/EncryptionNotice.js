/**
 * EncryptionNotice - Aviso discreto no topo da conversa.
 * Texto tecnicamente honesto: o protótipo não implementa criptografia
 * de ponta a ponta, por isso não o afirmamos.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/theme";
import { InfoIcon } from "./Icons";

export default function EncryptionNotice() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.pill}>
        <InfoIcon color={COLORS.encryptionText} size={13} />
        <Text style={styles.text}>
          Mensagens processadas pelo servidor da escola. Evite partilhar dados
          sensíveis.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.encryptionBg,
    borderRadius: 7,
    paddingHorizontal: 11,
    paddingVertical: 6,
    maxWidth: 420,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.encryptionBorder,
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.encryptionText,
    marginLeft: 7,
    textAlign: "center",
  },
});