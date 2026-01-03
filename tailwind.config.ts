import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'Roboto',
  				'ui-sans-serif',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Helvetica Neue',
  				'Arial',
  				'Noto Sans',
  				'sans-serif'
  			],
  			display: [
  				'Space Grotesk',
  				'sans-serif'
  			],
  			serif: [
  				'Libre Caslon Text',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'Roboto Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		colors: {
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
  			sandbox: {
  				DEFAULT: 'hsl(var(--sandbox))',
  				foreground: 'hsl(var(--sandbox-foreground))',
  				muted: 'hsl(var(--sandbox-muted))',
  				border: 'hsl(var(--sandbox-border))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				foreground: 'hsl(var(--success-foreground))',
  				muted: 'hsl(var(--success-muted))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' }
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' }
			},
			'float': {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-10px)' }
			},
			'float-delayed': {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-15px)' }
			},
			'glow-pulse': {
				'0%, 100%': { opacity: '0.4' },
				'50%': { opacity: '0.8' }
			},
			'slide-up-fade': {
				'0%': { opacity: '0', transform: 'translateY(30px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' }
			},
			'slide-down-fade': {
				'0%': { opacity: '0', transform: 'translateY(-30px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' }
			},
			'slide-left-fade': {
				'0%': { opacity: '0', transform: 'translateX(30px)' },
				'100%': { opacity: '1', transform: 'translateX(0)' }
			},
			'slide-right-fade': {
				'0%': { opacity: '0', transform: 'translateX(-30px)' },
				'100%': { opacity: '1', transform: 'translateX(0)' }
			},
			'scale-fade': {
				'0%': { opacity: '0', transform: 'scale(0.9)' },
				'100%': { opacity: '1', transform: 'scale(1)' }
			},
			'blur-fade': {
				'0%': { opacity: '0', filter: 'blur(10px)' },
				'100%': { opacity: '1', filter: 'blur(0)' }
			},
			'rotate-in': {
				'0%': { opacity: '0', transform: 'rotate(-5deg) scale(0.95)' },
				'100%': { opacity: '1', transform: 'rotate(0) scale(1)' }
			},
			'bounce-soft': {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-5px)' }
			},
			'wiggle': {
				'0%, 100%': { transform: 'rotate(-1deg)' },
				'50%': { transform: 'rotate(1deg)' }
			},
			'gradient-shift': {
				'0%': { backgroundPosition: '0% 50%' },
				'50%': { backgroundPosition: '100% 50%' },
				'100%': { backgroundPosition: '0% 50%' }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'float': 'float 3s ease-in-out infinite',
			'float-delayed': 'float-delayed 4s ease-in-out infinite',
			'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
			'slide-up-fade': 'slide-up-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
			'slide-down-fade': 'slide-down-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
			'slide-left-fade': 'slide-left-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
			'slide-right-fade': 'slide-right-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
			'scale-fade': 'scale-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
			'blur-fade': 'blur-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
			'rotate-in': 'rotate-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
			'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
			'wiggle': 'wiggle 0.5s ease-in-out infinite',
			'gradient-shift': 'gradient-shift 3s ease infinite'
		},
		boxShadow: {
			'2xs': 'var(--shadow-2xs)',
			xs: 'var(--shadow-xs)',
			sm: 'var(--shadow-sm)',
			md: 'var(--shadow-md)',
			lg: 'var(--shadow-lg)',
			xl: 'var(--shadow-xl)',
			'2xl': 'var(--shadow-2xl)',
			'sandbox-glow': '0 0 20px hsl(var(--sandbox) / 0.4)',
			'success-glow': '0 0 20px hsl(var(--success) / 0.4)'
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
