export type EventType =
  | "wedding"
  | "birthday"
  | "baby-shower"
  | "housewarming"
  | "festival"
  | "office"
  | "hostel"
  | "apartment"
  | "group-gift"
  | "family"
  | "custom";

export type RoomStatus = "active" | "planning" | "completed" | "archived";

export type MemberRole = "owner" | "admin" | "editor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials: string;
  role?: MemberRole;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  event: EventType;
  status: RoomStatus;
  coverColor: string;
  budget: number;
  spent: number;
  currency: string;
  members: User[];
  itemCount: number;
  completedItems: number;
  updatedAt: string;
  eventDate?: string;
  pinned?: boolean;
}

export type ProductCategory =
  | "Electronics"
  | "Kitchen"
  | "Furniture"
  | "Bedroom"
  | "Bathroom"
  | "Decor"
  | "Festival"
  | "Wedding"
  | "Office"
  | "Miscellaneous";

export type Priority = "low" | "medium" | "high";

export type ProductStatus = "pending" | "reserved" | "purchased";

export interface Product {
  id: string;
  roomId: string;
  brand: string;
  name: string;
  category: ProductCategory;
  emoji: string;
  gradient: [string, string];
  price: number;
  mrp: number;
  rating: number;
  ratingCount: number;
  deliveryDays: number;
  priority: Priority;
  status: ProductStatus;
  assignedToId?: string;
  reservedById?: string;
  purchasedById?: string;
  commentsCount: number;
  addedById: string;
  createdAt: string;
  notes?: string;
}

export type PresenceStatus = "online" | "idle" | "offline";

export interface Presence {
  userId: string;
  status: PresenceStatus;
  activity?: string;
  typingIn?: ProductCategory;
  viewingCategory?: ProductCategory;
  lastSeen?: string;
}

export type ActivityKind =
  | "added"
  | "reserved"
  | "purchased"
  | "assigned"
  | "budget"
  | "joined"
  | "commented";

export interface ActivityEvent {
  id: string;
  roomId: string;
  userId: string;
  kind: ActivityKind;
  target?: string;
  meta?: string;
  createdAt: string;
}

export interface ShoppingItem {
  id: string;
  roomId: string;
  title: string;
  category: string;
  quantity: number;
  estimatedPrice: number;
  url?: string;
  imageUrl?: string;
  status: "suggested" | "approved" | "purchased" | "rejected";
  addedBy: User;
  assignedTo?: User;
  votes: number;
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  author: User;
  body: string;
  createdAt: string;
  kind?: "message" | "system" | "item";
  itemRef?: { title: string; price: number };
  reactions?: { emoji: string; count: number }[];
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  kind: "mention" | "purchase" | "invite" | "budget" | "system";
  roomId?: string;
}

export interface EventTemplate {
  id: string;
  name: string;
  event: EventType;
  description: string;
  itemCount: number;
  estimatedBudget: number;
  uses: number;
  accent: string;
}
