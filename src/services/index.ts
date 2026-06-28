/**
 * Service interfaces. Currently backed by mock data.
 * Swap implementations with FastAPI / Socket.IO calls later — UI stays unchanged.
 */
import type {
  AppNotification,
  ChatMessage,
  EventTemplate,
  Room,
  ShoppingItem,
} from "@/types";
import {
  chatMessages,
  notifications,
  rooms,
  shoppingItems,
  templates,
} from "@/mock/data";

const delay = <T,>(value: T, ms = 120) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export const RoomService = {
  list: () => delay(rooms),
  get: (id: string) => delay(rooms.find((r) => r.id === id) ?? null),
  itemsFor: (roomId: string) =>
    delay(shoppingItems.filter((i) => i.roomId === roomId)),
};

export const ChatService = {
  messagesFor: (roomId: string) =>
    delay(chatMessages.filter((m) => m.roomId === roomId)),
};

export const NotificationService = {
  list: () => delay(notifications),
  unreadCount: () => delay(notifications.filter((n) => !n.read).length),
};

export const TemplateService = {
  list: () => delay(templates),
};

export const AnalyticsService = {
  summary: () =>
    delay({
      activeRooms: rooms.filter((r) => r.status === "active").length,
      totalBudget: rooms.reduce((s, r) => s + r.budget, 0),
      totalSpent: rooms.reduce((s, r) => s + r.spent, 0),
      collaborators: new Set(rooms.flatMap((r) => r.members.map((m) => m.id)))
        .size,
    }),
};

export const AIService = {
  suggestionsFor: (event: string) =>
    delay([
      `Add "${event} welcome signage" — most rooms include this by week 2.`,
      "Lock vendors with deposits 30 days before event date.",
      "Split gifting category by household to avoid duplicates.",
    ]),
};

export type {
  AppNotification,
  ChatMessage,
  EventTemplate,
  Room,
  ShoppingItem,
};
