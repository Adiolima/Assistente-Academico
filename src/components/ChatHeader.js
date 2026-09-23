import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "../utils/theme";
import { SCHOOL_NAME, SCHOOL_AVATAR_TEXT } from "../config";
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
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top, height: insets.top + 52 },
      ]}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <BackIcon color={COLORS.headerText} size={24} />
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{SCHOOL_AVATAR_TEXT}</Text>
        </View>

        {isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.identity}>
        <Text style={styles.name} numberOfLines={1}>
          {SCHOOL_NAME}
        </Text>

        <Text style={styles.status} numberOfLines={1}>
          {isTyping ? "a escrever..." : "online"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onVideoPress}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
      >
        <VideoIcon color={COLORS.headerText} size={22} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onCallPress}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
      >
        <PhoneIcon color={COLORS.headerText} size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={onMenuPress}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
      >
        <MenuIcon color={COLORS.headerText} size={22} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.headerBg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  backButton: {
    width: 40,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarContainer: {
    width: 40,
    height: 40,
    marginLeft: 2,
    marginRight: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.headerText,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.headerBg,
  },

  onlineDot: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.headerBg,
  },

  identity: {
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
  },

  name: {
    color: COLORS.headerText,
    fontSize: 16,
    fontWeight: "600",
  },

  status: {
    color: "#D7F2ED",
    fontSize: 12,
    marginTop: 1,
  },

  actionButton: {
    width: 40,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  menuButton: {
    width: 38,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});