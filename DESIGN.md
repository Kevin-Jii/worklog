# Design

## Visual Direction

Light technical portfolio with compact resume pacing. The page removes the oversized hero and opens with a concise identity strip followed by industry project panels. Motion is present through ReactBits-style surface particles, GSAP animation, scroll reveals, and focused AI orbit movement.

## Palette Aq`1qa

```css
:root {
  --bg: oklch(0.982 0.004 250);
  --surface: oklch(1 0 0);
  --surface-soft: oklch(0.962 0.012 250);
  --ink: oklch(0.205 0.018 255);
  --muted: oklch(0.465 0.028 255);
  --blue: oklch(0.58 0.18 255);
  --blue-strong: oklch(0.46 0.18 255);
  --blue-soft: oklch(0.92 0.055 250);
  --line: oklch(0.87 0.016 250);
}
```

## Typography

Primary font stack: `Archivo Variable`, `ui-sans-serif`, `system-ui`, `sans-serif`.
Mono stack: `JetBrains Mono Variable`, `ui-monospace`, `SFMono-Regular`, `monospace`.

Display headings stay bold and compact with letter spacing no tighter than `-0.04em`. Body text uses dark ink and muted blue-gray for readable contrast on light backgrounds.

## Layout

Single-page portfolio with anchors: home, industries, ai, experience, contact. The first viewport is a compact identity and contact strip, followed immediately by project experience. Industry panels emphasize medical, smart city, and retail work. AI capability and work history remain short and scannable.

## Motion

Use Motion for reveals and scroll progress, GSAP for the ReactBits-style background surface, and CSS keyframes for small orbit/scan effects. Reduced motion collapses continuous animation. Avoid scroll event listeners.

## Components

Navigation, portfolio intro, industry cockpit, AI capability, experience summary, contact band, loading overlay, scroll progress, and ReactBits surface. Panels use a 16px radius system and pill buttons only for direct actions or tags.
