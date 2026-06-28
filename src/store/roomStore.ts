import { create } from "zustand";
import type { Priority, Product, ProductCategory, ProductStatus } from "@/types";
import { products as seedProducts } from "@/features/rooms/mockProducts";

export type RoomFilter =
  | "all"
  | "pending"
  | "purchased"
  | "reserved"
  | "mine"
  | "high"
  | "budget";

interface RoomState {
  productsByRoom: Record<string, Product[]>;
  collapsed: Record<string, boolean>; // category collapse per roomId|category
  filter: RoomFilter;
  search: string;
  drawerProductId: string | null;

  setFilter: (f: RoomFilter) => void;
  setSearch: (s: string) => void;
  openDrawer: (id: string | null) => void;
  toggleCategory: (roomId: string, category: ProductCategory) => void;
  setStatus: (roomId: string, productId: string, status: ProductStatus, userId?: string) => void;
  setPriority: (roomId: string, productId: string, priority: Priority) => void;
  assign: (roomId: string, productId: string, userId?: string) => void;
  moveCategory: (roomId: string, productId: string, category: ProductCategory) => void;
  duplicate: (roomId: string, productId: string) => void;
  remove: (roomId: string, productId: string) => void;
  addProduct: (product: Product) => void;
}

const indexed = seedProducts.reduce<Record<string, Product[]>>((acc, p) => {
  (acc[p.roomId] ??= []).push(p);
  return acc;
}, {});

export const useRoomStore = create<RoomState>((set) => ({
  productsByRoom: indexed,
  collapsed: {},
  filter: "all",
  search: "",
  drawerProductId: null,

  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
  openDrawer: (drawerProductId) => set({ drawerProductId }),
  toggleCategory: (roomId, category) =>
    set((s) => {
      const key = `${roomId}|${category}`;
      return { collapsed: { ...s.collapsed, [key]: !s.collapsed[key] } };
    }),
  setStatus: (roomId, productId, status, userId) =>
    set((s) => ({
      productsByRoom: {
        ...s.productsByRoom,
        [roomId]: s.productsByRoom[roomId].map((p) =>
          p.id === productId
            ? {
                ...p,
                status,
                reservedById: status === "reserved" ? userId ?? p.reservedById : undefined,
                purchasedById: status === "purchased" ? userId ?? p.purchasedById : undefined,
              }
            : p,
        ),
      },
    })),
  setPriority: (roomId, productId, priority) =>
    set((s) => ({
      productsByRoom: {
        ...s.productsByRoom,
        [roomId]: s.productsByRoom[roomId].map((p) =>
          p.id === productId ? { ...p, priority } : p,
        ),
      },
    })),
  assign: (roomId, productId, userId) =>
    set((s) => ({
      productsByRoom: {
        ...s.productsByRoom,
        [roomId]: s.productsByRoom[roomId].map((p) =>
          p.id === productId ? { ...p, assignedToId: userId } : p,
        ),
      },
    })),
  moveCategory: (roomId, productId, category) =>
    set((s) => ({
      productsByRoom: {
        ...s.productsByRoom,
        [roomId]: s.productsByRoom[roomId].map((p) =>
          p.id === productId ? { ...p, category } : p,
        ),
      },
    })),
  duplicate: (roomId, productId) =>
    set((s) => {
      const list = s.productsByRoom[roomId];
      const src = list.find((p) => p.id === productId);
      if (!src) return s;
      const copy: Product = {
        ...src,
        id: `p_${Date.now()}`,
        name: `${src.name} (copy)`,
        status: "pending",
        reservedById: undefined,
        purchasedById: undefined,
        createdAt: new Date().toISOString(),
      };
      return {
        productsByRoom: { ...s.productsByRoom, [roomId]: [copy, ...list] },
      };
    }),
  remove: (roomId, productId) =>
    set((s) => ({
      productsByRoom: {
        ...s.productsByRoom,
        [roomId]: s.productsByRoom[roomId].filter((p) => p.id !== productId),
      },
    })),
  addProduct: (product) =>
    set((s) => ({
      productsByRoom: {
        ...s.productsByRoom,
        [product.roomId]: [product, ...(s.productsByRoom[product.roomId] ?? [])],
      },
    })),
}));
