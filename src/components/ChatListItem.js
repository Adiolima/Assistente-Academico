import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../utils/theme";
import Avatar from "./Avatar";
import { TickIcon } from "./Icons";

function formatListTime(ts) {
  if (!ts) return "";
  const date = new Date(ts);
  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  if (sameDay) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  }
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  ) {
    return "Ontem";
  }
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

export default function ChatListItem({ contact, onPress }) {
  const unread = contact.unread > 0;
  const outgoing = String(contact.preview || "").startsWith("Você:");

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.65}>
      <Avatar
        text={contact.avatarText}
        color={contact.avatarColor}
        size={52}
      />
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.name} numberOfLines={1}>
            {contact.name}
          </Text>
          <Text style={[styles.time, unread && styles.timeUnread]}>
            {formatListTime(contact.timestamp)}
          </Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.previewRow}>
            {outgoing ? (
              <View style={styles.ticks}>
                <TickIcon color={COLORS.tickRead} double size={13} />
              </View>
            ) : null}
            <Text
              style={[styles.preview, unread && styles.previewUnread]}
              numberOfLines={1}
            >
              {contact.preview}
            </Text>
          </View>
          {unread ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{contact.unread}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  body: {
    flex: 1,
    marginLeft: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.rowDivider,
    paddingBottom: 12,
    minHeight: 52,
    justifyContent: "center",
  },
  top: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 10,
  },
  name: {
    flex: 1,
    fontSize: FONTS.chatName,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  time: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  timeUnread: {
    color: COLORS.unreadBadge,
    fontWeight: "600",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 8,
  },
  previewRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  ticks: {
    marginRight: 4,
  },
  preview: {
    flex: 1,
    fontSize: FONTS.chatPreview,
    color: COLORS.textSecondary,
  },
  previewUnread: {
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.unreadBadge,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
