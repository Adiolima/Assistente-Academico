import { SCHOOL_NAME, SCHOOL_AVATAR_TEXT } from "../config";

const now = Date.now();
const minutes = (n) => new Date(now - n * 60 * 1000).toISOString();
const hours = (n) => new Date(now - n * 60 * 60 * 1000).toISOString();
const days = (n) => new Date(now - n * 24 * 60 * 60 * 1000).toISOString();

export const CONTACTS = [
  {
    id: "school",
    name: SCHOOL_NAME,
    avatarText: SCHOOL_AVATAR_TEXT,
    avatarColor: "#00A884",
    preview: "Como posso ajudar hoje?",
    timestamp: minutes(2),
    unread: 1,
    pinned: true,
    live: true,
    status: "online",
    about: "Assistente oficial da escola",
  },
  {
    id: "secretaria",
    name: "Secretaria Académica",
    avatarText: "SA",
    avatarColor: "#53BDEB",
    preview: "Os comprovativos devem ser entregues até sexta.",
    timestamp: minutes(38),
    unread: 2,
    live: false,
    status: "visto por último hoje às 09:14",
    about: "Matrículas, declarações e horários",
    seed: [
      {
        id: "sa-1",
        role: "assistant",
        content:
          "Bom dia. A secretaria atende de segunda a sexta, das 07h00 às 17h30.",
        timestamp: hours(5),
      },
      {
        id: "sa-2",
        role: "user",
        content: "Preciso de uma declaração de matrícula.",
        timestamp: hours(4),
      },
      {
        id: "sa-3",
        role: "assistant",
        content:
          "Pode levantar na secretaria com o BI do encarregado. Os comprovativos devem ser entregues até sexta.",
        timestamp: minutes(38),
      },
    ],
  },
  {
    id: "pais",
    name: "Pais e Encarregados",
    avatarText: "PE",
    avatarColor: "#FFA726",
    preview: "Maria: Confirmado, estaremos presentes.",
    timestamp: hours(1),
    unread: 0,
    isGroup: true,
    live: false,
    status: "clique para info. do grupo",
    about: "Grupo da escola",
    seed: [
      {
        id: "pe-1",
        role: "assistant",
        senderName: "Coordenação",
        senderColor: "#02A698",
        content:
          "Reunião de pais na quinta-feira, às 16h00, no auditório.",
        timestamp: hours(3),
      },
      {
        id: "pe-2",
        role: "assistant",
        senderName: "Sr. Manuel",
        senderColor: "#53BDEB",
        content: "Obrigado pelo aviso. O tema é avaliação do 2.º trimestre?",
        timestamp: hours(2),
      },
      {
        id: "pe-3",
        role: "assistant",
        senderName: "Maria",
        senderColor: "#E91E63",
        content: "Confirmado, estaremos presentes.",
        timestamp: hours(1),
      },
    ],
  },
  {
    id: "tesouraria",
    name: "Tesouraria",
    avatarText: "TS",
    avatarColor: "#7C4DFF",
    preview: "Propina de Setembro: 45.000 Kz",
    timestamp: hours(6),
    unread: 0,
    live: false,
    status: "visto por último ontem às 17:02",
    about: "Propinas e pagamentos",
    seed: [
      {
        id: "ts-1",
        role: "assistant",
        content:
          "Propina de Setembro: 45.000 Kz. IBAN enviado pela secretaria. Envie o comprovativo após o pagamento.",
        timestamp: hours(6),
      },
    ],
  },
  {
    id: "coordenacao",
    name: "Coordenação Pedagógica",
    avatarText: "CP",
    avatarColor: "#00897B",
    preview: "Você: Bom dia, professora.",
    timestamp: days(1),
    unread: 0,
    live: false,
    status: "visto por último ontem às 18:40",
    about: "Acompanhamento pedagógico",
    seed: [
      {
        id: "cp-1",
        role: "user",
        content: "Bom dia, professora.",
        timestamp: days(1),
      },
    ],
  },
  {
    id: "biblioteca",
    name: "Biblioteca",
    avatarText: "BB",
    avatarColor: "#5C6BC0",
    preview: "O prazo de devolução é 15 dias.",
    timestamp: days(2),
    unread: 0,
    live: false,
    status: "visto por último 20/09/2026",
    about: "Empréstimo de livros",
    seed: [
      {
        id: "bb-1",
        role: "assistant",
        content:
          "O prazo de devolução é 15 dias. Renovações são feitas no balcão da biblioteca.",
        timestamp: days(2),
      },
    ],
  },
  {
    id: "transporte",
    name: "Transporte Escolar",
    avatarText: "TE",
    avatarColor: "#26A69A",
    preview: "Saída da Ingombota às 06:40.",
    timestamp: days(3),
    unread: 0,
    live: false,
    status: "visto por último 18/09/2026",
    about: "Rotas e horários",
    seed: [
      {
        id: "te-1",
        role: "assistant",
        content: "Saída da Ingombota às 06:40. Chegada prevista às 07:20.",
        timestamp: days(3),
      },
    ],
  },
];

export function getContact(id) {
  return CONTACTS.find((c) => c.id === id) || CONTACTS[0];
}

export function previewFromMessage(msg) {
  if (!msg) return "";
  const text = String(msg.content || "").replace(/\s+/g, " ").trim();
  const prefix =
    msg.role === "user"
      ? "Você: "
      : msg.senderName
        ? `${msg.senderName}: `
        : "";
  return (prefix + text).slice(0, 64);
}
