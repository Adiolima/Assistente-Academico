/**
 * ChatHeader - Barra superior estilo WhatsApp.
 * Voltar · Avatar · Nome/status · Vídeo · Telefone · Menu ⋮.
 * Preserva as props de status/menu já usadas pelo ChatScreen.
 */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { COLORS, FONTS, SHADOWS } from "../utils/theme";
import { BackIcon, PhoneIcon, VideoIcon, MenuIcon } from "./Icons";

export default function ChatHeader({
  isTyping = false,
  onMenuPress,
  isOnline = true,
  onBackPress,
  onVideoPress,
  onCallPress,
}) {
  return (
    <View style={styles.header}>
      {/* Voltar */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onBackPress}
        activeOpacity={0.5}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <BackIcon color={COLORS.headerText} size={26} />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>CE</Text>
        </View>
        {isOnline && <View style={styles.onlineDot} />}
      </View>

      {/* Nome + status */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          Colégio Estrela do Saber
        </Text>
        <Text
          style={[styles.subtitle, isTyping && styles.subtitleTyping]}
          numberOfLines={1}
        >
          {isTyping ? "a escrever..." : isOnline ? "Online" : "Offline"}
        </Text>
      </View>

      {/* Vídeo */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onVideoPress}
        activeOpacity={0.5}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <VideoIcon color={COLORS.headerText} size={23} />
      </TouchableOpacity>

      {/* Telefone */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onCallPress}
        activeOpacity={0.5}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <PhoneIcon color={COLORS.headerText} size={21} />
      </TouchableOpacity>

      {/* Menu ⋮ */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress}
        activeOpacity={0.5}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <MenuIcon color={COLORS.headerText} size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 4,
    paddingVertical: Platform.OS === "ios" ? 7 : 8,
    ...SHADOWS.large,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 10,
    marginLeft: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 15,
    fontWeight: FONTS.bold,
    color: COLORS.headerBg,
  },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.headerBg,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 4,
  },
  title: {
    fontSize: FONTS.headerTitle,
    fontWeight: FONTS.semibold,
    color: COLORS.headerText,
  },
  subtitle: {
    fontSize: FONTS.subtitle,
    color: COLORS.headerStatus,
    marginTop: 1,
  },
  subtitleTyping: {
    color: COLORS.headerStatus,
    fontStyle: "italic",
  },
});
