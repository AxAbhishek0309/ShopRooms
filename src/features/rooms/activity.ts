import type { ActivityEvent } from "@/types";

export const roomActivity: Record<string, ActivityEvent[]> = {
  r_wedding: [
    { id: "a1", roomId: "r_wedding", userId: "u_priya", kind: "added", target: "Sony Soundbar", createdAt: minsAgo(2) },
    { id: "a2", roomId: "r_wedding", userId: "u_ananya", kind: "reserved", target: "Mandap Floral Arrangement", createdAt: minsAgo(8) },
    { id: "a3", roomId: "r_wedding", userId: "u_rahul", kind: "purchased", target: "Sangeet Stage Lighting", meta: "₹78,000", createdAt: minsAgo(22) },
    { id: "a4", roomId: "r_wedding", userId: "u_me", kind: "budget", meta: "Increased to ₹8.5L", createdAt: minsAgo(46) },
    { id: "a5", roomId: "r_wedding", userId: "u_meera", kind: "joined", createdAt: minsAgo(72) },
    { id: "a6", roomId: "r_wedding", userId: "u_priya", kind: "commented", target: "Welcome Hampers", createdAt: minsAgo(96) },
    { id: "a7", roomId: "r_wedding", userId: "u_rahul", kind: "assigned", target: "Crystal 55\" TV", meta: "to himself", createdAt: minsAgo(120) },
  ],
  r_housewarming: [
    { id: "b1", roomId: "r_housewarming", userId: "u_vikram", kind: "reserved", target: "Pigeon Cookware Set", createdAt: minsAgo(4) },
    { id: "b2", roomId: "r_housewarming", userId: "u_me", kind: "purchased", target: "Kent Water Purifier", meta: "₹14,999", createdAt: minsAgo(38) },
    { id: "b3", roomId: "r_housewarming", userId: "u_meera", kind: "added", target: "Mirror Decor", createdAt: minsAgo(64) },
  ],
  r_babyshower: [
    { id: "c1", roomId: "r_babyshower", userId: "u_ananya", kind: "purchased", target: "Photo Booth Backdrop", meta: "₹4,500", createdAt: minsAgo(18) },
    { id: "c2", roomId: "r_babyshower", userId: "u_priya", kind: "reserved", target: "Pastel Hampers", createdAt: minsAgo(56) },
  ],
  r_office: [
    { id: "d1", roomId: "r_office", userId: "u_kunal", kind: "reserved", target: "Ergonomic Chair", createdAt: minsAgo(12) },
    { id: "d2", roomId: "r_office", userId: "u_me", kind: "purchased", target: "Nespresso Vertuo", meta: "₹14,990", createdAt: minsAgo(120) },
  ],
};

function minsAgo(m: number) {
  return new Date(Date.now() - m * 60_000).toISOString();
}
