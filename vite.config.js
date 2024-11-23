import { defineConfig } from "vite";

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: isProduction,
			},
		},
	},
});
