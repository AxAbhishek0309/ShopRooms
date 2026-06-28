import type { EventType } from "@/types";
import {
  Heart,
  Cake,
  Baby,
  Home,
  Sparkles,
  Briefcase,
  GraduationCap,
  Building2,
  Gift,
  Users,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export const EVENT_META: Record<
  EventType,
  { label: string; icon: LucideIcon; color: string }
> = {
  wedding: { label: "Wedding", icon: Heart, color: "#f97316" },
  birthday: { label: "Birthday", icon: Cake, color: "#ec4899" },
  "baby-shower": { label: "Baby Shower", icon: Baby, color: "#f472b6" },
  housewarming: { label: "Housewarming", icon: Home, color: "#10b981" },
  festival: { label: "Festival", icon: Sparkles, color: "#eab308" },
  office: { label: "Office", icon: Briefcase, color: "#6366f1" },
  hostel: { label: "Hostel", icon: GraduationCap, color: "#0ea5e9" },
  apartment: { label: "Apartment", icon: Building2, color: "#8b5cf6" },
  "group-gift": { label: "Group Gift", icon: Gift, color: "#ef4444" },
  family: { label: "Family", icon: Users, color: "#14b8a6" },
  custom: { label: "Custom", icon: Wand2, color: "#64748b" },
};
