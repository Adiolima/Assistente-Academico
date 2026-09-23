/**
 * Ícones geométricos no estilo WhatsApp, sem bibliotecas extra.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Wrap({ size = 24, children }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
}

export function BackIcon({ color = "#FFFFFF", size = 22 }) {
  return (
    <Wrap size={size}>
      <View
        style={{
          width: size * 0.46,
          height: size * 0.46,
          borderLeftWidth: 2.4,
          borderBottomWidth: 2.4,
          borderColor: color,
          transform: [{ rotate: "45deg" }],
          marginLeft: size * 0.16,
        }}
      />
    </Wrap>
  );
}

export function MenuIcon({ color = "#FFFFFF", size = 22 }) {
  return (
    <Wrap size={size}>
      <View style={{ alignItems: "center", justifyContent: "space-between", height: size * 0.55 }}>
        <View style={[dot(color, size)]} />
        <View style={[dot(color, size)]} />
        <View style={[dot(color, size)]} />
      </View>
    </Wrap>
  );
}

function dot(color, size) {
  const d = Math.max(3.2, size * 0.16);
  return {
    width: d,
    height: d,
    borderRadius: d / 2,
    backgroundColor: color,
  };
}

export function SearchIcon({ color = "#FFFFFF", size = 22 }) {
  const r = size * 0.42;
  return (
    <Wrap size={size}>
      <View style={{ width: size, height: size }}>
        <View
          style={{
            position: "absolute",
            left: size * 0.12,
            top: size * 0.1,
            width: r,
            height: r,
            borderRadius: r / 2,
            borderWidth: 2,
            borderColor: color,
          }}
        />
        <View
          style={{
            position: "absolute",
            right: size * 0.12,
            bottom: size * 0.14,
            width: size * 0.34,
            height: 2,
            backgroundColor: color,
            borderRadius: 1,
            transform: [{ rotate: "45deg" }],
          }}
        />
      </View>
    </Wrap>
  );
}

export function CameraIcon({ color = "#FFFFFF", size = 22 }) {
  const t = 2;
  return (
    <Wrap size={size}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: size * 0.22,
            height: size * 0.14,
            borderTopWidth: t,
            borderLeftWidth: t,
            borderRightWidth: t,
            borderColor: color,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <View
          style={{
            width: size * 0.78,
            height: size * 0.52,
            borderRadius: 3,
            borderWidth: t,
            borderColor: color,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: size * 0.22,
              height: size * 0.22,
              borderRadius: size * 0.11,
              borderWidth: t,
              borderColor: color,
            }}
          />
        </View>
      </View>
    </Wrap>
  );
}

export function PhoneIcon({ color = "#FFFFFF", size = 20 }) {
  return (
    <Wrap size={size}>
      <View
        style={{
          width: size * 0.42,
          height: size * 0.72,
          borderRadius: size * 0.12,
          borderWidth: 2,
          borderColor: color,
          transform: [{ rotate: "-35deg" }],
        }}
      />
    </Wrap>
  );
}

export function VideoIcon({ color = "#FFFFFF", size = 22 }) {
  return (
    <Wrap size={size}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: size * 0.52,
            height: size * 0.4,
            borderRadius: 3,
            borderWidth: 2,
            borderColor: color,
          }}
        />
        <View
          style={{
            width: 0,
            height: 0,
            marginLeft: 1,
            borderTopWidth: size * 0.12,
            borderBottomWidth: size * 0.12,
            borderLeftWidth: size * 0.18,
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: color,
          }}
        />
      </View>
    </Wrap>
  );
}

export function PlusIcon({ color = "#54656F", size = 26 }) {
  return (
    <Wrap size={size}>
      <View style={{ width: size * 0.7, height: size * 0.7, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            position: "absolute",
            width: size * 0.62,
            height: 2.2,
            backgroundColor: color,
            borderRadius: 1,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 2.2,
            height: size * 0.62,
            backgroundColor: color,
            borderRadius: 1,
          }}
        />
      </View>
    </Wrap>
  );
}

export function SmileIcon({ color = "#54656F", size = 22 }) {
  return (
    <Wrap size={size}>
      <View
        style={{
          width: size * 0.86,
          height: size * 0.86,
          borderRadius: size * 0.43,
          borderWidth: 2,
          borderColor: color,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: size * 0.16,
        }}
      >
        <View
          style={{
            width: size * 0.38,
            height: size * 0.18,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: color,
            borderBottomLeftRadius: size * 0.2,
            borderBottomRightRadius: size * 0.2,
          }}
        />
      </View>
    </Wrap>
  );
}

export function MicIcon({ color = "#54656F", size = 22 }) {
  const t = 2;
  return (
    <Wrap size={size}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: size * 0.28,
            height: size * 0.42,
            borderRadius: size * 0.14,
            borderWidth: t,
            borderColor: color,
          }}
        />
        <View
          style={{
            width: size * 0.5,
            height: size * 0.22,
            marginTop: 1,
            borderLeftWidth: t,
            borderRightWidth: t,
            borderBottomWidth: t,
            borderColor: color,
            borderBottomLeftRadius: size * 0.22,
            borderBottomRightRadius: size * 0.22,
          }}
        />
        <View style={{ width: t, height: size * 0.1, backgroundColor: color }} />
      </View>
    </Wrap>
  );
}

export function SendIcon({ color = "#FFFFFF", size = 20 }) {
  return (
    <Wrap size={size}>
      <View
        style={{
          width: 0,
          height: 0,
          borderTopWidth: size * 0.22,
          borderBottomWidth: size * 0.22,
          borderLeftWidth: size * 0.4,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: color,
          transform: [{ rotate: "-15deg" }, { translateX: 1 }],
        }}
      />
    </Wrap>
  );
}

export function LockIcon({ color = "#7A7A7A", size = 14 }) {
  const t = 1.6;
  return (
    <Wrap size={size}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: size * 0.42,
            height: size * 0.3,
            borderTopWidth: t,
            borderLeftWidth: t,
            borderRightWidth: t,
            borderColor: color,
            borderTopLeftRadius: size * 0.21,
            borderTopRightRadius: size * 0.21,
          }}
        />
        <View
          style={{
            width: size * 0.58,
            height: size * 0.4,
            borderRadius: 2,
            backgroundColor: color,
          }}
        />
      </View>
    </Wrap>
  );
}

/** Informação (i dentro de círculo) para avisos discretos. */
export function InfoIcon({ color = "#667781", size = 16 }) {
  return (
    <Wrap size={size}>
      <View
        style={{
          width: size * 0.9,
          height: size * 0.9,
          borderRadius: size * 0.45,
          borderWidth: 1.6,
          borderColor: color,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color,
            fontSize: size * 0.6,
            fontWeight: "700",
            lineHeight: size * 0.7,
            includeFontPadding: false,
          }}
        >
          i
        </Text>
      </View>
    </Wrap>
  );
}

export function TickIcon({ color = "#667781", double = true, size = 14 }) {
  const check = (key, extra) => (
    <View
      key={key}
      style={[
        {
          width: size * 0.42,
          height: size * 0.24,
          borderRightWidth: 1.7,
          borderBottomWidth: 1.7,
          borderColor: color,
          transform: [{ rotate: "45deg" }],
          marginTop: size * 0.12,
        },
        extra,
      ]}
    />
  );
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      {check("a")}
      {double ? check("b", { marginLeft: -size * 0.2 }) : null}
    </View>
  );
}

export function ChatTabIcon({ color = "#54656F", size = 24 }) {
  return (
    <Wrap size={size}>
      <View
        style={{
          width: size * 0.78,
          height: size * 0.58,
          borderRadius: size * 0.16,
          borderWidth: 2,
          borderColor: color,
        }}
      />
    </Wrap>
  );
}

export function StatusTabIcon({ color = "#54656F", size = 24 }) {
  return (
    <Wrap size={size}>
      <View
        style={{
          width: size * 0.72,
          height: size * 0.72,
          borderRadius: size * 0.36,
          borderWidth: 2.2,
          borderColor: color,
          borderStyle: "dashed",
        }}
      />
    </Wrap>
  );
}

export function CommunitiesTabIcon({ color = "#54656F", size = 24 }) {
  const c = (left) => (
    <View
      key={left}
      style={{
        width: size * 0.34,
        height: size * 0.34,
        borderRadius: size * 0.17,
        borderWidth: 2,
        borderColor: color,
        marginLeft: left ? -size * 0.1 : 0,
      }}
    />
  );
  return (
    <Wrap size={size}>
      <View style={{ flexDirection: "row" }}>{c(false)}{c(true)}</View>
    </Wrap>
  );
}

export function CallsTabIcon({ color = "#54656F", size = 24 }) {
  return <PhoneIcon color={color} size={size * 0.9} />;
}

export function ArchiveIcon({ color = "#54656F", size = 22 }) {
  return (
    <Wrap size={size}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: size * 0.78,
            height: size * 0.22,
            borderRadius: 2,
            borderWidth: 2,
            borderColor: color,
          }}
        />
        <View
          style={{
            width: size * 0.64,
            height: size * 0.4,
            marginTop: 2,
            borderWidth: 2,
            borderTopWidth: 0,
            borderColor: color,
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
          }}
        />
      </View>
    </Wrap>
  );
}

export function MessageFabIcon({ color = "#FFFFFF", size = 24 }) {
  return (
    <Wrap size={size}>
      <View
        style={{
          width: size * 0.72,
          height: size * 0.54,
          borderRadius: 5,
          backgroundColor: color,
        }}
      />
    </Wrap>
  );
}

export function CallArrowIcon({ incoming = true, missed = false, size = 14 }) {
  const color = missed ? "#F15C6D" : "#00A884";
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          color,
          fontSize: size,
          fontWeight: "700",
          transform: [{ rotate: incoming ? "45deg" : "-135deg" }],
        }}
      >
        ↙
      </Text>
    </View>
  );
}

export function PdfIcon({ size = 36 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 5,
        backgroundColor: "#F44336",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#FFFFFF", fontSize: size * 0.28, fontWeight: "700" }}>
        PDF
      </Text>
    </View>
  );
}

export const iconStyles = StyleSheet.create({});
