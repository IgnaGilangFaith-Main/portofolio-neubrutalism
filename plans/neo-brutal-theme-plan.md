# Neo-Brutalism Theme + Dark Mode — Implementation Plan

## Overview

Give the existing portfolio a vibrant neo-brutalist makeover with colorful section backgrounds and a working dark mode. Retain all existing brutalist hallmarks (thick borders, bold typography, shadow offsets, square corners).

---

## 1. Color Palette

### Light Theme

| Role                   | Color         | Hex     |
| ---------------------- | ------------- | ------- |
| Section 1 (Hero)       | Warm Yellow   | #FFDE59 |
| Section 2 (About)      | Soft Pink     | #FF6B9D |
| Section 3 (Stats/dark) | Near Black    | #1A1A1A |
| Section 4 (Projects)   | Bright Cyan   | #00E5FF |
| Section 5 (Contact)    | Lime Green    | #B0FF57 |
| Footer                 | Near Black    | #1A1A1A |
| Accent 1 (primary)     | Electric Blue | #0055FF |
| Accent 2 (secondary)   | Hot Pink      | #FF1493 |
| Card surface           | White         | #FFFFFF |
| Text (fg)              | Near Black    | #0A0A0A |
| Border                 | Near Black    | #0A0A0A |

### Dark Theme

| Role                   | Color         | Hex     |
| ---------------------- | ------------- | ------- |
| Background             | Dark Charcoal | #121212 |
| Card surface           | Dark Gray     | #1E1E1E |
| Text (fg)              | Off-white     | #F0F0F0 |
| Section 1 (Hero)       | Deep Purple   | #2D1B4E |
| Section 2 (About)      | Dark Maroon   | #3D1B1B |
| Section 3 (Stats/dark) | Near Black    | #0D0D0D |
| Section 4 (Projects)   | Dark Teal     | #1B2D3D |
| Section 5 (Contact)    | Dark Olive    | #1B3D1B |
| Accent 1               | Bright Blue   | #3D8BFF |
| Accent 2               | Bright Pink   | #FF4081 |
| Border                 | Off-white     | #E0E0E0 |

---

## 2. Changes to `index.html`

- Add a dark-mode toggle button inside `<nav>` (next to the collapse div, or inside navbar-nav)
- Button: `<button id="theme-toggle" class="btn-brutal theme-toggle-btn"><i class="bi bi-moon-fill"></i></button>`
- Add a small `<script>` block before closing `</body>` for toggle logic

---

## 3. Changes to `style.css`

### A. Restructure `:root` variables

- Keep light-theme variables as default `:root`
- Add `[data-theme="dark"]` override block for all dark values

### B. Section backgrounds

- Assign each `<section>` a unique background using CSS vars
- `.hero-section` → `var(--section-hero-bg)`
- `.about-section` → `var(--section-about-bg)`
- `.projects-section` → `var(--section-projects-bg)`
- `.contact-section` → `var(--section-contact-bg)`

### C. Toggle button styles

- `.theme-toggle-btn` → round/icon button with brutalist border + shadow
- Swap icon between `bi-moon-fill` and `bi-sun-fill`

### D. Transition

- Add `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease` on `body` and major containers so theme switch is smooth

---

## 4. JavaScript (inline in `index.html`)

```js
// On page load:
// 1. Check localStorage for 'theme' key
// 2. If dark, set data-theme="dark" on <html>
// 3. Toggle button icon accordingly
// 4. On click: toggle data-theme, save to localStorage, swap icon
```

---

## 5. Files to Modify

| File         | Changes                                                              |
| ------------ | -------------------------------------------------------------------- |
| `index.html` | + theme toggle button, + script block                                |
| `style.css`  | + dark :root vars, + section bg vars, + toggle styles, + transitions |

---

## 6. Execution Order

1. Update `style.css` — :root vars for light + dark, section backgrounds, toggle btn
2. Update `index.html` — toggle button markup
3. Update `index.html` — script block for toggle + localStorage
4. Review & verify
