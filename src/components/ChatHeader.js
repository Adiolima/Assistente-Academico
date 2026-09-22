import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

import { COLORS, FONTS } from "../utils/theme";
import {
  BackIcon,
  PhoneIcon,
  VideoIcon,
  MenuIcon,
} from "./Icons";

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
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        activeOpacity={0.6}
      >
        <BackIcon color="#FFFFFF" size={24} />
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>CE</Text>
        </View>

        {isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.identity}>
        <Text style={styles.name} numberOfLines={1}>
          Colégio Estrela do Saber
        </Text>

        <Text style={styles.status} numberOfLines={1}>
          {isTyping ? "a escrever..." : "online"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onVideoPress}
        activeOpacity={0.6}
      >
        <VideoIcon color="#FFFFFF" size={22} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onCallPress}
        activeOpacity={0.6}
      >
        <PhoneIcon color="#FFFFFF" size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={onMenuPress}
        activeOpacity={0.6}
      >
        <MenuIcon color="#FFFFFF" size={23} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === "ios" ? 58 : 56,
    backgroundColor: "#075E54",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
  },

  backButton: {
    width: 38,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarContainer: {
    width: 40,
    height: 40,
    marginLeft: 1,
    marginRight: 9,
    position: "relative",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#075E54",
  },

  onlineDot: {
    position: "absolute",
    right: -1,
    bottom: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#25D366",
    borderWidth: 2,
    borderColor: "#075E54",
  },

  identity: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    maxWidth: "100%",
  },

  status: {
    color: "#D7F2ED",
    fontSize: 12,
    marginTop: 1,
  },

  actionButton: {
    width: 42,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  menuButton: {
    width: 36,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});