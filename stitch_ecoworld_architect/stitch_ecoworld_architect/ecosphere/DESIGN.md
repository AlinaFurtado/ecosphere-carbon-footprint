---
name: EcoSphere
colors:
  surface: '#f8f9ff'
  surface-dim: '#d1dbec'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dfe9fa'
  surface-container-highest: '#d9e3f4'
  on-surface: '#121c28'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#27313e'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#52625c'
  on-secondary: '#ffffff'
  secondary-container: '#d3e3dc'
  on-secondary-container: '#566660'
  tertiary: '#9d4300'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff7e2d'
  on-tertiary-container: '#622700'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d5e6df'
  secondary-fixed-dim: '#bacac3'
  on-secondary-fixed: '#101e1a'
  on-secondary-fixed-variant: '#3b4a44'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783200'
  background: '#f8f9ff'
  on-background: '#121c28'
  surface-variant: '#d9e3f4'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-padding: 20px
  gutter: 16px
---

## Brand & Style
The brand personality is "Modern Eco-conscious": a fusion of environmental stewardship and high-tech accessibility. The design system prioritizes a sense of optimism, clarity, and personal agency. It avoids the "clinical" look of typical utility apps in favor of a vibrant, "airy," and lifestyle-oriented aesthetic. 

The visual style utilizes **Soft Minimalism** with organic touches. It leverages significant whitespace to reduce cognitive load and create a "clean air" feeling. Elements are layered using soft, diffused shadows and generous corner radii to evoke a friendly, approachable, and non-intimidating user experience for tracking daily habits.

## Colors
The palette is rooted in nature. 
- **Primary (Emerald):** Used for growth, positive tracking, and primary brand moments.
- **Secondary (Mint):** Used for large background surfaces and subtle containers to maintain a fresh, light feel.
- **Tertiary (Sunrise Orange):** Reserved for high-contrast actions, alerts, or "Urgent Carbon" notifications to provide a clear visual hierarchy against the green-heavy environment.
- **Neutrals:** Soft earthy grays (Cool Grays) are used for text and borders to maintain high legibility without the harshness of pure black.

## Typography
The system uses a pairing of **Quicksand** for display and headings to convey a friendly, rounded, and welcoming tone. Its geometric yet soft terminals align with the eco-conscious theme. 

For functional text and data, **Plus Jakarta Sans** is used. It provides high legibility at small sizes while maintaining a modern, clean character that complements the primary heading font. Tracking is slightly loosened for labels to ensure clarity against vibrant backgrounds.

## Layout & Spacing
This design system follows a **Mobile-First Fluid Grid** model. 
- **Mobile:** 4-column layout with 20px side margins and 16px gutters.
- **Tablet/Desktop:** Content scales to a 12-column grid but remains centered with a max-width of 1040px to maintain the "airy" intimacy of the app.

Spacing follows an 8pt rhythm (with 4px increments for micro-adjustments). Generous vertical padding (`xl` and `2xl`) is encouraged between sections to prevent the UI from feeling cluttered, emphasizing the "Eco" focus on breathing room.

## Elevation & Depth
Depth is created through **Ambient Shadows** and **Tonal Layering** rather than hard lines.
- **Level 1 (Base):** Off-white or Very Light Mint (#F7FDF9) background.
- **Level 2 (Cards):** Pure white surfaces with a soft, 15% opacity shadow (Blur: 20px, Y: 4px) tinted with the Primary Emerald color to create a "floating" effect.
- **Level 3 (Modals/Overlays):** Increased shadow spread (Blur: 40px) with a subtle backdrop blur (8px) on the layers beneath.

Avoid using borders for containment; use subtle shifts in background color or soft shadows to define boundaries.

## Shapes
The shape language is dominated by **Extra Large Radii**. Following the `2xl` requirement, standard UI components like buttons and small cards use a 16px radius, while main feature containers and "Hero" cards use 24px or 32px. This organic rounding mimics shapes found in nature—like pebbles or leaves—avoiding sharp, aggressive corners.

## Components
- **Progress Rings:** Use thick strokes with rounded caps. The background track should be a low-opacity version of the primary color, with the active progress in the solid Primary Emerald.
- **Interactive Cards:** White background, `rounded-2xl`, with a subtle primary-tinted shadow. Use these for tracking categories (Food, Travel, Home).
- **Buttons:** Primary buttons are fully rounded (pill-shaped) with a subtle gradient from Mint to Emerald. Secondary buttons use a "ghost" style with a 2px Emerald border.
- **Chips:** Small, pill-shaped tags used for filtering habits. Active states use solid Mint with Emerald text.
- **Input Fields:** Soft gray backgrounds (#F3F4F6) with 16px corner radius. On focus, the border transitions to a 2px Emerald stroke.
- **Playful Icons:** Use a consistent "duotone" style where one part of the icon is solid Emerald and the other is 30% opacity Emerald. Lines should have rounded caps and joins to match the typography.