import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Brilliant.org inspired color palette
        brand: {
          50: { value: '#f0f9ff' },
          100: { value: '#e0f2fe' },
          200: { value: '#bae6fd' },
          300: { value: '#7dd3fc' },
          400: { value: '#38bdf8' },
          500: { value: '#0ea5e9' },
          600: { value: '#0284c7' },
          700: { value: '#0369a1' },
          800: { value: '#075985' },
          900: { value: '#0c4a6e' },
        },
        // Orange accent like Brilliant
        orange: {
          50: { value: '#fff7ed' },
          100: { value: '#ffedd5' },
          200: { value: '#fed7aa' },
          300: { value: '#fdba74' },
          400: { value: '#fb923c' },
          500: { value: '#f97316' },
          600: { value: '#ea580c' },
          700: { value: '#c2410c' },
          800: { value: '#9a3412' },
          900: { value: '#7c2d12' },
        },
        // Green for success/Python
        green: {
          50: { value: '#f0fdf4' },
          100: { value: '#dcfce7' },
          200: { value: '#bbf7d0' },
          300: { value: '#86efac' },
          400: { value: '#4ade80' },
          500: { value: '#22c55e' },
          600: { value: '#16a34a' },
          700: { value: '#15803d' },
          800: { value: '#166534' },
          900: { value: '#14532d' },
        },
        // Purple for premium/special
        purple: {
          50: { value: '#faf5ff' },
          100: { value: '#f3e8ff' },
          200: { value: '#e9d5ff' },
          300: { value: '#d8b4fe' },
          400: { value: '#c084fc' },
          500: { value: '#a855f7' },
          600: { value: '#9333ea' },
          700: { value: '#7e22ce' },
          800: { value: '#6b21a8' },
          900: { value: '#581c87' },
        },
        // Gray scale
        gray: {
          50: { value: '#f9fafb' },
          100: { value: '#f3f4f6' },
          200: { value: '#e5e7eb' },
          300: { value: '#d1d5db' },
          400: { value: '#9ca3af' },
          500: { value: '#6b7280' },
          600: { value: '#4b5563' },
          700: { value: '#374151' },
          800: { value: '#1f2937' },
          900: { value: '#111827' },
        },
      },
      fonts: {
        heading: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
        body: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
        mono: { value: `'JetBrains Mono', 'Fira Code', monospace` },
      },
      radii: {
        sm: { value: '6px' },
        md: { value: '10px' },
        lg: { value: '14px' },
        xl: { value: '18px' },
        '2xl': { value: '24px' },
        full: { value: '9999px' },
      },
    },
    semanticTokens: {
      colors: {
        // Background colors
        bg: {
          DEFAULT: { value: { base: '#ffffff', _dark: '#0f172a' } },
          muted: { value: { base: '#f8fafc', _dark: '#1e293b' } },
          subtle: { value: { base: '#f1f5f9', _dark: '#334155' } },
          canvas: { value: { base: '#fefefe', _dark: '#0f172a' } },
        },
        // Text colors
        fg: {
          DEFAULT: { value: { base: '#0f172a', _dark: '#f8fafc' } },
          muted: { value: { base: '#64748b', _dark: '#94a3b8' } },
          subtle: { value: { base: '#94a3b8', _dark: '#64748b' } },
        },
        // Border colors
        border: {
          DEFAULT: { value: { base: '#e2e8f0', _dark: '#334155' } },
          muted: { value: { base: '#f1f5f9', _dark: '#1e293b' } },
        },
        // Track-specific colors
        python: { value: '#22c55e' },
        rust: { value: '#f97316' },
        react: { value: '#0ea5e9' },
        cLang: { value: '#64748b' },
        algebra: { value: '#a855f7' },
        arithmetic: { value: '#0ea5e9' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
