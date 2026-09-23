/**
 * Paleta e tokens visuais do WhatsApp (Android clássico).
 */
export const COLORS = {
  headerBg: "#075E54",
  headerBgDark: "#054C44",
  headerText: "#FFFFFF",
  headerIcon: "#FFFFFF",
  headerStatus: "#B2DFDB",

  accent: "#00A884",
  accentDark: "#008069",
  online: "#25D366",
  unreadBadge: "#25D366",
  fab: "#00A884",

  tabBar: "#FFFFFF",
  tabActive: "#00A884",
  tabInactive: "#54656F",

  screenBg: "#FFFFFF",
  rowDivider: "#F0F2F5",
  searchBg: "#F0F2F5",

  chatBg: "#E5DDD5",
  chatBgPattern: "#D3C6B8",

  userBubble: "#DCF8C6",
  botBubble: "#FFFFFF",

  textPrimary: "#111B21",
  textSecondary: "#667781",
  textLight: "#8696A0",
  textWhite: "#FFFFFF",
  textMeta: "#667781",

  tickRead: "#53BDEB",
  tickDelivered: "#667781",

  inputBg: "#FFFFFF",
  inputBar: "#F0F2F5",
  sendActive: "#00A884",
  inputIcon: "#54656F",

  menuBg: "#FFFFFF",
  menuBorder: "#EEEEEE",
  overlay: "rgba(0,0,0,0.35)",

  dateSeparatorBg: "#E1F2FA",
  dateSeparatorText: "#54656F",
  encryptionBg: "#FEF4C5",
  encryptionText: "#5C4B1F",

  statusRing: "#25D366",
  statusRingUnseen: "#25D366",
  statusRingSeen: "#BFC5CA",
  missedCall: "#F15C6D",
  outgoingCall: "#53BDEB",

  white: "#FFFFFF",
  black: "#000000",
  error: "#E53935",
  success: "#43A047",
};

export const FONTS = {
  headerTitle: 20,
  subtitle: 13,
  messageText: 16,
  timestamp: 11,
  input: 16,
  menuItem: 16,
  dateSeparator: 12.5,
  chatName: 17,
  chatPreview: 14,
  tabLabel: 11,

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
  bubble: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.08,
    shadowRadius: 0.6,
    elevation: 1,
  },
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 6,
  },
};
