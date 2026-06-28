import type { Presence } from "@/types";

export const roomPresence: Record<string, Presence[]> = {
  r_wedding: [
    { userId: "u_me", status: "online", activity: "Viewing Electronics", viewingCategory: "Electronics" },
    { userId: "u_priya", status: "online", activity: "Adding Refrigerator", typingIn: "Kitchen" },
    { userId: "u_rahul", status: "online", activity: "Chatting" },
    { userId: "u_ananya", status: "idle", activity: "Browsing Decor", viewingCategory: "Decor", lastSeen: "2026-06-28T10:14:00Z" },
    { userId: "u_meera", status: "offline", lastSeen: "2026-06-28T07:32:00Z" },
  ],
  r_housewarming: [
    { userId: "u_me", status: "online", activity: "Editing Budget" },
    { userId: "u_vikram", status: "online", activity: "Viewing Kitchen", viewingCategory: "Kitchen" },
    { userId: "u_meera", status: "idle", activity: "Browsing Furniture", viewingCategory: "Furniture" },
  ],
  r_babyshower: [
    { userId: "u_me", status: "online", activity: "Viewing Decor", viewingCategory: "Decor" },
    { userId: "u_ananya", status: "online", activity: "Reserved Hamper" },
    { userId: "u_priya", status: "offline", lastSeen: "2026-06-27T22:00:00Z" },
  ],
  r_office: [
    { userId: "u_me", status: "online", activity: "Viewing Office" },
    { userId: "u_kunal", status: "online", activity: "Adding Item" },
    { userId: "u_vikram", status: "idle", activity: "Browsing Pantry" },
  ],
};
