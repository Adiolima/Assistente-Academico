/**
 * TypingIndicator - Bolha de "digitando..." com animação de 3 pontos.
 * Simula o comportamento do WhatsApp: pontos saltam em sequência contínua.
 */
import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
export default function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = (dot) =>
      Animated.sequence([
        Animated.timing(dot, {
          toValue: -6,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]);

    const animation = Animated.loop(
      Animated.stagger(180, [bounce(dot1), bounce(dot2), bounce(dot3)])
    );

    animation.start();

    return () => animation.stop();
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarSlot}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>CE</Text>
        </View>
      </View>
      <View style={styles.bubble}>
        <View style={styles.dotsRow}>
          <Animated.View
            style={[styles.dot, { transform: [{ translateY: dot1 }] }]}
          />
          <Animated.View
            style={[styles.dot, { transform: [{ translateY: dot2 }] }]}
          />
          <Animated.View
            style={[styles.dot, { transform: [{ translateY: dot3 }] }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  avatarSlot: {
    width: 28,
    marginRight: 6,
    justifyContent: "flex-end",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#075E54",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  bubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderTopLeftRadius: 2,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 1,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#90A4AE",
  },
});
