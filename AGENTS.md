# Repository Guidelines

## Project Structure & Module Organization

Guitar Scale Atlas is a dependency-free static web application. Keep changes within the small, browser-native structure:

- `index.html` defines the Chinese-language interface and semantic page layout.
- `styles.css` contains theme variables, responsive layout, and fretboard presentation.
- `app.js` owns music-theory data, application state, DOM rendering, and interactions.
- `README.md` documents features and local usage.
- `.github/workflows/` contains repository automation.

There is currently no generated output, package manifest, or dedicated test directory. Avoid committing editor files or local server artifacts.

## Build, Test, and Development Commands

No dependency installation or build step is required. Open `index.html` directly for a quick check, or serve the repository locally so browser behavior matches GitHub Pages:

```bash
python3 -m http.server 4173
```

Then visit `http://127.0.0.1:4173`. Use `git diff --check` before submitting to catch whitespace errors, and inspect `git diff` to confirm only intended files changed.

## Coding Style & Naming Conventions

Use two-space indentation in HTML, CSS, and JavaScript. Follow the existing JavaScript style: `const` by default, semicolons, double-quoted strings, trailing commas in multiline structures, `UPPER_SNAKE_CASE` for fixed data, and `camelCase` for functions and variables. Name DOM IDs and CSS classes by purpose (`scaleChordDegree`, `.status-chip`), not appearance. Reuse CSS custom properties under `:root` for colors, spacing, and theme behavior. Keep the project framework-free unless a dependency is clearly justified.

## Testing Guidelines

There is no automated test suite or coverage threshold. Manually verify both Scale and Chord views, root-note changes, every position system (3NPS, pentatonic boxes, and CAGED), label modes, chord overlays, theme persistence, and the 24-fret layout. Check both desktop and narrow mobile widths, and confirm the browser console has no errors. If automated tests are introduced, place them in `tests/` and document their command here and in `README.md`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative, sentence-case subjects such as `Add pentatonic scales` and `Show scale notes above fretboard`. Keep each commit focused. Pull requests should explain the user-visible change, list manual verification performed, and link relevant issues. Include before/after screenshots for visual changes and call out any changes to music-theory formulas or fingering data.
