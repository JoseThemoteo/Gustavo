---
name: Artisanal Crust & Heritage
colors:
  surface: '#fcfbdd'
  surface-dim: '#dcdcbf'
  surface-bright: '#fcfbdd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f5d8'
  surface-container: '#f0f0d2'
  surface-container-high: '#ebeacd'
  surface-container-highest: '#e5e4c7'
  on-surface: '#1c1d0b'
  on-surface-variant: '#4d463b'
  inverse-surface: '#31321e'
  inverse-on-surface: '#f3f2d5'
  outline: '#7e766a'
  outline-variant: '#cfc5b7'
  surface-tint: '#705b35'
  primary: '#190f00'
  on-primary: '#ffffff'
  primary-container: '#322303'
  on-primary-container: '#a1895f'
  inverse-primary: '#dec394'
  secondary: '#815500'
  on-secondary: '#ffffff'
  secondary-container: '#fcab06'
  on-secondary-container: '#684400'
  tertiary: '#1a0f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#352200'
  on-tertiary-container: '#af8642'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fbdfae'
  primary-fixed-dim: '#dec394'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#564420'
  secondary-fixed: '#ffddb2'
  secondary-fixed-dim: '#ffb94c'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#624000'
  tertiary-fixed: '#ffdeae'
  tertiary-fixed-dim: '#eebf75'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#604100'
  background: '#fcfbdd'
  on-background: '#1c1d0b'
  surface-variant: '#e5e4c7'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Epilogue
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Open Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a warm, premium, and artisanal atmosphere tailored for quick, elevated culinary delivery. It blends the warmth of traditional hearth-baked recipes with the crisp, modern efficiency of contemporary delivery applications. The emotional goal is to evoke appetite, trustworthiness, and refined craft, elevating casual fast-casual food into an authentic gastronomic experience.

Visual style characteristics:
- **Warm Editorial Minimalism:** Clean, uncluttered compositions where negative space celebrates the richness of food photography and core product offerings.
- **Organic Depth & Tactility:** Rich, roasted brown tones anchor the baseline hierarchy, contrasted with warm golden tones that guide transactional actions effortlessly.
- **Precision Iconography:** Exclusively relies on Google Material Symbols (Rounded/Outlined) at 20px and 24px bounding boxes, rendering expressive culinary actions without playful distraction or emojis.

## Colors

The palette balances intense roasted depth, appetizing golden warmth, and soft cream surfaces over an ultra-clean base.

### Palette Architecture
- **Primary Canvas & Contrast:** `#FFFFFF` serves as the primary canvas for maximum readability and crisp visual hierarchy. Deep roasted brown (`#322303`) acts as the anchor color for high-contrast titles, primary text, dark action modes, and brand headers.
- **Accent & Primary CTA:** Golden Amber (`#FAA901`) drives main interactions, including the floating cart, checkout triggers, category selections, and highlight tags. Text on `#FAA901` must always resolve to `#322303` for high-contrast readability.
- **Secondary Tone:** Medium Chestnut (`#694807`) frames secondary details, iconography accents, subtitles, borders, and interactive hover states.
- **Surface & Tint:** Soft Hearth Cream (`#FFFEE0`) provides a cozy, tinted background for featured item cards, discount callouts, sticky promotional banners, and inactive badge states.
- **Functional Grays & Lines:** Subtle dividing borders utilize `#694807` at 10% to 15% opacity, preserving warmth rather than shifting to cool industrial grays.

## Typography

The typographic hierarchy pairs distinct, geometric warmth for prominent titles with crisp, legible sans-serif for descriptions, menus, and transactional values.

- **Title & Header Roles (`headline_font`):** Applied to product naming, section headings, order status milestones, and pricing hero tags. Weighted strictly in 600 (SemiBold) and 700 (Bold) to project confidence and culinary authority.
- **Body & Technical Specs (`body_font`, `label_font`):** Open Sans governs ingredients, nutrition cards, preparation notes, form entries, delivery estimates, and nutritional disclosures. 400 weight manages reading ease; 600 and 700 weights manage prices, unit increments, and status pills.
- **Currency & Numeral Rendering:** All financial amounts format with tabular numerals for alignment in checkout summaries, using SemiBold weights in either headline or body variants depending on placement.

## Layout & Spacing

A responsive grid system tailored to mobile-first ordering workflows that seamlessly scales to desktop ordering portals.

### Breakpoint Structure
- **Mobile (< 768px):** 4-column fluid grid. Outer margin of `1rem` (16px), column gutters at `1rem` (16px). Single-column item feeds and two-column thumbnail cards. Sticky bottom cart bar.
- **Tablet (768px - 1024px):** 8-column layout. Margin expands to `2rem` (32px). Two-column menu grid with category navigation along an anchor strip.
- **Desktop (> 1024px):** 12-column layout capped at 1280px max canvas width. Outer margins set to `3rem` (48px) with `1.5rem` (24px) gutters. Three-column product grids with a persistent split-screen cart and checkout sidebar.

### Vertical Rhythm
- Spacing within cards (between image, title, excerpt, and action button) uses `space-xs` (4px) and `space-sm` (8px).
- Spacing between complementary section headers and their cards utilizes `space-md` (16px).
- Structural gaps between menu sections (e.g., Traditional, Special, Sweet) adhere strictly to `space-xl` (40px).

## Elevation & Depth

Depth in this design system avoids aggressive dropshadows, relying on soft warm glows, delicate tonal layers, and hairline borders.

### Shadow Architecture
- **Low Elevation (Product Cards & List Items):** `0 2px 8px -2px rgba(50, 35, 3, 0.05), 0 1px 3px 0 rgba(50, 35, 3, 0.03)`. Subtle diffusion gives cards separation against pure `#FFFFFF` backdrops.
- **Medium Elevation (Active Selectors, Floating Modals, Quantity Controls):** `0 6px 16px -4px rgba(50, 35, 3, 0.08), 0 2px 6px -1px rgba(50, 35, 3, 0.04)`.
- **High Elevation (Bottom Sheets, Sticky Cart Bar, Delivery Tracker Drawer):** `0 16px 32px -6px rgba(50, 35, 3, 0.12), 0 4px 12px 0 rgba(50, 35, 3, 0.06)`.

### Layering Rules
- **Featured Surfaces:** Cards elevated with `#FFFEE0` rely on a 1px border (`rgba(105, 72, 7, 0.12)`) instead of heavy shadows to preserve an airy, clean culinary feel.
- **Overlays:** Dark backdrops behind order customization sheets use `#322303` with 40% opacity, subtly blurred at `backdrop-filter: blur(4px)`.

## Shapes

The design system incorporates generous, organic curvatures to match the hand-crafted aesthetic of rustic dough and hearth baking.

- **Standard Containers (`rounded-xl` / 16px):** Product cards, input fields, notification containers, modal overlays, and category tiles.
- **Hero & Modal Sheets (`rounded-2xl` / 24px):** Top corners of mobile bottom sheets, featured deal banners, delivery map cards, and hero presentation viewports.
- **Pills / Full-Round (`rounded-full` / 9999px):** Primary CTA action buttons, quantity increment pills (`+` / `-`), filter chips, and nutritional highlight tags.
- **Focus Rings:** Outlines follow element contours precisely with a 2px offset in `#FAA901` surrounded by a 1px soft ring in `#694807` at 20% opacity.

## Components

### Buttons
- **Primary CTA:** Background `#FAA901`, text `#322303` (`label-lg`), height 48px, rounded-full. Hover: lighten brightness by 5%. Active: subtle scale down (0.98).
- **Secondary Button:** Background `#FFFEE0`, border 1px solid `#694807` (20%), text `#322303`. Hover: border color shifts to `#694807` (50%).
- **Tertiary / Ghost Button:** Transparent background, text `#694807`. Focus ring visible on keyboard interaction.

### Chips & Filter Tabs
- **Default State:** Background `#FFFFFF`, border 1px solid `rgba(105, 72, 7, 0.15)`, text `#694807` (`label-md`), height 36px, rounded-full.
- **Selected State:** Background `#322303`, text `#FFFEE0`, border 1px solid `#322303`. Contains Material Symbol indicator if filtered.

### Cards
- **Menu Item Card:** Background `#FFFFFF`, 1px border `rgba(105, 72, 7, 0.08)`, rounded-xl. Features a high-resolution aspect-ratio 4:3 image with top-rounded corners, bold item headline in `#322303`, truncated description in `#694807`, and a bottom-aligned price with quick-add button.
- **Highlight / Combo Card:** Background `#FFFEE0`, border 1px solid `rgba(250, 169, 1, 0.4)`, rounded-2xl, extra micro-shadow for premium emphasis.

### Quantity Selector (Counter)
- Pill-shaped container (`rounded-full`), background `#FFFEE0`, border 1px solid `rgba(105, 72, 7, 0.2)`. Houses circular decrement and increment icon buttons (`remove` and `add` Material Symbols) with bold numerical quantity centered in `#322303`.

### Input Fields & Search
- Form fields stand at 48px height, rounded-xl, background `#FFFFFF`, border 1px solid `rgba(105, 72, 7, 0.2)`. Floating label and input text in `#322303`.
- Placeholder text in `#694807` at 50% opacity.
- Focus state: Border transition to `#FAA901` with an ambient glow (`box-shadow: 0 0 0 3px rgba(250, 169, 1, 0.2)`).

### Sticky Order Bar
- Persistent bottom mobile panel: White background (`#FFFFFF`), border-top 1px solid `rgba(105, 72, 7, 0.1)`, rounded-t-2xl. Displays item count summary on the left and a prominent `#FAA901` CTA on the right with integrated total cost.