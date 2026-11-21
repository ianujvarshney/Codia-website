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
        // Codia Official Logo Color Tokens (Sampled directly from official brand mark)
        'codia-bg': '#0D0F1B',
        'codia-surface': '#141727',
        'codia-card': '#171A2E',
        'codia-cyan': '#968BFF',
        'codia-blue': '#5F84FF',
        'codia-green': '#10b981',
        'codia-border': 'rgba(150, 139, 255, 0.16)',

        // Nested helper structure for design flexibility
        codia: {
          bg: '#0D0F1B',
          surface: '#141727',
          card: '#171A2E',
          cyan: {
            DEFAULT: '#968BFF',
            50: '#F5F4FF',
            100: '#EBE8FF',
            200: '#D7D2FF',
            300: '#BFB5FF',
            400: '#A99DFF',
            500: '#968BFF',
            600: '#7B6CFF',
            glow: 'rgba(150, 139, 255, 0.35)',
            subtle: 'rgba(150, 139, 255, 0.10)',
          },
          blue: {
            DEFAULT: '#5F84FF',
            500: '#5F84FF',
            600: '#4A6CFF',
            glow: 'rgba(95, 132, 255, 0.35)',
          },
          green: {
            DEFAULT: '#10b981',
            500: '#10b981',
            glow: 'rgba(16, 185, 129, 0.35)',
          },
          border: 'rgba(150, 139, 255, 0.16)',
        },

        // Royal Luxury Logo Theme Tokens (Directly derived from Codia Logo)
        royal: {
          bg: {
            primary: '#0D0F1B',
            secondary: '#141727',
          },
          surface: '#171A2E',
          text: {
            primary: '#FEFEFF',
            secondary: '#A5A9C5',
          },
          indigo: {
            DEFAULT: '#968BFF',
            hover: '#8679FF',
            light: 'rgba(150, 139, 255, 0.12)',
            glow: 'rgba(150, 139, 255, 0.35)',
          },
          lavender: {
            DEFAULT: '#5F84FF',
            light: 'rgba(95, 132, 255, 0.12)',
            glow: 'rgba(95, 132, 255, 0.35)',
          },
          sapphire: {
            DEFAULT: '#4A6CFF',
            light: 'rgba(74, 108, 255, 0.10)',
            glow: 'rgba(74, 108, 255, 0.35)',
          },
          border: 'rgba(150, 139, 255, 0.16)',
          highlight: 'rgba(150, 139, 255, 0.10)',
        },

        // Dedicated Logo Color Namespace
        logo: {
          canvas: '#0D0F1B',
          surface: '#141727',
          card: '#171A2E',
          border: 'rgba(150, 139, 255, 0.16)',
          violet: '#968BFF',
          blue: '#5F84FF',
          'text-primary': '#FEFEFF',
          'text-secondary': '#A5A9C5',
          highlight: 'rgba(150, 139, 255, 0.10)',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        // Codia Exact Gradient Tokens
        'cyan-blue': 'linear-gradient(135deg, #968BFF 0%, #5F84FF 100%)',
        'glass-glow': 'radial-gradient(circle at 50% 0%, rgba(150, 139, 255, 0.22) 0%, rgba(95, 132, 255, 0.10) 50%, transparent 70%)',

        // Royal Luxury Logo Theme Gradients
        'royal-gradient': 'linear-gradient(135deg, #968BFF 0%, #5F84FF 100%)',
        'royal-glow': 'radial-gradient(circle at 50% 0%, rgba(150, 139, 255, 0.22) 0%, rgba(95, 132, 255, 0.10) 50%, transparent 70%)',
        'royal-sapphire-glow': 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(95, 132, 255, 0.18) 0%, transparent 70%)',
        'royal-card': 'linear-gradient(180deg, #171A2E 0%, #121424 100%)',
        'logo-gradient': 'linear-gradient(135deg, #968BFF 0%, #5F84FF 100%)',

        // Supplemental atmospheric gradients
        'stealth-conic': 'conic-gradient(from 180deg at 50% 50%, #968BFF 0deg, #5F84FF 180deg, #968BFF 360deg)',
        'radial-radial-overlay': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(150, 139, 255, 0.18), transparent 70%)',
        'notch-gradient': 'linear-gradient(180deg, rgba(150, 139, 255, 0.12) 0%, rgba(150, 139, 255, 0.02) 100%)',
      },
      boxShadow: {
        'codia-cyan': '0 0 25px -4px rgba(150, 139, 255, 0.45)',
        'codia-cyan-sm': '0 0 12px -2px rgba(150, 139, 255, 0.30)',
        'codia-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(150, 139, 255, 0.16)',
        'notch-glow': '0 10px 30px -5px rgba(150, 139, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',

        // Royal Luxury Logo Shadows
        'royal-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(150, 139, 255, 0.12)',
        'royal-md': '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(150, 139, 255, 0.16)',
        'royal-lg': '0 20px 40px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(150, 139, 255, 0.20)',
        'royal-indigo': '0 8px 24px -4px rgba(150, 139, 255, 0.45)',
        'royal-lavender': '0 8px 24px -4px rgba(95, 132, 255, 0.40)',
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
