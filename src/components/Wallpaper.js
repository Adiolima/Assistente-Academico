/**
 * Wallpaper - Fundo bege com padrão discreto de rabiscos de comunicação.
 * Fica atrás da lista de mensagens e não interfere na leitura.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/theme";

// Rabiscos discretos espalhados (símbolos relacionados a comunicação).
const DOODLES = [
  { ch: "✉", x: "5%", y: "4%", r: "-10deg", s: 22, o: 0.12 },
  { ch: "☎", x: "72%", y: "8%", r: "12deg", s: 20, o: 0.10 },
  { ch: "☾", x: "40%", y: "14%", r: "0deg", s: 18, o: 0.08 },
  { ch: "❤", x: "88%", y: "20%", r: "8deg", s: 16, o: 0.08 },
  { ch: "✎", x: "12%", y: "26%", r: "-6deg", s: 18, o: 0.09 },
  { ch: "♪", x: "58%", y: "30%", r: "14deg", s: 17, o: 0.08 },
  { ch: "✉", x: "30%", y: "38%", r: "4deg", s: 20, o: 0.10 },
  { ch: "☎", x: "80%", y: "44%", r: "-12deg", s: 18, o: 0.08 },
  { ch: "✦", x: "8%", y: "52%", r: "0deg", s: 16, o: 0.10 },
  { ch: "☺", x: "50%", y: "56%", r: "6deg", s: 18, o: 0.07 },
  { ch: "✆", x: "90%", y: "62%", r: "10deg", s: 16, o: 0.08 },
  { ch: "❝", x: "20%", y: "68%", r: "-8deg", s: 20, o: 0.08 },
  { ch: "✉", x: "64%", y: "72%", r: "12deg", s: 18, o: 0.09 },
  { ch: "☾", x: "38%", y: "80%", r: "0deg", s: 16, o: 0.08 },
  { ch: "♪", x: "84%", y: "86%", r: "-10deg", s: 17, o: 0.07 },
  { ch: "☎", x: "6%", y: "90%", r: "8deg", s: 18, o: 0.08 },
];

export default function Wallpaper() {
  return (
    <View style={styles.container} pointerEvents="none">
      {DOODLES.map((d, i) => (
        <Text
          key={i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            fontSize: Math.min(d.s, 18),
            color: COLORS.chatBgPattern,
            opacity: Math.min(d.o, 0.12),
            transform: [{ rotate: d.r }],
          }}
        >
          {d.ch}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.chatBg,
  },
});
