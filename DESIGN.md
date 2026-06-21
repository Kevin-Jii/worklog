# Design

## Visual Direction

Dark spatial portfolio with a WebGL orbital field behind the content. The page uses committed green as the single accent, white and graphite as the base, and copper as a restrained secondary marker only inside the WebGL atmosphere.

## Palette

```css
:root {
  --bg: oklch(0.095 0 0);
  --surface: oklch(0.145 0.012 155);
  --surface-strong: oklch(0.205 0.018 155);
  --ink: oklch(0.955 0.006 155);
  --muted: oklch(0.735 0.018 155);
  --primary: oklch(0.650 0.150 145);
  --primary-dark: oklch(0.410 0.135 145);
  --accent: oklch(0.720 0.125 58);
  --line: oklch(0.300 0.018 155);
}
```

## Typography

Primary font stack: `Archivo Variable`, `ui-sans-serif`, `system-ui`, `sans-serif`.
Mono stack: `JetBrains Mono Variable`, `ui-monospace`, `SFMono-Regular`, `monospace`.

Display headings use tight but readable spacing, never below `-0.04em`. Body text stays at 16px or larger with increased line height for dark mode.

## Layout

Single-page portfolio with anchors: home, stack, experience, work, contact. Hero is asymmetric with WebGL on the right and concise resume identity on the left. Projects become scroll-led feature panels. Skills use a non-equal bento layout. Work history uses a cinematic vertical rail with impact points.

## Motion

Use Motion for entry, scroll progress, and parallax transforms. Use Three.js for the WebGL scene. Avoid scroll event listeners and React state for continuous animation. Reduced motion collapses scroll effects and slows or stops the WebGL animation.

## Components

Navigation, hero, metrics, skill bento, experience rail, project panels, contact band, WebGL scene. Controls use a 14-16px radius system for panels and full pills only for buttons.
