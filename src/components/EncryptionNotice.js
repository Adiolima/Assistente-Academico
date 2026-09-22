/**
 * EncryptionNotice - Aviso visual de criptografia de ponta a ponta.
 * Cartão amarelo claro, centralizado, apenas visual (não implementa criptografia).
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../utils/theme";
import { LockIcon } from "./Icons";

export default function EncryptionNotice() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <LockIcon color={COLORS.encryptionText} size={16} />
        <Text style={styles.text}>
          As mensagens e ligações são protegidas com a criptografia de ponta a
          ponta.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.encryptionBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    maxWidth: 420,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  text: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 16,
    color: COLORS.encryptionText,
    marginLeft: 8,
    textAlign: "center",
  },
});
