/**
 * Mock collaboration socket interface.
 * Swap with Socket.IO client in a single file — UI components stay unchanged.
 */
import type { ActivityEvent, Presence, Product } from "@/types";

export type SocketEvent =
  | { type: "presence:update"; payload: Presence }
  | { type: "product:added"; payload: Product }
  | { type: "product:updated"; payload: Partial<Product> & { id: string } }
  | { type: "product:removed"; payload: { id: string } }
  | { type: "activity:new"; payload: ActivityEvent }
  | { type: "typing"; payload: { userId: string; in: string } };

type Handler = (e: SocketEvent) => void;

class MockRoomSocket {
  private handlers = new Set<Handler>();
  connect(_roomId: string) {
    // no-op; reserved for real socket bootstrap
    return this;
  }
  on(handler: Handler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
  emit(event: SocketEvent) {
    // optimistic-only mock; would write back over the wire in real impl
    this.handlers.forEach((h) => h(event));
  }
  disconnect() {
    this.handlers.clear();
  }
}

export const roomSocket = new MockRoomSocket();
