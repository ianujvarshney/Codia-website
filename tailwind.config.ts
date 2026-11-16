import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Codia Exact Design Tokens
        'codia-bg': '#0a0c12',
        'codia-surface': '#0e1018',
        'codia-card': 'rgba(18, 24, 34, 0.94)',
        'codia-cyan': '#00d2ff',
        'codia-blue': '#1068e2',
        'codia-green': '#10b981',
        'codia-border': 'rgba(255, 255, 255, 0.12)',

        // Nested helper structure for design flexibility
        codia: {
          bg: '#0a0c12',
          surface: '#0e1018',
          card: 'rgba(18, 24, 34, 0.94)',
          cyan: {
            DEFAULT: '#00d2ff',
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#00d2ff',
            600: '#00a3cc',
            glow: 'rgba(0, 210, 255, 0.35)',
            subtle: 'rgba(0, 210, 255, 0.08)',
          },
          blue: {
            DEFAULT: '#1068e2',
            500: '#1068e2',
            600: '#0d54b8',
            glow: 'rgba(16, 104, 226, 0.35)',
          },
          green: {
            DEFAULT: '#10b981',
            500: '#10b981',
            glow: 'rgba(16, 185, 129, 0.35)',
          },
          border: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        // Codia Exact Gradient Tokens
        'cyan-blue': 'linear-gradient(135deg, #00d2ff 0%, #0077ff 100%)',
        'glass-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 210, 255, 0.15) 0%, transparent 70%)',

        // Supplemental atmospheric gradients
        'stealth-conic': 'conic-gradient(from 180deg at 50% 50%, #00d2ff 0deg, #1068e2 180deg, #00d2ff 360deg)',
        'radial-radial-overlay': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 210, 255, 0.12), transparent 70%)',
        'notch-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      boxShadow: {
        'codia-cyan': '0 0 25px -4px rgba(0, 210, 255, 0.35)',
        'codia-cyan-sm': '0 0 12px -2px rgba(0, 210, 255, 0.25)',
        'codia-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'notch-glow': '0 10px 30px -5px rgba(0, 210, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
      keyframes: {
        // Glow Pulsing
        'glow-pulse': {
          '0%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 18px rgba(0, 210, 255, 0.55))',
          },
          '50%': {
            opacity: '0.55',
            filter: 'drop-shadow(0 0 6px rgba(0, 210, 255, 0.2))',
          },
        },
        // Subtle Floating
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
        'float-slow': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-14px) rotate(0.8deg)',
          },
        },
        // Dynamic Notch Expansion & HUD States
        'notch-expand': {
          '0%': {
            width: '180px',
            height: '38px',
            borderRadius: '24px',
            transform: 'scale(0.96)',
          },
          '60%': {
            transform: 'scale(1.02)',
          },
          '100%': {
            width: '420px',
            height: '68px',
            borderRadius: '32px',
            transform: 'scale(1)',
          },
        },
        'notch-collapse': {
          '0%': {
            width: '420px',
            height: '68px',
            borderRadius: '32px',
            transform: 'scale(1)',
          },
          '100%': {
            width: '180px',
            height: '38px',
            borderRadius: '24px',
            transform: 'scale(0.96)',
          },
        },
        'notch-breathing': {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(0, 210, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(0, 210, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 28px rgba(0, 210, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            borderColor: 'rgba(0, 210, 255, 0.7)',
          },
        },
        'stealth-radar': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4.5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'notch-expand': 'notch-expand 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'notch-collapse': 'notch-collapse 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'notch-breathing': 'notch-breathing 2.8s ease-in-out infinite',
        'stealth-radar': 'stealth-radar 5s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
