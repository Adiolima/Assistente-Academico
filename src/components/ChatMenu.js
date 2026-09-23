/**
 * ChatMenu - Menu dropdown com opções do chat.
 * Inclui: limpar histórico, sobre a escola e fechar.
 */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, FONTS, SPACING, RADIUS } from "../utils/theme";
import { SCHOOL_NAME, SCHOOL_CONTACTS } from "../config";

const MENU_ITEMS = [
  { icon: "🗑️", label: "Limpar conversa", action: "clear", danger: true },
  { icon: "ℹ️", label: "Informações da escola", action: "about" },
];

export default function ChatMenu({
  visible,
  onClose,
  onClearHistory,
}) {
  const [showAbout, setShowAbout] = React.useState(false);
  const insets = useSafeAreaInsets();

  const handlePress = (action) => {
    if (action === "clear") {
      onClose();
      onClearHistory();
    } else if (action === "about") {
      setShowAbout(true);
    }
  };

  return (
    <>
      {/* Menu principal */}
      <Modal
        visible={visible && !showAbout}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <View
            style={[
              styles.menu,
              { marginTop: insets.top + 44 },
            ]}
          >
            <Text style={styles.menuTitle}>Opções</Text>
            {MENU_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.menuItem, idx < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
                onPress={() => handlePress(item.action)}
                activeOpacity={0.6}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.menuLabel,
                    item.danger && styles.menuLabelDanger,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Modal "Informações da escola" */}
      <Modal
        visible={showAbout}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAbout(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setShowAbout(false)}>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>{SCHOOL_NAME}</Text>
            <View style={styles.aboutDivider} />

            {[
              { label: "📍", value: SCHOOL_CONTACTS.localizacao },
              { label: "📞", value: SCHOOL_CONTACTS.telefone },
              { label: "📧", value: SCHOOL_CONTACTS.email },
              { label: "🕐", value: SCHOOL_CONTACTS.horario },
              { label: "👤", value: SCHOOL_CONTACTS.diretor },
            ].map((row, i) => (
              <View key={i} style={styles.aboutRow}>
                <Text style={styles.aboutIcon}>{row.label}</Text>
                <Text style={styles.aboutValue}>{row.value}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.aboutClose}
              onPress={() => setShowAbout(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.aboutCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingRight: SPACING.md,
  },

  // Menu dropdown
  menu: {
    backgroundColor: COLORS.menuBg,
    borderRadius: RADIUS.md,
    minWidth: 220,
    paddingVertical: SPACING.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.menuBorder,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: SPACING.md,
  },
  menuLabel: {
    fontSize: FONTS.menuItem,
    color: COLORS.textPrimary,
    fontWeight: FONTS.medium,
  },
  menuLabelDanger: {
    color: COLORS.error,
  },

  // Modal "Sobre"
  aboutCard: {
    backgroundColor: COLORS.menuBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    width: "85%",
    maxWidth: 340,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? 180 : 140,
    marginRight: -SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: FONTS.bold,
    color: COLORS.headerBg,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  aboutDivider: {
    height: 2,
    backgroundColor: COLORS.online,
    marginBottom: SPACING.lg,
    borderRadius: 1,
  },
  aboutRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  aboutIcon: {
    fontSize: 16,
    width: 24,
  },
  aboutValue: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  aboutClose: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.headerBg,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    alignItems: "center",
  },
  aboutCloseText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: FONTS.semibold,
  },
});
