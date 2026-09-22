/**
 * DocumentCard - Cartão de documento (PDF) integrado à bolha de mensagem.
 * Componente reutilizável: renderiza quando uma mensagem possui `attachment`.
 * Estrutura esperada do attachment: { type, name, size, pages }
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../utils/theme";
import { PdfIcon } from "./Icons";

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentCard({ attachment }) {
  if (!attachment) return null;

  const name = attachment.name || "documento.pdf";
  const size = formatSize(attachment.size);
  const pages = attachment.pages || null;
  const type = attachment.type ? attachment.type.toUpperCase() : "PDF";

  return (
    <View style={styles.container}>
      <PdfIcon size={38} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {[size, pages ? `${pages} páginas` : null, type]
            .filter(Boolean)
            .join(" · ")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.04)",
    marginBottom: 4,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 14.5,
    fontWeight: FONTS.medium,
    color: COLORS.textPrimary,
  },
  meta: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
