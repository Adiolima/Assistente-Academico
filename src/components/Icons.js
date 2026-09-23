/**
 * Icons - Ícones lineares reutilizáveis construídos com Views/texto.
 * Não depende de bibliotecas externas; mantém o visual limpo do WhatsApp.
 */
import React from "react";
import { View, Text } from "react-native";

/* ------------------------------------------------------------------ */
/* Glifos de texto (monocromáticos e nítidos)                          */
/* ------------------------------------------------------------------ */

function Glyph({ char, size = 24, color = "#54656F", weight = "600" }) {
  return (
    <Text
      style={{
        fontSize: size,
        lineHeight: Math.round(size * 1.2),
        color,
        fontWeight: weight,
        textAlign: "center",
        includeFontPadding: false,
      }}
    >
      {char}
    </Text>
  );
}

/** Seta/chevron de voltar. */
export function BackIcon({ color = "#FFFFFF", size = 26 }) {
  return <Glyph char="❮" size={size} color={color} weight="600" />;
}

/** Telefone (handset). */
export function PhoneIcon({ color = "#FFFFFF", size = 21 }) {
  return <Glyph char="☎" size={size} color={color} weight="600" />;
}

/** Menu de três pontos verticais. */
export function MenuIcon({ color = "#FFFFFF", size = 24 }) {
  return <Glyph char="⋮" size={size} color={color} weight="700" />;
}

/** Botão "+" de anexo. */
export function PlusIcon({ color = "#54656F", size = 26 }) {
  return <Glyph char="+" size={size} color={color} weight="400" />;
}

/** Ícone de emoji (rosto sorridente). */
export function SmileIcon({ color = "#54656F", size = 24 }) {
  return <Glyph char="☺" size={size} color={color} weight="600" />;
}

/* ------------------------------------------------------------------ */
/* Ícones em Views (vídeo, câmara, microfone, cadeado, PDF, ticks)      */
/* ------------------------------------------------------------------ */

function IconWrap({ size = 24, children }) {
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

/** Chamada de vídeo: retângulo arredondado + lente triangular. */
export function VideoIcon({ color = "#FFFFFF", size = 24 }) {
  const t = 2;
  return (
    <IconWrap size={size}>
      <View
        style={{
          width: size * 0.62,
          height: size * 0.42,
          borderRadius: 2,
          borderWidth: t,
          borderColor: color,
        }}
      >
        <View
          style={{
            position: "absolute",
            right: -size * 0.16,
            top: size * 0.08,
            width: 0,
            height: 0,
            borderTopWidth: size * 0.11,
            borderBottomWidth: size * 0.11,
            borderRightWidth: size * 0.16,
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            borderRightColor: color,
          }}
        />
      </View>
    </IconWrap>
  );
}

/** Câmara fotográfica. */
export function CameraIcon({ color = "#54656F", size = 24 }) {
  const t = 2;
  return (
    <IconWrap size={size}>
      <View
        style={{
          position: "absolute",
          top: size * 0.04,
          left: size * 0.2,
          width: size * 0.2,
          height: size * 0.2,
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
          width: size * 0.8,
          height: size * 0.54,
          borderRadius: 3,
          borderWidth: t,
          borderColor: color,
          marginTop: size * 0.2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: size * 0.18,
            height: size * 0.18,
            borderRadius: size * 0.09,
            borderWidth: t,
            borderColor: color,
          }}
        />
      </View>
    </IconWrap>
  );
}

/** Microfone. */
export function MicIcon({ color = "#54656F", size = 24 }) {
  const t = 2;
  return (
    <IconWrap size={size}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: size * 0.28,
            height: size * 0.46,
            borderRadius: size * 0.14,
            borderWidth: t,
            borderColor: color,
          }}
        />
        <View
          style={{
            width: size * 0.4,
            height: size * 0.26,
            marginTop: 2,
            borderLeftWidth: t,
            borderRightWidth: t,
            borderBottomWidth: t,
            borderColor: color,
            borderBottomLeftRadius: size * 0.2,
            borderBottomRightRadius: size * 0.2,
          }}
        />
        <View style={{ width: t, height: size * 0.1, backgroundColor: color }} />
      </View>
    </IconWrap>
  );
}

/** Cadeado (aviso de criptografia). */
export function LockIcon({ color = "#7A7A7A", size = 16 }) {
  const t = 1.6;
  return (
    <IconWrap size={size}>
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
    </IconWrap>
  );
}

/** Informação (i dentro de círculo) para avisos discretos. */
export function InfoIcon({ color = "#667781", size = 16 }) {
  return (
    <IconWrap size={size}>
      <View
        style={{
          width: size * 0.9,
          height: size * 0.9,
          borderRadius: size * 0.45,
          borderWidth: 1.5,
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
    </IconWrap>
  );
}

/** Ticks de entrega/leitura (✓ simples ou ✓✓). */
export function TickIcon({ color = "#667781", double = true, size = 16 }) {
  const check = (key, extraStyle) => (
    <View
      key={key}
      style={[
        {
          width: size * 0.5,
          height: size * 0.3,
          borderRightWidth: 1.6,
          borderBottomWidth: 1.6,
          borderColor: color,
          transform: [{ rotate: "45deg" }],
          marginTop: size * 0.16,
        },
        extraStyle,
      ]}
    />
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      {check("a")}
      {double && check("b", { marginLeft: -size * 0.22 })}
    </View>
  );
}

/** Ícone vermelho de PDF com rótulo "PDF". */
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
        overflow: "hidden",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderTopWidth: 9,
          borderLeftWidth: 9,
          borderTopColor: "#B71C1C",
          borderLeftColor: "transparent",
        }}
      />
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: size * 0.28,
          fontWeight: "700",
          letterSpacing: 0.2,
        }}
      >
        PDF
      </Text>
    </View>
  );
}
