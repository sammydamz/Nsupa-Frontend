---
name: Nsupa
description: A returnable, reusable alternative to single-use plastic sachets in Ghana.
colors:
  primary: "oklch(0.488 0.243 264.376)"
  primary-foreground: "oklch(0.97 0.014 254.604)"
  background: "oklch(1 0 0)"
  foreground: "oklch(0.148 0.004 228.8)"
  muted: "oklch(0.963 0.002 197.1)"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "'Outfit Variable', sans-serif"
  body:
    fontFamily: "'DM Sans Variable', sans-serif"
rounded:
  sm: "calc(0.875rem * 0.6)"
  md: "calc(0.875rem * 0.8)"
  lg: "0.875rem"
  xl: "calc(0.875rem * 1.4)"
  2xl: "calc(0.875rem * 1.8)"
  3xl: "calc(0.875rem * 2.2)"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1rem"
---

# Design System: Nsupa

## Overview

**Creative North Star: "The Blue Circular Loop"**

Friendly, approachable, and educational—focused on the community impact of recycling. The Nsupa UI uses soft geometric forms, ambient layering, and a striking cyan palette to evoke fresh water and environmental consciousness. The interface is optimized to guide users smoothly through the 1:1 container swap system without feeling overly clinical or corporate. 

**Key Characteristics:**
- Friendly and educational tone.
- Soft, pill-shaped, and tactile UI elements.
- Ambient, lightweight shadowing for depth.
- Striking and confident primary blue.

## Colors

The palette is driven by a confident, fresh cyan representing clean water and environmental renewal.

### Primary
- **Nsupa Cyan** (oklch(0.488 0.243 264.376)): The dominant brand color, used for hero backgrounds, primary actions, and key thematic elements.

### Neutral
- **Clean White** (oklch(1 0 0)): Primary background color, ensuring maximum legibility and freshness.
- **Deep Slate** (oklch(0.148 0.004 228.8)): High-contrast text color for primary reading.
- **Soft Slate** (oklch(0.963 0.002 197.1)): Used for muted backgrounds and subtle dividers.

### Named Rules
**The Freshness Rule.** Never use murky or desaturated dark backgrounds unless explicitly in dark mode. The UI must always feel as clean and transparent as the water it delivers.

## Typography

**Display Font:** Outfit Variable
**Body Font:** DM Sans Variable

**Character:** A highly readable, modern geometric pairing. Outfit provides structured yet approachable headings, while DM Sans ensures maximum legibility for body copy and logistics details.

### Hierarchy
- **Display**: Outfit, used for hero greetings and large eco-metric numbers.
- **Body**: DM Sans, used for all instructional text, form fields, and secondary data.

### Named Rules
**The Legibility First Rule.** All essential logistics data (order numbers, delivery times) must use high-contrast text weights. Never sacrifice readability for aesthetic lightness.

## Layout

The layout uses a comfortable, airy density to avoid overwhelming users with data. It relies on standard flex and grid patterns, with generous spacing (16px to 24px) between distinct thematic blocks.

## Elevation & Depth

Soft, ambient layering—containers float gently to feel lightweight and approachable.

### Named Rules
**The Ambient Lift Rule.** Shadows are used to create a sense of lightweight floating, not heavy, structural mass. Shadows should be diffuse and soft, allowing cards to gently lift off the background.

## Shapes

Soft, pill-shaped, and tactile—friendly and inviting. Corners are generously rounded (up to 0.875rem for standard cards, and heavily rounded for pills/badges) to reinforce the approachable aesthetic.

## Components

Soft, pill-shaped, and tactile—friendly and inviting.

### Buttons
- **Shape:** Generously rounded corners (0.875rem or fully pill-shaped).
- **Primary:** Filled with Nsupa Cyan, high-contrast white text.
- **Hover / Focus:** Slight opacity shift or ambient glow.

### Cards / Containers
- **Corner Style:** Large radii (e.g., 0.875rem or 3xl variants).
- **Background:** White or soft tinted blues.
- **Shadow Strategy:** Soft ambient drop shadows.
- **Internal Padding:** Generous (16px to 24px) to let content breathe.

### Navigation
- **Style:** Clean, sticky headers with distinct primary actions.

## Do's and Don'ts

### Do:
- **Do** use large, legible numbers for environmental impact metrics.
- **Do** maintain high contrast between text and the Nsupa Cyan backgrounds.
- **Do** use soft corner radii to maintain the friendly, tactile feel.

### Don't:
- **Don't** use aggressive, sharp-cornered UI elements.
- **Don't** rely on heavy, dark structural shadows.
- **Don't** clutter the UI with unnecessary borders when ambient shadows can define hierarchy.
