import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../utils/theme";
import {
  ChatTabIcon,
  StatusTabIcon,
  CommunitiesTabIcon,
  CallsTabIcon,
} from "./Icons";

const TABS = [
  { id: "chats", label: "Conversas", Icon: ChatTabIcon },
  { id: "updates", label: "Atualizações", Icon: StatusTabIcon },
  { id: "communities", label: "Comunidades", Icon: CommunitiesTabIcon },
  { id: "calls", label: "Chamadas", Icon: CallsTabIcon },
];

export default function BottomTabs({ active, onChange, unreadChats = 1 }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        { paddingBottom: Math.max(insets.bottom, Platform.OS === "ios" ? 8 : 6) },
      ]}
    >
      {TABS.map((tab) => {
        const color = active === tab.id ? COLORS.tabActive : COLORS.tabInactive;
        const Icon = tab.Icon;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.item}
            onPress={() => onChange(tab.id)}
            activeOpacity={0.7}
          >
            <View>
              <Icon color={color} size={24} />
              {tab.id === "chats" && unreadChats > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadChats}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: COLORS.tabBar,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    paddingTop: 6,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  label: {
    fontSize: FONTS.tabLabel,
    fontWeight: "500",
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.unreadBadge,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
});
