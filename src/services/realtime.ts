/**
 * Mock realtime / presence / notification stubs.
 * Each class mirrors the surface a Socket.IO or FastAPI WS client would
 * expose so swapping in a real transport is a single-file change.
 */

type Listener<T> = (value: T) => void;

class Channel<T> {
  private listeners = new Set<Listener<T>>();
  on(fn: Listener<T>) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  emit(value: T) {
    this.listeners.forEach((l) => l(value));
  }
}

// --- Realtime ---------------------------------------------------------------
export type RealtimeMessage =
  | { type: "ping" }
  | { type: "presence"; userId: string; status: "online" | "idle" | "offline" }
  | { type: "activity"; text: string };

class MockRealtime {
  private ch = new Channel<RealtimeMessage>();
  on = this.ch.on.bind(this.ch);
  connect() {
    /* swap with `io(URL)` */ return this;
  }
  send(_msg: RealtimeMessage) {
    /* swap with `socket.emit` */
  }
}

export const realtime = new MockRealtime();

// --- Notifications ----------------------------------------------------------
export type ToastNotif = { id: string; title: string; body: string; kind: string };

class NotificationService {
  private ch = new Channel<ToastNotif>();
  on = this.ch.on.bind(this.ch);
  push(n: Omit<ToastNotif, "id">) {
    this.ch.emit({ ...n, id: crypto.randomUUID() });
  }
}

export const notificationService = new NotificationService();

// --- Analytics --------------------------------------------------------------
export const analyticsService = {
  /** Replace with FastAPI `/analytics/room/{id}` */
  async getRoomSnapshot(_roomId: string) {
    return {
      utilization: 0.48,
      savings: 18400,
      avgItemCost: 4720,
      activeMembers: 5,
    };
  },
};
