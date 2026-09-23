import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Avatar({
  text = "?",
  color = "#00A884",
  size = 50,
  online = false,
}) {
  const fontSize = Math.max(11, Math.round(size * 0.36));

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      >
        <Text style={[styles.label, { fontSize }]}>{text}</Text>
      </View>
      {online ? (
        <View
          style={[
            styles.dot,
            {
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: size * 0.14,
              borderWidth: size > 36 ? 2 : 1.5,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "700",
    includeFontPadding: false,
  },
  dot: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#25D366",
    borderColor: "#FFFFFF",
  },
});
