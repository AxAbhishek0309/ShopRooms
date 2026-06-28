import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// NOTE: Do NOT add TanStackRouterVite here — tanstackStart includes it internally.
// Adding it twice causes "TSRSplitComponent is not defined" at runtime.
export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        preset: "vercel",
      },
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
