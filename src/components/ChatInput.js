import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, SHADOWS } from "../utils/theme";
import {
  PlusIcon,
  SmileIcon,
  CameraIcon,
  MicIcon,
} from "./Icons";

export default function ChatInput({
  onSend,
  disabled = false,
}) {
  const [text, setText] = useState("");
  const scale = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();

  const sendable = text.trim().length > 0 && !disabled;

  const send = () => {
    if (!sendable) return;

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.85,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 110,
        useNativeDriver: true,
      }),
    ]).start();

    const message = text.trim();

    onSend(message);
    setText("");
    Keyboard.dismiss();
  };

  return (
    <View
      style={[
        styles.bar,
        { paddingBottom: (Platform.OS === "ios" ? 7 : 6) + insets.bottom },
      ]}
    >
      <TouchableOpacity
        style={styles.plusButton}
        activeOpacity={0.6}
      >
        <PlusIcon
          color="#54656F"
          size={27}
        />
      </TouchableOpacity>

      <View style={styles.composer}>
        <TouchableOpacity
          style={styles.composerIcon}
          activeOpacity={0.6}
        >
          <SmileIcon
            color="#54656F"
            size={23}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Escrever mensagem"
          placeholderTextColor="#667781"
          multiline
          maxLength={2000}
          editable={!disabled}
          returnKeyType="send"
          blurOnSubmit
          onSubmitEditing={send}
        />

        <TouchableOpacity
          style={styles.composerIcon}
          activeOpacity={0.6}
        >
          <CameraIcon
            color="#54656F"
            size={21}
          />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={{
          transform: [{ scale }],
        }}
      >
        {sendable ? (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={send}
            activeOpacity={0.7}
          >
            <View style={styles.sendArrow}>
              <View style={styles.sendStem} />
              <View style={styles.sendHead} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.micButton}
            activeOpacity={0.6}
          >
            <MicIcon
              color="#54656F"
              size={23}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 5,
    paddingTop: 5,
    backgroundColor: COLORS.inputBar,
  },

  plusButton: {
    width: 42,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  composer: {
    flex: 1,
    minHeight: 42,
    maxHeight: 118,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: COLORS.inputBg,
    borderRadius: 21,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 4,
  },

  composerIcon: {
    width: 36,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 110,
    paddingHorizontal: 3,
    paddingVertical: Platform.OS === "ios" ? 9 : 8,
    color: "#111B21",
    fontSize: 16,
  },

  micButton: {
    width: 42,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.sendActive,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.small,
  },

  sendArrow: {
    width: 21,
    height: 21,
    transform: [{ rotate: "-45deg" }],
    alignItems: "center",
    justifyContent: "center",
  },

  sendStem: {
    width: 3,
    height: 15,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 1,
  },

  sendHead: {
    width: 10,
    height: 10,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#FFFFFF",
    position: "absolute",
    top: 1,
    right: 1,
  },
});