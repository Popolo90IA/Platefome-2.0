/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      // ── BRAND COLORS ──
      colors: {
        // Shadcn/Radix tokens (existing)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Plateform brand tokens
        void: "hsl(var(--void))",
        abyss: "hsl(var(--abyss))",
        deep: "hsl(var(--deep))",
        surface: "hsl(var(--surface))",
        line: "hsl(var(--line))",
        dim: "hsl(var(--dim))",
        subtle: "hsl(var(--subtle))",
        pale: "hsl(var(--pale))",
        fog: "hsl(var(--fog))",
        cream: "hsl(var(--cream))",
        bronze: {
          DEFAULT: "hsl(var(--accent-bright))",
          warm: "hsl(var(--accent-warm))",
          dim: "hsl(var(--gold-dim))",
          dark: "hsl(var(--gold-dark))",
        },
        gold: "hsl(var(--gold))",
        ember: "hsl(var(--ember))",
      },
      // ── TYPOGRAPHY ──
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Serif Hebrew"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"DM Mono"', "ui-monospace", "monospace"],
        hebrew: ['"Noto Serif Hebrew"', '"Heebo"', "serif"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        mono: "0.14em",
        tight2: "-0.02em",
        tight3: "-0.03em",
      },
      // ── RADIUS ──
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "99px",
        "2xl": "20px",
      },
      // ── BACKGROUND IMAGES (gradients signature) ──
      backgroundImage: {
        "grad-bronze": "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
        "grad-bronze-warm": "linear-gradient(135deg, hsl(36,80%,55%), hsl(28,62%,42%))",
        "grad-gold-shimmer":
          "linear-gradient(135deg, hsl(28,62%,42%), hsl(22,70%,56%), hsl(28,58%,42%))",
      },
      // ── SHADOWS ──
      boxShadow: {
        cta: "0 2px 16px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)",
        "cta-hov":
          "0 6px 28px hsl(28,62%,38%,.5), inset 0 1px 0 rgba(255,255,255,.18)",
        card: "0 0 0 1px hsl(30,18%,82%), 0 16px 48px -16px rgba(0,0,0,.6)",
        deep: "0 24px 64px -24px rgba(0,0,0,.4)",
      },
      // ── ANIMATION ──
      transitionTimingFunction: {
        "ease-out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-clip": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};
