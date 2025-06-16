import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'sm': '390px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Material 3 System Colors
				'md-sys-color': {
					primary: 'hsl(var(--md-sys-color-primary))',
					'on-primary': 'hsl(var(--md-sys-color-on-primary))',
					'primary-container': 'hsl(var(--md-sys-color-primary-container))',
					'on-primary-container': 'hsl(var(--md-sys-color-on-primary-container))',
					secondary: 'hsl(var(--md-sys-color-secondary))',
					'on-secondary': 'hsl(var(--md-sys-color-on-secondary))',
					'secondary-container': 'hsl(var(--md-sys-color-secondary-container))',
					'on-secondary-container': 'hsl(var(--md-sys-color-on-secondary-container))',
					tertiary: 'hsl(var(--md-sys-color-tertiary))',
					'on-tertiary': 'hsl(var(--md-sys-color-on-tertiary))',
					'tertiary-container': 'hsl(var(--md-sys-color-tertiary-container))',
					'on-tertiary-container': 'hsl(var(--md-sys-color-on-tertiary-container))',
					surface: 'hsl(var(--md-sys-color-surface))',
					'on-surface': 'hsl(var(--md-sys-color-on-surface))',
					'surface-variant': 'hsl(var(--md-sys-color-surface-variant))',
					'on-surface-variant': 'hsl(var(--md-sys-color-on-surface-variant))',
					background: 'hsl(var(--md-sys-color-background))',
					'on-background': 'hsl(var(--md-sys-color-on-background))',
					error: 'hsl(var(--md-sys-color-error))',
					'on-error': 'hsl(var(--md-sys-color-on-error))',
					'error-container': 'hsl(var(--md-sys-color-error-container))',
					'on-error-container': 'hsl(var(--md-sys-color-on-error-container))',
					outline: 'hsl(var(--md-sys-color-outline))',
					'outline-variant': 'hsl(var(--md-sys-color-outline-variant))',
				},
				// Legacy colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			fontFamily: {
				'sans': ['Comfortaa', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
				'app-title': ['Modulus', 'serif'],
				'comfortaa': ['Comfortaa', 'sans-serif'],
			},
			fontSize: {
				'heading-xl': ['32px', { lineHeight: '40px', fontWeight: '600' }],
				'heading-lg': ['28px', { lineHeight: '36px', fontWeight: '500' }],
				'heading-md': ['24px', { lineHeight: '32px', fontWeight: '500' }],
				'heading-sm': ['22px', { lineHeight: '28px', fontWeight: '500' }],
				'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
				'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
				'body-sm': ['12px', { lineHeight: '16px', fontWeight: '300' }],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Material 3 Motion
			transitionTimingFunction: {
				'emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
				'emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
				'emphasized-accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
				'standard': 'cubic-bezier(0.2, 0, 0, 1)',
				'standard-decelerate': 'cubic-bezier(0, 0, 0, 1)',
				'standard-accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
			},
			spacing: {
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
				'safe-left': 'env(safe-area-inset-left)',
				'safe-right': 'env(safe-area-inset-right)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-2px)',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
