// Theme

// Light theme (default) → clean and professional

// Dark theme (optional) → for power users/admin dashboards

// 🎨 Colors

// Stick to a neutral + accent palette.

// Primary: Deep Blue (#1E3A8A) → trust, stability

// Secondary: Emerald Green (#10B981) → growth, markets, money

// Accent: Amber/Gold (#F59E0B) → highlights, calls-to-action

// Background: Light Gray (#F9FAFB)

// Text: Dark Gray (#111827)

// 📌 Example Palette:

// Primary: #1E3A8A

// Secondary: #10B981

// Accent: #F59E0B

// Neutral/Gray: #6B7280

// Background: #F9FAFB

// ✍️ Fonts

// Headings(H1 - H3): Sans - serif, bold, professional → Inter
// Body text: Clean, highly readable → Roboto or Inter
// Numbers & Data (dashboards): Use monospace for clarity → Roboto Mono

// 📊 UI Style

// Minimalistic, grid-based layout (think Airtable, Notion, or Stripe dashboard)

// Cards with subtle shadows for stalls, markets, and reports

// Rounded corners (md–lg) for modern feel

// Hover/focus states with subtle color shifts

// Error states in Red (#DC2626)

// Success states in Green (#16A34A)

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class", // 'class' = manual toggle
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui"],
				heading: ["Poppins", "ui-sans-serif"],
				mono: ["JetBrains Mono", "monospace"],
			},
			colors: {
				brand: {
					primary: "#1E3A8A", // deep blue
					secondary: "#10B981", // emerald
					accent: "#F59E0B", // amber
				},
				gray: {
					50: "#F9FAFB",
					100: "#F3F4F6",
					200: "#E5E7EB",
					300: "#D1D5DB",
					400: "#9CA3AF",
					500: "#6B7280",
					600: "#4B5563",
					700: "#374151",
					800: "#1F2937",
					900: "#111827",
				},
			},
		},
	},
	plugins: [],
};
