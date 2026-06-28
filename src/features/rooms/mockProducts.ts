import type { Product, ProductCategory } from "@/types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Electronics",
  "Kitchen",
  "Furniture",
  "Bedroom",
  "Bathroom",
  "Decor",
  "Festival",
  "Wedding",
  "Office",
  "Miscellaneous",
];

export const CATEGORY_META: Record<
  ProductCategory,
  { emoji: string; gradient: [string, string] }
> = {
  Electronics: { emoji: "📺", gradient: ["#6366f1", "#0ea5e9"] },
  Kitchen: { emoji: "🍳", gradient: ["#f97316", "#ef4444"] },
  Furniture: { emoji: "🛋️", gradient: ["#8b5cf6", "#ec4899"] },
  Bedroom: { emoji: "🛏️", gradient: ["#0ea5e9", "#14b8a6"] },
  Bathroom: { emoji: "🚿", gradient: ["#22d3ee", "#3b82f6"] },
  Decor: { emoji: "🪴", gradient: ["#10b981", "#84cc16"] },
  Festival: { emoji: "🪔", gradient: ["#eab308", "#f97316"] },
  Wedding: { emoji: "💍", gradient: ["#f43f5e", "#ec4899"] },
  Office: { emoji: "🖥️", gradient: ["#475569", "#0f172a"] },
  Miscellaneous: { emoji: "🎁", gradient: ["#a855f7", "#6366f1"] },
};

type Seed = Omit<Product, "id" | "roomId" | "createdAt" | "gradient">;

const seeds: Record<string, Seed[]> = {
  r_wedding: [
    p("Samsung", 'Crystal 55" 4K Smart TV', "Electronics", "📺", 48999, 64900, 4.5, 2310, 3, "high", "reserved", "u_rahul", "u_rahul"),
    p("Sony", "HT-S400 2.1ch Soundbar", "Electronics", "🔊", 14990, 22990, 4.4, 870, 4, "medium", "pending", "u_priya"),
    p("LG", "260L Double Door Refrigerator", "Kitchen", "🧊", 28490, 35990, 4.6, 1540, 5, "high", "purchased", "u_priya", "u_me"),
    p("Whirlpool", "7kg Fully Automatic Washer", "Kitchen", "🌀", 24999, 31490, 4.3, 980, 6, "medium", "pending", "u_me"),
    p("Prestige", "Stainless Steel Pressure Cooker 5L", "Kitchen", "🍲", 1899, 2499, 4.7, 5210, 2, "low", "purchased", "u_priya", "u_priya"),
    p("Philips", "Digital Air Fryer HD9252", "Kitchen", "🍟", 8999, 12995, 4.5, 3120, 3, "medium", "reserved", "u_ananya", "u_ananya"),
    p("Nilkamal", "Engineered Wood 3-door Wardrobe", "Furniture", "🚪", 18499, 24999, 4.2, 410, 7, "high", "pending", "u_meera"),
    p("Pepperfry", "6-Seater Sheesham Dining Table", "Furniture", "🍽️", 32999, 45999, 4.4, 240, 9, "high", "reserved", "u_me", "u_meera"),
    p("Wakefit", "Orthopaedic Queen Mattress", "Bedroom", "🛏️", 17499, 28999, 4.6, 6210, 4, "high", "purchased", "u_me", "u_rahul"),
    p("D'Decor", "King Size Cotton Bedsheet Set", "Bedroom", "🛌", 2499, 3990, 4.3, 1820, 3, "low", "pending", "u_priya"),
    p("Deconovo", "Blackout Curtains 9ft (Set of 2)", "Bedroom", "🪟", 1599, 2599, 4.2, 980, 3, "low", "pending", "u_ananya"),
    p("Cera", "Premium Shower Mixer Chrome", "Bathroom", "🚿", 4499, 6299, 4.4, 320, 5, "medium", "pending", "u_meera"),
    p("Marigold + Rose", "Mandap Floral Arrangement", "Wedding", "💐", 45000, 52000, 4.8, 120, 7, "high", "reserved", "u_ananya", "u_ananya"),
    p("Atelier Aanya", "Bridesmaid Lehengas (6 pcs)", "Wedding", "👗", 54000, 72000, 4.7, 88, 14, "high", "pending", "u_priya"),
    p("Glow Studios", "Sangeet Stage Lighting Rental", "Wedding", "💡", 78000, 95000, 4.6, 64, 6, "high", "purchased", "u_rahul", "u_rahul"),
    p("Henna Co.", "Mehendi Artists — 3 Stations", "Wedding", "🤚", 36000, 42000, 4.9, 210, 4, "medium", "reserved", "u_meera", "u_meera"),
    p("Gift Tree", "Welcome Hampers (320 guests)", "Wedding", "🎁", 192000, 224000, 4.5, 96, 10, "high", "pending", "u_me"),
    p("Diya Co.", "Brass Diyas — Set of 24", "Festival", "🪔", 1899, 2499, 4.6, 540, 3, "low", "pending", "u_priya"),
    p("Indoor Greens", "Areca Palm + Snake Plant Combo", "Decor", "🪴", 1499, 1999, 4.4, 1280, 4, "low", "pending", "u_ananya"),
    p("Havells", "Stealth Ceiling Fan 1200mm", "Electronics", "🌀", 4899, 6499, 4.4, 2410, 3, "medium", "pending", "u_me"),
  ],
  r_housewarming: [
    p("Kent", "Grand RO+UV+UF Water Purifier", "Kitchen", "💧", 14999, 19500, 4.5, 1820, 4, "high", "purchased", "u_me", "u_me"),
    p("Pigeon", "5-Piece Non-Stick Cookware Set", "Kitchen", "🍳", 2499, 3990, 4.3, 4210, 3, "medium", "reserved", "u_vikram", "u_vikram"),
    p("Godrej", "Personal Safe Locker 20L", "Bedroom", "🔐", 8499, 11999, 4.6, 540, 5, "high", "pending", "u_me"),
    p("Cello", "Storage Boxes (Set of 6)", "Miscellaneous", "📦", 1299, 1899, 4.2, 2310, 2, "low", "purchased", "u_meera", "u_meera"),
    p("Urban Ladder", "3-Seater Fabric Sofa", "Furniture", "🛋️", 38999, 54999, 4.4, 320, 10, "high", "reserved", "u_me", "u_meera"),
    p("Philips", "Smart LED Strip 4m", "Decor", "💡", 2499, 3499, 4.3, 1180, 3, "low", "pending", "u_vikram"),
    p("Bombay Dyeing", "Cotton Bath Towels (Set of 4)", "Bathroom", "🧖", 1299, 1899, 4.4, 980, 3, "low", "purchased", "u_me", "u_me"),
    p("Ferns N Petals", "Housewarming Mirror Decor", "Decor", "🪞", 3499, 4999, 4.5, 220, 5, "medium", "pending", "u_meera"),
  ],
  r_babyshower: [
    p("Mothercare", "Pastel Welcome Hampers (24)", "Wedding", "🎁", 18000, 22000, 4.6, 140, 6, "high", "reserved", "u_priya", "u_priya"),
    p("Ferns N Petals", "Pastel Balloon Arch Decor", "Decor", "🎈", 6500, 8999, 4.4, 320, 4, "high", "pending", "u_ananya"),
    p("Brunch Co.", "Brunch Menu — 25 guests", "Miscellaneous", "🥂", 22500, 28000, 4.7, 88, 3, "high", "pending", "u_me"),
    p("PartyLand", "Photo Booth Backdrop + Props", "Decor", "📸", 4500, 6500, 4.3, 210, 4, "medium", "purchased", "u_ananya", "u_ananya"),
  ],
  r_office: [
    p("Nespresso", "Vertuo Next Coffee Machine", "Office", "☕", 14990, 19990, 4.6, 1820, 5, "high", "purchased", "u_me", "u_me"),
    p("Featherlite", "Ergonomic Mesh Chair", "Office", "🪑", 12499, 17999, 4.4, 980, 7, "high", "reserved", "u_kunal", "u_kunal"),
    p("Lays + Haldirams", "Pantry Snack Restock (Q3)", "Office", "🍿", 8500, 10500, 4.5, 320, 2, "medium", "pending", "u_vikram"),
    p("Logitech", "MX Keys Wireless Keyboard", "Office", "⌨️", 9495, 12995, 4.7, 2410, 3, "medium", "pending", "u_me"),
  ],
};

function p(
  brand: string,
  name: string,
  category: ProductCategory,
  emoji: string,
  price: number,
  mrp: number,
  rating: number,
  ratingCount: number,
  deliveryDays: number,
  priority: "low" | "medium" | "high",
  status: "pending" | "reserved" | "purchased",
  addedById: string,
  ownerId?: string,
): Seed {
  return {
    brand,
    name,
    category,
    emoji,
    price,
    mrp,
    rating,
    ratingCount,
    deliveryDays,
    priority,
    status,
    assignedToId: ownerId,
    reservedById: status === "reserved" ? ownerId : undefined,
    purchasedById: status === "purchased" ? ownerId : undefined,
    commentsCount: (name.length + brand.length) % 6,
    addedById,
  };
}

let counter = 1000;
export const products: Product[] = Object.entries(seeds).flatMap(([roomId, items]) =>
  items.map((s) => {
    counter += 1;
    const meta = CATEGORY_META[s.category];
    return {
      ...s,
      gradient: meta.gradient,
      id: `p_${counter}`,
      roomId,
      createdAt: new Date(Date.now() - counter * 60_000).toISOString(),
    } as Product;
  }),
);
