import ssr from "vike/plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react({}), ssr({}), tsconfigPaths()],
});
