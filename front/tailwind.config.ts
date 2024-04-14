import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		/* Mantineと一致させる: https://mantine.dev/styles/responsive/#configure-breakpoints */
		screens: {
			xs: "576px",
			sm: "768px",
			md: "992px",
			lg: "1200px",
			xl: "1400px",
		},
		extend: {},
	},
	plugins: [],
};
export default config;
