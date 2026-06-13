# Design System: EcoSphere

This document outlines the visual identity, typography, and design tokens extracted from the **EcoSphere (co2_emission_project)** design system.

---

## 🎨 Color Palette

The color system is designed around an eco-conscious, modern, and trustworthy palette, utilizing fresh greens, warm clay accents, and clean light-blue backgrounds.

### Primary Colors (Brand Identity)
| Token | HEX | Sample | Role / Usage |
| :--- | :--- | :--- | :--- |
| `primary` | `#006c49` | 🟢 | Brand forest green; main brand actions, active state text, and headers. |
| `primary-container` | `#10b981` | 🟢 | Vibrant mint/emerald green; progress meters, action pills, success indicators. |
| `on-primary` | `#ffffff` | ⚪ | Pure white; text and icon color on top of primary colors. |
| `on-primary-container` | `#00422b` | 🟢 | Deep dark forest green; text and icon color on top of primary container. |
| `primary-fixed` | `#6ffbbe` | 🟢 | Bright mint; pill background and highlight indicators. |
| `primary-fixed-dim` | `#4edea3` | 🟢 | Muted bright green; dark mode primary accent. |

### Secondary Colors (Muted Accents)
| Token | HEX | Sample | Role / Usage |
| :--- | :--- | :--- | :--- |
| `secondary` | `#52625c` | 🪨 | Slate green; secondary actions, supporting text. |
| `secondary-container` | `#d3e3dc` | 🪨 | Light sage green; passive menu item backgrounds, icon wrappers. |
| `on-secondary` | `#ffffff` | ⚪ | White; text on secondary buttons. |
| `on-secondary-container`| `#566660` | 🪨 | Charcoal sage; text on secondary containers. |

### Tertiary Colors (Warm Highlights & Warnings)
| Token | HEX | Sample | Role / Usage |
| :--- | :--- | :--- | :--- |
| `tertiary` | `#9d4300` | 🟠 | Warm rust/orange; badges, trend warnings, notifications, streaks. |
| `tertiary-container` | `#ff7e2d` | 🟠 | Coral orange; critical call-to-actions, action buttons. |
| `on-tertiary` | `#ffffff` | ⚪ | White; text on tertiary backgrounds. |
| `tertiary-fixed` | `#ffdbca` | 🟠 | Soft peach; streak counts, notifications. |

### Neutrals (Structure & Layouts)
| Token | HEX | Sample | Role / Usage |
| :--- | :--- | :--- | :--- |
| `background` | `#f8f9ff` | ⚪ | Muted ice blue/off-white; main page background. |
| `on-background` | `#121c28` | 🔵 | Dark slate blue; headers, high-emphasis body text. |
| `surface` | `#f8f9ff` | ⚪ | Header backgrounds, top nav blocks. |
| `on-surface` | `#121c28` | 🔵 | Main copy, default icons. |
| `on-surface-variant` | `#3c4a42` | 🪨 | Dark sage; low-emphasis metadata, labels, subtitles. |
| `surface-container-lowest`| `#ffffff`| ⚪ | Pure white; card backgrounds, modules, bento boxes. |
| `surface-container-low` | `#eef4ff` | 🔵 | Subtle card backgrounds. |
| `surface-container` | `#e5eeff` | 🔵 | Accent panels, left sidebar sheets. |
| `surface-container-high`| `#dfe9fa` | 🔵 | Inner goals indicators. |
| `surface-container-highest`| `#d9e3f4`| 🔵 | Accent banners, dynamic log modules. |

---

## 🔤 Typography

The typography features Google Fonts tailored for readability and a modern, high-tech environmental brand aesthetic.

### Font Families
- **Display & Headings**: `Quicksand` (rounded sans-serif, brings warmth and friendliness)
- **Body, Labels, and Metadata**: `Plus Jakarta Sans` (highly legible geometric sans-serif)

### Type Scale
| Style Name | Font Family | Size | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Large** | `Quicksand` | `40px` | `48px` | `700` (Bold) | `-0.02em` |
| **Headline Large** | `Quicksand` | `32px` | `40px` | `700` (Bold) | `normal` |
| **Headline Md** | `Quicksand` | `24px` | `32px` | `600` (Semi-Bold) | `normal` |
| **Body Large** | `Plus Jakarta Sans` | `18px` | `28px` | `400` (Regular) | `normal` |
| **Body Medium** | `Plus Jakarta Sans` | `16px` | `24px` | `400` (Regular) | `normal` |
| **Label Medium** | `Plus Jakarta Sans` | `14px` | `20px` | `600` (Semi-Bold) | `0.01em` |
| **Label Small** | `Plus Jakarta Sans` | `12px` | `16px` | `500` (Medium) | `normal` |

---

## 📐 Spacing & Layout

### Spacing Scale
- `xs`: `4px`
- `base`: `4px`
- `sm`: `8px`
- `md`: `16px`
- `gutter`: `16px`
- `lg`: `24px`
- `xl`: `32px`
- `2xl`: `48px`
- `3xl`: `64px`
- `container-padding`: `20px`

### Border Radius
- `DEFAULT`: `0.25rem` (`4px`)
- `lg`: `0.5rem` (`8px`)
- `xl`: `0.75rem` (`12px`)
- `2xl`: `1rem` (`16px`)
- `full`: `9999px`

---

## ✨ Effects & Styling

### Shadows
- **Primary Soft Shadow (`shadow-primary-soft`)**:
  `box-shadow: 0 4px 20px rgba(0, 108, 73, 0.1);` (Subtle green tint)

### Glassmorphism
- **Glass Card/Panel (`glass-card` / `glass-panel`)**:
  ```css
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  ```

### Icons
- **Material Symbols Outlined**:
  ```css
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  ```
