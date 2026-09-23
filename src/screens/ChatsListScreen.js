import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import { COLORS } from "../utils/theme";
import { CONTACTS, previewFromMessage } from "../data/contacts";
import { loadMessages } from "../utils/storage";
import GreenHeader from "../components/GreenHeader";
import ChatListItem from "../components/ChatListItem";
import { ArchiveIcon, MessageFabIcon } from "../components/Icons";

const MENU = [
  "Novo grupo",
  "Nova transmissão",
  "Aparelhos ligados",
  "Mensagens temporárias",
  "Definições",
];

const FILTERS = ["Tudo", "Não lidas", "Favoritas", "Grupos"];

export default function ChatsListScreen({ onOpenChat, refreshKey }) {
  const [rows, setRows] = useState(CONTACTS);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filter, setFilter] = useState("Tudo");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const next = await Promise.all(
        CONTACTS.map(async (contact) => {
          const msgs = await loadMessages(contact.id);
          if (!msgs.length) return contact;
          const last = msgs[msgs.length - 1];
          return {
            ...contact,
            preview: previewFromMessage(last),
            timestamp: last.timestamp || contact.timestamp,
            unread: contact.id === "school" ? 0 : contact.unread,
          };
        })
      );
      if (!cancelled) setRows(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((c) => {
      if (filter === "Não lidas" && !(c.unread > 0)) return false;
      if (filter === "Favoritas" && !c.pinned) return false;
      if (filter === "Grupos" && !c.isGroup) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        String(c.preview || "").toLowerCase().includes(q)
      );
    });
  }, [rows, query, filter]);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={COLORS.headerBg} barStyle="light-content" />
      <GreenHeader
        title="WhatsApp"
        searching={searching}
        searchValue={query}
        onSearchChange={setQuery}
        onSearch={() => setSearching(true)}
        onSearchClose={() => {
          setSearching(false);
          setQuery("");
        }}
        onMenu={() => setMenuVisible(true)}
      />

      <View style={styles.filters}>
        {FILTERS.map((item) => {
          const active = filter === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setFilter(item)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem contact={item} onPress={() => onOpenChat(item)} />
        )}
        ListHeaderComponent={
          <TouchableOpacity style={styles.archived} activeOpacity={0.7}>
            <View style={styles.archivedIcon}>
              <ArchiveIcon color={COLORS.textSecondary} size={22} />
            </View>
            <Text style={styles.archivedText}>Arquivadas</Text>
          </TouchableOpacity>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma conversa encontrada</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => onOpenChat(CONTACTS[0])}
      >
        <MessageFabIcon color="#FFFFFF" size={26} />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            {MENU.map((label) => (
              <TouchableOpacity
                key={label}
                style={styles.menuItem}
                onPress={() => setMenuVisible(false)}
                activeOpacity={0.6}
              >
                <Text style={styles.menuLabel}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  filters: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: COLORS.white,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: "#F0F2F5",
  },
  chipActive: {
    backgroundColor: "#D9FDD3",
  },
  chipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#056E4A",
  },
  archived: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  archivedIcon: {
    width: 52,
    alignItems: "center",
  },
  archivedText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  empty: {
    textAlign: "center",
    color: COLORS.textSecondary,
    marginTop: 40,
  },
  listContent: {
    paddingBottom: 88,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 18,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.fab,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-end",
    paddingTop: 48,
    paddingRight: 8,
  },
  menu: {
    backgroundColor: COLORS.white,
    minWidth: 230,
    borderRadius: 4,
    paddingVertical: 8,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  menuItem: {
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  menuLabel: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
});
