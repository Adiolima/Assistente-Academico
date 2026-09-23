import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../utils/theme";
import { CameraIcon, SearchIcon, MenuIcon, BackIcon } from "./Icons";

export default function GreenHeader({
  title = "WhatsApp",
  onCamera,
  onSearch,
  onMenu,
  searching = false,
  searchValue = "",
  onSearchChange,
  onSearchClose,
  rightExtra = null,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      {searching ? (
        <View style={styles.row}>
          <TouchableOpacity style={styles.iconBtn} onPress={onSearchClose} activeOpacity={0.7}>
            <BackIcon color={COLORS.headerText} size={22} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            value={searchValue}
            onChangeText={onSearchChange}
            placeholder="Procurar..."
            placeholderTextColor="rgba(255,255,255,0.65)"
            autoFocus
            selectionColor="#FFFFFF"
          />
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.actions}>
            {rightExtra}
            <TouchableOpacity style={styles.iconBtn} onPress={onCamera} activeOpacity={0.7}>
              <CameraIcon color={COLORS.headerText} size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={onSearch} activeOpacity={0.7}>
              <SearchIcon color={COLORS.headerText} size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={onMenu} activeOpacity={0.7}>
              <MenuIcon color={COLORS.headerText} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.headerBg,
  },
  row: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 4,
  },
  title: {
    flex: 1,
    color: COLORS.headerText,
    fontSize: FONTS.headerTitle,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    width: 42,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 17,
    paddingRight: 12,
  },
});
