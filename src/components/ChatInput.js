/**
 * ChatInput - Barra de composição estilo WhatsApp.
 * [ + ] [ 😊  campo de texto  📷 ] [ 🎙 / enviar ]
 * Preserva as props onSend/disabled e a lógica de envio existente.
 */
import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard,
  Platform,
} from "react-native";
import { COLORS, RADIUS, SHADOWS } from "../utils/theme";
import { PlusIcon, SmileIcon, CameraIcon, MicIcon } from "./Icons";

export default function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState("");
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const isSendable = text.trim().length > 0 && !disabled;

  const handleSend = () => {
    if (!isSendable) return;

    // Animação de pulso no botão
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    onSend(text.trim());
    setText("");
    Keyboard.dismiss();
  };

  const sendColor = isSendable ? COLORS.sendActive : COLORS.sendInactive;

  return (
    <View style={styles.container}>
      {/* Botão "+" */}
      <TouchableOpacity
        style={styles.plusButton}
        activeOpacity={0.4}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <PlusIcon color={COLORS.inputIcon} size={27} />
      </TouchableOpacity>

      {/* Campo arredondado com emoji e câmara dentro */}
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.emojiInside} activeOpacity={0.4}>
          <SmileIcon color={COLORS.inputIcon} size={24} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Mensagem"
          placeholderTextColor={COLORS.textLight}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={2000}
          editable={!disabled}
          returnKeyType="send"
          blurOnSubmit={true}
          onSubmitEditing={handleSend}
        />

        <TouchableOpacity style={styles.cameraInside} activeOpacity={0.4}>
          <CameraIcon color={COLORS.inputIcon} size={22} />
        </TouchableOpacity>
      </View>

      {/* Microfone (vazio) ou Enviar (com texto) */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {isSendable ? (
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: sendColor }]}
            onPress={handleSend}
            disabled={!isSendable}
            activeOpacity={0.6}
          >
            <SendIcon color={COLORS.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.micButton} activeOpacity={0.4}>
            <MicIcon color={COLORS.inputIcon} size={24} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

/**
 * Ícone de envio (seta para cima) construído com Views.
 */
function SendIcon({ color }) {
  return (
    <View style={iconStyles.container}>
      <View style={[iconStyles.arrow, { borderBottomColor: color }]} />
      <View style={[iconStyles.stem, { backgroundColor: color }]} />
    </View>
  );
}

const iconStyles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "absolute",
    top: -2,
  },
  stem: {
    width: 3,
    height: 13,
    borderRadius: 2,
    position: "absolute",
    bottom: 1,
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 6,
    paddingVertical: 7,
    backgroundColor: COLORS.inputBar,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.inputBorder,
    paddingBottom: Platform.OS === "ios" ? 8 : 7,
  },
  plusButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.xl,
    paddingLeft: 6,
    paddingRight: 6,
    paddingVertical: 2,
    marginHorizontal: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.inputBorder,
  },
  emojiInside: {
    width: 34,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraInside: {
    width: 34,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 15.5,
    maxHeight: 120,
    paddingVertical: 8,
    color: COLORS.textPrimary,
    paddingHorizontal: 4,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
});
