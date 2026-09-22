/**
 * Tema centralizado do Assistente Acadêmico.
 * Paleta fiel à linguagem visual do WhatsApp Mobile.
 */
export const COLORS = {
  // Header (verde-escuro WhatsApp)
  headerBg: "#075E54",
  headerBgDark: "#054C44",
  headerText: "#FFFFFF",
  headerBorder: "#0A6B5F",
  headerStatus: "#80CBC4",

  // Status
  online: "#25D366",
  offline: "#FF5252",
  typing: "#A5D6A7",

  // Chat (wallpaper bege)
  chatBg: "#ECE5DD",
  chatBgPattern: "#D6CBBE",
  chatBgPatternSoft: "#DCD2C5",

  // Bolhas
  userBubble: "#DCF8C6",
  userBubbleDark: "#C5E8B0",
  botBubble: "#FFFFFF",
  botBubbleBorder: "#E8E8E8",

  // Texto
  textPrimary: "#1F1F1F",
  textSecondary: "#667781",
  textLight: "#9AA7AD",
  textWhite: "#FFFFFF",

  // Ticks de entrega/leitura
  tickRead: "#53BDEB",
  tickDelivered: "#667781",

  // Input
  inputBg: "#FFFFFF",
  inputBorder: "#E0E0E0",
  inputBar: "#F0EEE9",
  sendActive: "#00A884",
  sendInactive: "#90A4AE",
  inputIcon: "#54656F",

  // Menu
  menuBg: "#FFFFFF",
  menuItemHover: "#F5F5F5",
  menuBorder: "#EEEEEE",
  overlay: "rgba(0,0,0,0.4)",

  // Quick replies
  quickReplyBg: "#FFFFFF",
  quickReplyBorder: "#E0E0E0",
  quickReplyText: "#075E54",

  // Separadores / avisos
  dateSeparatorBg: "#FFFFFF",
  dateSeparatorText: "#667781",
  encryptionBg: "#FFF3C4",
  encryptionText: "#5E5E5E",

  // Documentos
  pdfRed: "#F44336",
  pdfRedDark: "#D32F2F",

  // Geral
  white: "#FFFFFF",
  black: "#000000",
  error: "#E53935",
  success: "#43A047",
  warning: "#FB8C00",
};

export const FONTS = {
  // Tamanhos
  headerTitle: 17,
  subtitle: 13,
  messageText: 15.5,
  timestamp: 10.5,
  input: 16,
  quickReply: 14,
  menuItem: 15,
  dateSeparator: 12.5,

  // Pesos
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 22,
  round: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
};
