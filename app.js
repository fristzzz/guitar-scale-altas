const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTE_INDEX = Object.fromEntries(NOTES.map((note, index) => [note, index]));
const FRET_COUNT = 24;
const DEFAULT_THEME = "workshop";
const THEME_STORAGE_KEY = "guitar-scale-atlas-theme";
const STRING_TUNING = [
  { name: "E", pitchClass: 4, gauge: "3.6px" },
  { name: "A", pitchClass: 9, gauge: "3.1px" },
  { name: "D", pitchClass: 2, gauge: "2.8px" },
  { name: "G", pitchClass: 7, gauge: "2.4px" },
  { name: "B", pitchClass: 11, gauge: "2px" },
  { name: "E", pitchClass: 4, gauge: "1.7px" },
];
const DISPLAY_STRING_ORDER = [5, 4, 3, 2, 1, 0];
const SAME_FRET_DELTAS = [0, 5, 10, 15, 19, 24];
const DEGREE_LABELS = {
  0: "1",
  1: "b2",
  2: "2",
  3: "b3",
  4: "3",
  5: "4",
  6: "#4",
  7: "5",
  8: "b6",
  9: "6",
  10: "b7",
  11: "7",
};
const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);

const MODES = {
  Ionian: [0, 2, 4, 5, 7, 9, 11],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
  Phrygian: [0, 1, 3, 5, 7, 8, 10],
  Lydian: [0, 2, 4, 6, 7, 9, 11],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10],
  Aeolian: [0, 2, 3, 5, 7, 8, 10],
  Locrian: [0, 1, 3, 5, 6, 8, 10],
};

const CHORDS = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  7: [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
};

const CHORD_DEGREE_LABELS = {
  0: "1",
  2: "2",
  3: "b3",
  4: "3",
  5: "4",
  6: "b5",
  7: "5",
  8: "#5",
  10: "b7",
  11: "7",
};

const SUPPORTED_CAGED_CHORD_TYPES = new Set(["maj", "min"]);
const CAGED_SHAPES = {
  maj: {
    C: {
      anchorString: 1,
      windowStartOffset: -3,
      windowEndOffset: 0,
      strings: {
        1: [0],
        2: [4],
        3: [7],
        4: [0],
        5: [4],
      },
    },
    A: {
      anchorString: 1,
      windowStartOffset: 0,
      windowEndOffset: 2,
      strings: {
        1: [0],
        2: [7],
        3: [0],
        4: [4],
        5: [7],
      },
    },
    G: {
      anchorString: 0,
      windowStartOffset: -3,
      windowEndOffset: 0,
      strings: {
        0: [0],
        1: [4],
        2: [7],
        3: [0],
        4: [4],
        5: [0],
      },
    },
    E: {
      anchorString: 0,
      windowStartOffset: 0,
      windowEndOffset: 2,
      strings: {
        0: [0],
        1: [7],
        2: [0],
        3: [4],
        4: [7],
        5: [0],
      },
    },
    D: {
      anchorString: 2,
      windowStartOffset: 0,
      windowEndOffset: 3,
      strings: {
        2: [0],
        3: [7],
        4: [0],
        5: [4],
      },
    },
  },
  min: {
    C: {
      anchorString: 1,
      windowStartOffset: -3,
      windowEndOffset: 0,
      strings: {
        1: [0],
        2: [3],
        3: [7],
        4: [0],
        5: [3],
      },
    },
    A: {
      anchorString: 1,
      windowStartOffset: 0,
      windowEndOffset: 2,
      strings: {
        1: [0],
        2: [7],
        3: [0],
        4: [3],
        5: [7],
      },
    },
    G: {
      anchorString: 0,
      windowStartOffset: -4,
      windowEndOffset: 0,
      strings: {
        0: [0],
        1: [3],
        2: [7],
        3: [0],
        4: [3],
        5: [0],
      },
    },
    E: {
      anchorString: 0,
      windowStartOffset: 0,
      windowEndOffset: 2,
      strings: {
        0: [0],
        1: [7],
        2: [0],
        3: [3],
        4: [7],
        5: [0],
      },
    },
    D: {
      anchorString: 2,
      windowStartOffset: 0,
      windowEndOffset: 3,
      strings: {
        2: [0],
        3: [7],
        4: [0],
        5: [3],
      },
    },
  },
};

const THEMES = {
  workshop: {
    label: "Workshop",
    tokens: {
      "--bg-left-glow": "rgba(255, 160, 92, 0.15)",
      "--bg-right-glow": "rgba(121, 184, 170, 0.12)",
      "--bg-start": "#140d0d",
      "--bg-end": "#070607",
      "--grain-glow": "rgba(255, 244, 224, 0.45)",
      "--grain-line": "rgba(255, 255, 255, 0.5)",
      "--ambient-left": "rgba(224, 162, 74, 0.28)",
      "--ambient-right": "rgba(137, 200, 188, 0.22)",
      "--panel": "rgba(16, 11, 10, 0.86)",
      "--panel-strong": "rgba(27, 17, 13, 0.94)",
      "--panel-soft": "rgba(255, 246, 228, 0.08)",
      "--text": "#f6ecdd",
      "--muted": "rgba(246, 236, 221, 0.66)",
      "--accent": "#e0a24a",
      "--accent-soft": "rgba(224, 162, 74, 0.18)",
      "--highlight": "#89c8bc",
      "--root": "#f0bb68",
      "--root-shadow": "rgba(240, 187, 104, 0.4)",
      "--inactive": "rgba(255, 244, 224, 0.1)",
      "--surface-border": "rgba(255, 240, 215, 0.11)",
      "--surface-top": "rgba(255, 249, 240, 0.05)",
      "--surface-bottom": "rgba(255, 249, 240, 0.015)",
      "--card-glow": "rgba(224, 162, 74, 0.1)",
      "--chrome-border": "rgba(255, 239, 215, 0.14)",
      "--chrome-bg": "rgba(0, 0, 0, 0.18)",
      "--chip-bg": "rgba(255, 248, 234, 0.04)",
      "--chip-border": "rgba(255, 239, 215, 0.08)",
      "--fretboard-border": "rgba(255, 238, 207, 0.08)",
      "--fretboard-start": "rgba(18, 10, 7, 0.96)",
      "--fretboard-end": "rgba(30, 17, 12, 0.96)",
      "--fret-header-color": "rgba(246, 236, 221, 0.6)",
      "--fret-header-bg": "rgba(255, 246, 228, 0.03)",
      "--string-label-top": "rgba(255, 246, 228, 0.05)",
      "--string-label-bottom": "rgba(255, 246, 228, 0.02)",
      "--fret-cell-shadow": "rgba(0, 0, 0, 0.24)",
      "--fret-cell-glow-a": "rgba(255, 230, 185, 0.02)",
      "--fret-cell-glow-b": "rgba(255, 230, 185, 0.08)",
      "--fret-cell-glow-c": "rgba(255, 230, 185, 0.02)",
      "--fret-cell-top": "rgba(255, 246, 228, 0.03)",
      "--fret-cell-bottom": "rgba(255, 246, 228, 0.01)",
      "--string-line-start": "rgba(239, 228, 200, 0.3)",
      "--string-line-mid": "rgba(255, 248, 233, 0.86)",
      "--string-line-end": "rgba(239, 228, 200, 0.3)",
      "--string-line-shadow": "rgba(255, 239, 215, 0.1)",
      "--window-glow-a": "rgba(224, 162, 74, 0.12)",
      "--window-glow-b": "rgba(224, 162, 74, 0.04)",
      "--window-top": "rgba(255, 246, 228, 0.06)",
      "--window-bottom": "rgba(255, 246, 228, 0.02)",
      "--nut-color": "rgba(255, 236, 196, 0.72)",
      "--scale-text": "rgba(16, 30, 27, 0.9)",
      "--scale-gloss": "rgba(255, 255, 255, 0.58)",
      "--scale-fill": "rgba(137, 200, 188, 0.58)",
      "--scale-border": "rgba(137, 200, 188, 0.52)",
      "--scale-shadow": "rgba(137, 200, 188, 0.1)",
      "--position-text": "#07110f",
      "--position-gloss": "rgba(255, 255, 255, 0.84)",
      "--position-border": "rgba(137, 200, 188, 0.9)",
      "--position-shadow": "rgba(137, 200, 188, 0.22)",
      "--root-text": "#22150b",
      "--root-gloss": "rgba(255, 251, 242, 0.82)",
      "--root-border": "rgba(240, 187, 104, 0.95)",
      "--marker-fill": "rgba(255, 239, 215, 0.28)",
      "--marker-shadow": "rgba(255, 239, 215, 0.16)",
    },
  },
  midnight: {
    label: "Midnight",
    tokens: {
      "--bg-left-glow": "rgba(68, 132, 255, 0.18)",
      "--bg-right-glow": "rgba(67, 219, 192, 0.14)",
      "--bg-start": "#05101f",
      "--bg-end": "#02050a",
      "--grain-glow": "rgba(201, 235, 255, 0.3)",
      "--grain-line": "rgba(219, 243, 255, 0.38)",
      "--ambient-left": "rgba(81, 126, 255, 0.24)",
      "--ambient-right": "rgba(74, 214, 198, 0.22)",
      "--panel": "rgba(8, 16, 27, 0.9)",
      "--panel-strong": "rgba(13, 22, 36, 0.96)",
      "--panel-soft": "rgba(211, 236, 255, 0.08)",
      "--text": "#eaf5ff",
      "--muted": "rgba(234, 245, 255, 0.68)",
      "--accent": "#7bc9ff",
      "--accent-soft": "rgba(123, 201, 255, 0.16)",
      "--highlight": "#7ae0ce",
      "--root": "#ffd978",
      "--root-shadow": "rgba(255, 217, 120, 0.3)",
      "--inactive": "rgba(224, 242, 255, 0.09)",
      "--surface-border": "rgba(186, 223, 255, 0.14)",
      "--surface-top": "rgba(224, 244, 255, 0.06)",
      "--surface-bottom": "rgba(224, 244, 255, 0.018)",
      "--card-glow": "rgba(123, 201, 255, 0.12)",
      "--chrome-border": "rgba(186, 223, 255, 0.16)",
      "--chrome-bg": "rgba(3, 11, 20, 0.3)",
      "--chip-bg": "rgba(216, 241, 255, 0.05)",
      "--chip-border": "rgba(186, 223, 255, 0.1)",
      "--fretboard-border": "rgba(177, 219, 255, 0.12)",
      "--fretboard-start": "rgba(7, 19, 36, 0.96)",
      "--fretboard-end": "rgba(10, 29, 45, 0.96)",
      "--fret-header-color": "rgba(230, 245, 255, 0.64)",
      "--fret-header-bg": "rgba(217, 241, 255, 0.04)",
      "--string-label-top": "rgba(217, 241, 255, 0.07)",
      "--string-label-bottom": "rgba(217, 241, 255, 0.03)",
      "--fret-cell-shadow": "rgba(0, 0, 0, 0.22)",
      "--fret-cell-glow-a": "rgba(92, 159, 255, 0.03)",
      "--fret-cell-glow-b": "rgba(92, 159, 255, 0.08)",
      "--fret-cell-glow-c": "rgba(92, 159, 255, 0.03)",
      "--fret-cell-top": "rgba(217, 241, 255, 0.03)",
      "--fret-cell-bottom": "rgba(217, 241, 255, 0.01)",
      "--string-line-start": "rgba(194, 220, 255, 0.32)",
      "--string-line-mid": "rgba(233, 247, 255, 0.88)",
      "--string-line-end": "rgba(194, 220, 255, 0.32)",
      "--string-line-shadow": "rgba(123, 201, 255, 0.12)",
      "--window-glow-a": "rgba(123, 201, 255, 0.12)",
      "--window-glow-b": "rgba(123, 201, 255, 0.05)",
      "--window-top": "rgba(217, 241, 255, 0.06)",
      "--window-bottom": "rgba(217, 241, 255, 0.02)",
      "--nut-color": "rgba(216, 236, 255, 0.78)",
      "--scale-text": "rgba(5, 24, 28, 0.92)",
      "--scale-gloss": "rgba(255, 255, 255, 0.62)",
      "--scale-fill": "rgba(122, 224, 206, 0.62)",
      "--scale-border": "rgba(122, 224, 206, 0.58)",
      "--scale-shadow": "rgba(122, 224, 206, 0.12)",
      "--position-text": "#041117",
      "--position-gloss": "rgba(255, 255, 255, 0.88)",
      "--position-border": "rgba(123, 201, 255, 0.92)",
      "--position-shadow": "rgba(123, 201, 255, 0.24)",
      "--root-text": "#2d2102",
      "--root-gloss": "rgba(255, 250, 229, 0.88)",
      "--root-border": "rgba(255, 217, 120, 0.96)",
      "--marker-fill": "rgba(186, 223, 255, 0.26)",
      "--marker-shadow": "rgba(123, 201, 255, 0.14)",
    },
  },
  paper: {
    label: "Paper",
    tokens: {
      "--bg-left-glow": "rgba(211, 171, 118, 0.24)",
      "--bg-right-glow": "rgba(146, 173, 166, 0.18)",
      "--bg-start": "#f4ead8",
      "--bg-end": "#e6dac6",
      "--grain-glow": "rgba(95, 72, 44, 0.16)",
      "--grain-line": "rgba(109, 85, 56, 0.18)",
      "--ambient-left": "rgba(208, 159, 84, 0.2)",
      "--ambient-right": "rgba(94, 143, 132, 0.18)",
      "--panel": "rgba(255, 249, 240, 0.9)",
      "--panel-strong": "rgba(248, 239, 225, 0.98)",
      "--panel-soft": "rgba(89, 62, 32, 0.06)",
      "--text": "#2f2316",
      "--muted": "rgba(47, 35, 22, 0.68)",
      "--accent": "#9b6832",
      "--accent-soft": "rgba(155, 104, 50, 0.13)",
      "--highlight": "#6f9b93",
      "--root": "#d98c3f",
      "--root-shadow": "rgba(217, 140, 63, 0.22)",
      "--inactive": "rgba(91, 66, 42, 0.07)",
      "--surface-border": "rgba(97, 71, 41, 0.14)",
      "--surface-top": "rgba(255, 255, 255, 0.52)",
      "--surface-bottom": "rgba(255, 255, 255, 0.24)",
      "--card-glow": "rgba(214, 154, 81, 0.14)",
      "--chrome-border": "rgba(97, 71, 41, 0.18)",
      "--chrome-bg": "rgba(255, 255, 255, 0.45)",
      "--chip-bg": "rgba(255, 255, 255, 0.35)",
      "--chip-border": "rgba(97, 71, 41, 0.12)",
      "--fretboard-border": "rgba(113, 82, 49, 0.16)",
      "--fretboard-start": "rgba(243, 235, 220, 0.98)",
      "--fretboard-end": "rgba(229, 216, 191, 0.98)",
      "--fret-header-color": "rgba(59, 44, 30, 0.72)",
      "--fret-header-bg": "rgba(92, 64, 35, 0.06)",
      "--string-label-top": "rgba(104, 73, 42, 0.08)",
      "--string-label-bottom": "rgba(104, 73, 42, 0.03)",
      "--fret-cell-shadow": "rgba(86, 60, 31, 0.06)",
      "--fret-cell-glow-a": "rgba(207, 168, 108, 0.03)",
      "--fret-cell-glow-b": "rgba(207, 168, 108, 0.08)",
      "--fret-cell-glow-c": "rgba(207, 168, 108, 0.03)",
      "--fret-cell-top": "rgba(255, 255, 255, 0.3)",
      "--fret-cell-bottom": "rgba(255, 255, 255, 0.12)",
      "--string-line-start": "rgba(125, 102, 74, 0.26)",
      "--string-line-mid": "rgba(253, 250, 244, 0.92)",
      "--string-line-end": "rgba(125, 102, 74, 0.26)",
      "--string-line-shadow": "rgba(93, 64, 34, 0.06)",
      "--window-glow-a": "rgba(155, 104, 50, 0.11)",
      "--window-glow-b": "rgba(155, 104, 50, 0.05)",
      "--window-top": "rgba(255, 255, 255, 0.34)",
      "--window-bottom": "rgba(255, 255, 255, 0.12)",
      "--nut-color": "rgba(149, 113, 72, 0.64)",
      "--scale-text": "rgba(24, 36, 33, 0.92)",
      "--scale-gloss": "rgba(255, 255, 255, 0.56)",
      "--scale-fill": "rgba(111, 155, 147, 0.56)",
      "--scale-border": "rgba(111, 155, 147, 0.48)",
      "--scale-shadow": "rgba(111, 155, 147, 0.1)",
      "--position-text": "#13221f",
      "--position-gloss": "rgba(255, 255, 255, 0.84)",
      "--position-border": "rgba(111, 155, 147, 0.9)",
      "--position-shadow": "rgba(111, 155, 147, 0.16)",
      "--root-text": "#40250c",
      "--root-gloss": "rgba(255, 250, 239, 0.9)",
      "--root-border": "rgba(217, 140, 63, 0.9)",
      "--marker-fill": "rgba(105, 79, 51, 0.2)",
      "--marker-shadow": "rgba(93, 64, 34, 0.08)",
    },
  },
  blueprint: {
    label: "Blueprint",
    tokens: {
      "--bg-left-glow": "rgba(43, 118, 224, 0.22)",
      "--bg-right-glow": "rgba(99, 202, 236, 0.16)",
      "--bg-start": "#0b1f3c",
      "--bg-end": "#061126",
      "--grain-glow": "rgba(176, 223, 255, 0.28)",
      "--grain-line": "rgba(159, 210, 255, 0.28)",
      "--ambient-left": "rgba(48, 128, 247, 0.22)",
      "--ambient-right": "rgba(86, 196, 230, 0.18)",
      "--panel": "rgba(8, 26, 52, 0.9)",
      "--panel-strong": "rgba(8, 33, 61, 0.96)",
      "--panel-soft": "rgba(209, 236, 255, 0.07)",
      "--text": "#edf7ff",
      "--muted": "rgba(237, 247, 255, 0.7)",
      "--accent": "#84cfff",
      "--accent-soft": "rgba(132, 207, 255, 0.16)",
      "--highlight": "#70d6ff",
      "--root": "#ffd26f",
      "--root-shadow": "rgba(255, 210, 111, 0.26)",
      "--inactive": "rgba(235, 247, 255, 0.08)",
      "--surface-border": "rgba(171, 220, 255, 0.16)",
      "--surface-top": "rgba(227, 245, 255, 0.06)",
      "--surface-bottom": "rgba(227, 245, 255, 0.018)",
      "--card-glow": "rgba(112, 214, 255, 0.13)",
      "--chrome-border": "rgba(171, 220, 255, 0.18)",
      "--chrome-bg": "rgba(6, 18, 34, 0.26)",
      "--chip-bg": "rgba(227, 245, 255, 0.05)",
      "--chip-border": "rgba(171, 220, 255, 0.11)",
      "--fretboard-border": "rgba(171, 220, 255, 0.14)",
      "--fretboard-start": "rgba(7, 27, 56, 0.96)",
      "--fretboard-end": "rgba(11, 48, 82, 0.96)",
      "--fret-header-color": "rgba(237, 247, 255, 0.66)",
      "--fret-header-bg": "rgba(227, 245, 255, 0.04)",
      "--string-label-top": "rgba(227, 245, 255, 0.08)",
      "--string-label-bottom": "rgba(227, 245, 255, 0.03)",
      "--fret-cell-shadow": "rgba(0, 0, 0, 0.22)",
      "--fret-cell-glow-a": "rgba(135, 205, 255, 0.02)",
      "--fret-cell-glow-b": "rgba(135, 205, 255, 0.08)",
      "--fret-cell-glow-c": "rgba(135, 205, 255, 0.02)",
      "--fret-cell-top": "rgba(227, 245, 255, 0.03)",
      "--fret-cell-bottom": "rgba(227, 245, 255, 0.01)",
      "--string-line-start": "rgba(198, 228, 255, 0.34)",
      "--string-line-mid": "rgba(247, 252, 255, 0.92)",
      "--string-line-end": "rgba(198, 228, 255, 0.34)",
      "--string-line-shadow": "rgba(132, 207, 255, 0.12)",
      "--window-glow-a": "rgba(132, 207, 255, 0.12)",
      "--window-glow-b": "rgba(132, 207, 255, 0.05)",
      "--window-top": "rgba(227, 245, 255, 0.07)",
      "--window-bottom": "rgba(227, 245, 255, 0.02)",
      "--nut-color": "rgba(203, 234, 255, 0.74)",
      "--scale-text": "rgba(8, 26, 42, 0.95)",
      "--scale-gloss": "rgba(255, 255, 255, 0.62)",
      "--scale-fill": "rgba(112, 214, 255, 0.64)",
      "--scale-border": "rgba(112, 214, 255, 0.56)",
      "--scale-shadow": "rgba(112, 214, 255, 0.14)",
      "--position-text": "#06141f",
      "--position-gloss": "rgba(255, 255, 255, 0.9)",
      "--position-border": "rgba(132, 207, 255, 0.94)",
      "--position-shadow": "rgba(132, 207, 255, 0.24)",
      "--root-text": "#352302",
      "--root-gloss": "rgba(255, 252, 237, 0.9)",
      "--root-border": "rgba(255, 210, 111, 0.95)",
      "--marker-fill": "rgba(182, 224, 255, 0.24)",
      "--marker-shadow": "rgba(132, 207, 255, 0.14)",
    },
  },
  "stage-neon": {
    label: "Stage Neon",
    tokens: {
      "--bg-left-glow": "rgba(255, 74, 185, 0.2)",
      "--bg-right-glow": "rgba(68, 243, 255, 0.14)",
      "--bg-start": "#140717",
      "--bg-end": "#07060d",
      "--grain-glow": "rgba(255, 223, 246, 0.24)",
      "--grain-line": "rgba(241, 207, 255, 0.24)",
      "--ambient-left": "rgba(255, 87, 193, 0.2)",
      "--ambient-right": "rgba(84, 228, 255, 0.2)",
      "--panel": "rgba(21, 10, 28, 0.9)",
      "--panel-strong": "rgba(33, 11, 35, 0.96)",
      "--panel-soft": "rgba(255, 236, 248, 0.06)",
      "--text": "#fff4fb",
      "--muted": "rgba(255, 244, 251, 0.7)",
      "--accent": "#ff84d7",
      "--accent-soft": "rgba(255, 132, 215, 0.16)",
      "--highlight": "#55ecff",
      "--root": "#ffe076",
      "--root-shadow": "rgba(255, 224, 118, 0.28)",
      "--inactive": "rgba(255, 243, 251, 0.08)",
      "--surface-border": "rgba(255, 210, 241, 0.14)",
      "--surface-top": "rgba(255, 244, 251, 0.05)",
      "--surface-bottom": "rgba(255, 244, 251, 0.016)",
      "--card-glow": "rgba(255, 132, 215, 0.14)",
      "--chrome-border": "rgba(255, 210, 241, 0.18)",
      "--chrome-bg": "rgba(9, 6, 15, 0.3)",
      "--chip-bg": "rgba(255, 244, 251, 0.04)",
      "--chip-border": "rgba(255, 210, 241, 0.09)",
      "--fretboard-border": "rgba(255, 210, 241, 0.12)",
      "--fretboard-start": "rgba(23, 11, 28, 0.96)",
      "--fretboard-end": "rgba(39, 14, 45, 0.96)",
      "--fret-header-color": "rgba(255, 244, 251, 0.64)",
      "--fret-header-bg": "rgba(255, 244, 251, 0.03)",
      "--string-label-top": "rgba(255, 244, 251, 0.07)",
      "--string-label-bottom": "rgba(255, 244, 251, 0.03)",
      "--fret-cell-shadow": "rgba(0, 0, 0, 0.26)",
      "--fret-cell-glow-a": "rgba(255, 120, 219, 0.02)",
      "--fret-cell-glow-b": "rgba(255, 120, 219, 0.08)",
      "--fret-cell-glow-c": "rgba(84, 228, 255, 0.04)",
      "--fret-cell-top": "rgba(255, 244, 251, 0.03)",
      "--fret-cell-bottom": "rgba(255, 244, 251, 0.01)",
      "--string-line-start": "rgba(255, 211, 241, 0.28)",
      "--string-line-mid": "rgba(255, 247, 252, 0.9)",
      "--string-line-end": "rgba(255, 211, 241, 0.28)",
      "--string-line-shadow": "rgba(84, 228, 255, 0.14)",
      "--window-glow-a": "rgba(255, 132, 215, 0.1)",
      "--window-glow-b": "rgba(84, 228, 255, 0.06)",
      "--window-top": "rgba(255, 244, 251, 0.06)",
      "--window-bottom": "rgba(255, 244, 251, 0.02)",
      "--nut-color": "rgba(255, 224, 244, 0.68)",
      "--scale-text": "rgba(5, 25, 28, 0.94)",
      "--scale-gloss": "rgba(255, 255, 255, 0.62)",
      "--scale-fill": "rgba(85, 236, 255, 0.64)",
      "--scale-border": "rgba(85, 236, 255, 0.58)",
      "--scale-shadow": "rgba(85, 236, 255, 0.16)",
      "--position-text": "#071015",
      "--position-gloss": "rgba(255, 255, 255, 0.88)",
      "--position-border": "rgba(255, 132, 215, 0.92)",
      "--position-shadow": "rgba(255, 132, 215, 0.24)",
      "--root-text": "#352503",
      "--root-gloss": "rgba(255, 252, 237, 0.92)",
      "--root-border": "rgba(255, 224, 118, 0.94)",
      "--marker-fill": "rgba(255, 214, 243, 0.22)",
      "--marker-shadow": "rgba(84, 228, 255, 0.14)",
    },
  },
  "amber-glow": {
    label: "Amber Glow",
    tokens: {
      "--bg-left-glow": "rgba(255, 170, 72, 0.22)",
      "--bg-right-glow": "rgba(255, 113, 71, 0.12)",
      "--bg-start": "#1b0f08",
      "--bg-end": "#090506",
      "--grain-glow": "rgba(255, 236, 205, 0.3)",
      "--grain-line": "rgba(255, 236, 205, 0.34)",
      "--ambient-left": "rgba(255, 181, 77, 0.24)",
      "--ambient-right": "rgba(255, 118, 84, 0.16)",
      "--panel": "rgba(22, 13, 9, 0.88)",
      "--panel-strong": "rgba(33, 18, 11, 0.96)",
      "--panel-soft": "rgba(255, 244, 225, 0.08)",
      "--text": "#fff1dc",
      "--muted": "rgba(255, 241, 220, 0.68)",
      "--accent": "#ffb85c",
      "--accent-soft": "rgba(255, 184, 92, 0.16)",
      "--highlight": "#9bd9ba",
      "--root": "#ffd58c",
      "--root-shadow": "rgba(255, 213, 140, 0.3)",
      "--inactive": "rgba(255, 244, 225, 0.09)",
      "--surface-border": "rgba(255, 225, 181, 0.14)",
      "--surface-top": "rgba(255, 246, 230, 0.05)",
      "--surface-bottom": "rgba(255, 246, 230, 0.016)",
      "--card-glow": "rgba(255, 184, 92, 0.16)",
      "--chrome-border": "rgba(255, 225, 181, 0.16)",
      "--chrome-bg": "rgba(8, 5, 3, 0.26)",
      "--chip-bg": "rgba(255, 246, 230, 0.04)",
      "--chip-border": "rgba(255, 225, 181, 0.09)",
      "--fretboard-border": "rgba(255, 225, 181, 0.12)",
      "--fretboard-start": "rgba(27, 14, 8, 0.96)",
      "--fretboard-end": "rgba(47, 23, 10, 0.96)",
      "--fret-header-color": "rgba(255, 241, 220, 0.62)",
      "--fret-header-bg": "rgba(255, 246, 230, 0.03)",
      "--string-label-top": "rgba(255, 246, 230, 0.06)",
      "--string-label-bottom": "rgba(255, 246, 230, 0.03)",
      "--fret-cell-shadow": "rgba(0, 0, 0, 0.24)",
      "--fret-cell-glow-a": "rgba(255, 188, 120, 0.03)",
      "--fret-cell-glow-b": "rgba(255, 188, 120, 0.08)",
      "--fret-cell-glow-c": "rgba(255, 188, 120, 0.03)",
      "--fret-cell-top": "rgba(255, 246, 230, 0.03)",
      "--fret-cell-bottom": "rgba(255, 246, 230, 0.01)",
      "--string-line-start": "rgba(255, 223, 186, 0.28)",
      "--string-line-mid": "rgba(255, 250, 241, 0.9)",
      "--string-line-end": "rgba(255, 223, 186, 0.28)",
      "--string-line-shadow": "rgba(255, 184, 92, 0.12)",
      "--window-glow-a": "rgba(255, 184, 92, 0.12)",
      "--window-glow-b": "rgba(255, 184, 92, 0.04)",
      "--window-top": "rgba(255, 246, 230, 0.06)",
      "--window-bottom": "rgba(255, 246, 230, 0.02)",
      "--nut-color": "rgba(255, 225, 181, 0.7)",
      "--scale-text": "rgba(19, 33, 29, 0.94)",
      "--scale-gloss": "rgba(255, 255, 255, 0.6)",
      "--scale-fill": "rgba(155, 217, 186, 0.6)",
      "--scale-border": "rgba(155, 217, 186, 0.54)",
      "--scale-shadow": "rgba(155, 217, 186, 0.12)",
      "--position-text": "#0a110e",
      "--position-gloss": "rgba(255, 255, 255, 0.86)",
      "--position-border": "rgba(155, 217, 186, 0.9)",
      "--position-shadow": "rgba(255, 184, 92, 0.22)",
      "--root-text": "#41290d",
      "--root-gloss": "rgba(255, 251, 240, 0.9)",
      "--root-border": "rgba(255, 213, 140, 0.94)",
      "--marker-fill": "rgba(255, 225, 181, 0.24)",
      "--marker-shadow": "rgba(255, 184, 92, 0.14)",
    },
  },
};

const state = {
  viewMode: "scale",
  rootNote: "C",
  mode: "Ionian",
  position: 1,
  chordType: "maj",
  chordShape: "E",
  cagedEnabled: false,
  chordLabelMode: "degree",
  theme: DEFAULT_THEME,
  labelMode: "note",
  emphasizeRoot: true,
};

const elements = {
  viewMode: document.querySelector("#viewMode"),
  rootNoteGroup: document.querySelector("#rootNoteGroup"),
  modeGroup: document.querySelector("#modeGroup"),
  positionGroup: document.querySelector("#positionGroup"),
  chordTypeGroup: document.querySelector("#chordTypeGroup"),
  chordShapeGroup: document.querySelector("#chordShapeGroup"),
  labelModeGroup: document.querySelector("#labelModeGroup"),
  rootNote: document.querySelector("#rootNote"),
  mode: document.querySelector("#mode"),
  position: document.querySelector("#position"),
  chordType: document.querySelector("#chordType"),
  chordShape: document.querySelector("#chordShape"),
  theme: document.querySelector("#theme"),
  labelMode: document.querySelector("#labelMode"),
  emphasizeRoot: document.querySelector("#emphasizeRoot"),
  fretboard: document.querySelector("#fretboard"),
  selectionSummary: document.querySelector("#selectionSummary"),
  scaleNotesSummary: document.querySelector("#scaleNotesSummary"),
  windowSummary: document.querySelector("#windowSummary"),
  formulaSummary: document.querySelector("#formulaSummary"),
  systemSummary: document.querySelector("#systemSummary"),
  panelNote: document.querySelector("#panelNote"),
  legendPracticeText: document.querySelector("#legendPracticeText"),
  legendLabelText: document.querySelector("#legendLabelText"),
  legendWindowText: document.querySelector("#legendWindowText"),
  cagedHint: document.querySelector("#cagedHint"),
};

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredTheme(themeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {}
}

function resolveThemeId(themeId) {
  return Object.hasOwn(THEMES, themeId) ? themeId : DEFAULT_THEME;
}

function applyTheme(themeId, { persist = true } = {}) {
  const resolvedThemeId = resolveThemeId(themeId);
  const root = document.documentElement;
  const { tokens } = THEMES[resolvedThemeId];

  Object.entries(tokens).forEach(([token, value]) => {
    root.style.setProperty(token, value);
  });

  root.dataset.theme = resolvedThemeId;
  state.theme = resolvedThemeId;

  if (elements.theme) {
    elements.theme.value = resolvedThemeId;
  }

  if (persist) {
    writeStoredTheme(resolvedThemeId);
  }
}

function createOption(value, label) {
  const option = document.createElement("option");
  option.value = String(value);
  option.textContent = label;
  return option;
}

function populateControls() {
  NOTES.forEach((note) => {
    elements.rootNote.appendChild(createOption(note, note));
  });

  Object.keys(MODES).forEach((modeName) => {
    elements.mode.appendChild(createOption(modeName, modeName));
  });

  for (let position = 1; position <= 7; position += 1) {
    elements.position.appendChild(createOption(position, `Position ${position}`));
  }

  Object.entries(THEMES).forEach(([themeId, theme]) => {
    elements.theme.appendChild(createOption(themeId, theme.label));
  });

  Object.keys(CHORDS).forEach((chordType) => {
    elements.chordType.appendChild(createOption(chordType, chordType));
  });

  updateViewModeButtons();
  elements.rootNote.value = state.rootNote;
  elements.mode.value = state.mode;
  elements.position.value = String(state.position);
  elements.chordType.value = state.chordType;
  elements.theme.value = state.theme;
  elements.emphasizeRoot.checked = state.emphasizeRoot;
}

function updateViewModeButtons() {
  [...elements.viewMode.querySelectorAll(".pill")].forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.value === state.viewMode);
  });
}

function updateChordShapeButtons() {
  [...elements.chordShape.querySelectorAll(".pill")].forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.value === state.chordShape);
    pill.disabled = !state.cagedEnabled;
  });
}

function getActiveLabelMode() {
  return state.viewMode === "chord" ? state.chordLabelMode : state.labelMode;
}

function updateLabelModeButtons() {
  const activeLabelMode = getActiveLabelMode();

  [...elements.labelMode.querySelectorAll(".pill")].forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.value === activeLabelMode);
  });
}

function updateViewModeUI() {
  const isChordView = state.viewMode === "chord";
  state.cagedEnabled = isChordView && SUPPORTED_CAGED_CHORD_TYPES.has(state.chordType);

  elements.modeGroup.classList.toggle("is-hidden", isChordView);
  elements.positionGroup.classList.toggle("is-hidden", isChordView);
  elements.chordTypeGroup.classList.toggle("is-hidden", !isChordView);
  elements.chordShapeGroup.classList.toggle("is-hidden", !isChordView);

  elements.mode.disabled = isChordView;
  elements.position.disabled = isChordView;
  elements.chordType.disabled = !isChordView;
  elements.cagedHint.classList.toggle("is-hidden", state.cagedEnabled || !isChordView);
  updateChordShapeButtons();
  updateLabelModeButtons();
}

function buildPositionTemplate(intervals, position) {
  const startDegreeIndex = position - 1;
  const noteSequence = [];
  let degreeIndex = startDegreeIndex;
  let octave = 0;
  let previousPitch = -Infinity;

  for (let index = 0; index < STRING_TUNING.length * 3; index += 1) {
    let pitch = intervals[degreeIndex] + octave * 12;

    if (pitch <= previousPitch) {
      octave += 1;
      pitch = intervals[degreeIndex] + octave * 12;
    }

    noteSequence.push({
      degree: degreeIndex + 1,
      interval: intervals[degreeIndex],
      pitch,
    });

    previousPitch = pitch;
    degreeIndex = (degreeIndex + 1) % intervals.length;
  }

  const strings = STRING_TUNING.map((_, stringIndex) => {
    const slice = noteSequence.slice(stringIndex * 3, stringIndex * 3 + 3);
    return slice.map((note) => ({
      degree: note.degree,
      interval: note.interval,
      fretOffset: note.pitch - SAME_FRET_DELTAS[stringIndex],
    }));
  });

  const allOffsets = strings.flatMap((stringNotes) => stringNotes.map((note) => note.fretOffset));

  return {
    strings,
    window: {
      min: Math.min(...allOffsets),
      max: Math.max(...allOffsets),
    },
  };
}

function getLowERootFret(rootNote) {
  return (NOTE_INDEX[rootNote] - STRING_TUNING[0].pitchClass + 12) % 12;
}

function getStringRootFret(rootNote, stringIndex) {
  return (NOTE_INDEX[rootNote] - STRING_TUNING[stringIndex].pitchClass + NOTES.length) % NOTES.length;
}

function scoreWindowFit(windowStart, windowEnd, template, rootIndex) {
  const counts = [];
  let totalMatches = 0;

  STRING_TUNING.forEach((stringData, stringIndex) => {
    const allowedIntervals = new Set(
      template.strings[stringIndex].map((entry) => entry.interval),
    );
    let count = 0;

    for (let fret = windowStart; fret <= windowEnd; fret += 1) {
      const pitchClass = (stringData.pitchClass + fret) % NOTES.length;
      const interval = (pitchClass - rootIndex + NOTES.length) % NOTES.length;

      if (allowedIntervals.has(interval)) {
        count += 1;
      }
    }

    counts.push(count);
    totalMatches += count;
  });

  const penalty = counts.reduce((sum, count) => sum + Math.abs(3 - count) * 4, 0);

  return {
    counts,
    score: totalMatches * 10 - penalty,
  };
}

function resolveVisibleWindow(template, rootFret, rootIndex) {
  const width = template.window.max - template.window.min;
  const idealStart = rootFret + template.window.min;
  const candidateStarts = new Set();
  const maxStart = Math.max(0, FRET_COUNT - width);

  for (let shift = -24; shift <= 24; shift += 12) {
    const shifted = idealStart + shift;
    const base = Math.max(0, Math.min(maxStart, shifted));

    candidateStarts.add(base);
    candidateStarts.add(Math.max(0, Math.min(maxStart, base - 1)));
    candidateStarts.add(Math.max(0, Math.min(maxStart, base + 1)));
  }

  let bestWindow = null;

  candidateStarts.forEach((windowStart) => {
    const windowEnd = windowStart + width;
    const fit = scoreWindowFit(windowStart, windowEnd, template, rootIndex);

    if (!bestWindow || fit.score > bestWindow.score) {
      bestWindow = {
        windowStart,
        windowEnd,
        counts: fit.counts,
        score: fit.score,
      };
    }
  });

  return bestWindow;
}

function getHighlightedNotes(currentState) {
  const intervals = MODES[currentState.mode];
  const modeIntervals = new Set(intervals);
  const rootIndex = NOTE_INDEX[currentState.rootNote];
  const rootFret = getLowERootFret(currentState.rootNote);
  const template = buildPositionTemplate(intervals, currentState.position);
  const { windowStart, windowEnd } = resolveVisibleWindow(template, rootFret, rootIndex);
  const notes = [];

  STRING_TUNING.forEach((stringData, stringIndex) => {
    const allowedIntervals = new Set(
      template.strings[stringIndex].map((entry) => entry.interval),
    );

    for (let fret = 0; fret <= FRET_COUNT; fret += 1) {
      const pitchClass = (stringData.pitchClass + fret) % NOTES.length;
      const interval = (pitchClass - rootIndex + NOTES.length) % NOTES.length;

      if (!modeIntervals.has(interval)) {
        continue;
      }

      notes.push({
        stringIndex,
        fret,
        noteName: NOTES[pitchClass],
        interval,
        degree: DEGREE_LABELS[interval],
        isRoot: interval === 0,
        inPosition:
          fret >= windowStart &&
          fret <= windowEnd &&
          allowedIntervals.has(interval),
      });
    }
  });

  return {
    notes,
    windowStart,
    windowEnd,
  };
}

function getModeFormula(modeName) {
  return MODES[modeName].map((interval) => DEGREE_LABELS[interval]).join(" · ");
}

function getModeNoteNames(rootNote, modeName) {
  const rootIndex = NOTE_INDEX[rootNote];

  return MODES[modeName].map((interval) => NOTES[(rootIndex + interval) % NOTES.length]);
}

function getChordFormula(chordType) {
  return CHORDS[chordType].map((interval) => CHORD_DEGREE_LABELS[interval]).join(" · ");
}

function getHighlightedChordNotes(currentState) {
  const rootIndex = NOTE_INDEX[currentState.rootNote];
  const chordIntervals = new Set(CHORDS[currentState.chordType]);
  const shapeContext = SUPPORTED_CAGED_CHORD_TYPES.has(currentState.chordType)
    ? getHighlightedChordShape(currentState)
    : null;
  const shapeNoteKeys = new Set(
    shapeContext ? shapeContext.notes.map((note) => `${note.stringIndex}-${note.fret}`) : [],
  );
  const notes = [];

  STRING_TUNING.forEach((stringData, stringIndex) => {
    for (let fret = 0; fret <= FRET_COUNT; fret += 1) {
      const pitchClass = (stringData.pitchClass + fret) % NOTES.length;
      const interval = (pitchClass - rootIndex + NOTES.length) % NOTES.length;

      if (!chordIntervals.has(interval)) {
        continue;
      }

      notes.push({
        stringIndex,
        fret,
        noteName: NOTES[pitchClass],
        interval,
        degree: CHORD_DEGREE_LABELS[interval],
        isRoot: interval === 0,
        inShape: shapeNoteKeys.has(`${stringIndex}-${fret}`),
      });
    }
  });

  return {
    notes,
    windowStart: shapeContext ? shapeContext.windowStart : null,
    windowEnd: shapeContext ? shapeContext.windowEnd : null,
  };
}

function getHighlightedChordShape(currentState) {
  const shape = CAGED_SHAPES[currentState.chordType]?.[currentState.chordShape];

  if (!shape) {
    return {
      notes: [],
      windowStart: null,
      windowEnd: null,
    };
  }

  let anchorFret = getStringRootFret(currentState.rootNote, shape.anchorString);

  while (anchorFret + shape.windowStartOffset < 0) {
    anchorFret += 12;
  }

  while (anchorFret + shape.windowEndOffset > FRET_COUNT) {
    anchorFret -= 12;
  }

  const windowStart = anchorFret + shape.windowStartOffset;
  const windowEnd = anchorFret + shape.windowEndOffset;
  const rootIndex = NOTE_INDEX[currentState.rootNote];
  const notes = [];

  Object.entries(shape.strings).forEach(([stringIndexRaw, allowedIntervals]) => {
    const stringIndex = Number(stringIndexRaw);
    const stringData = STRING_TUNING[stringIndex];
    const allowedIntervalSet = new Set(allowedIntervals);

    for (let fret = windowStart; fret <= windowEnd; fret += 1) {
      const pitchClass = (stringData.pitchClass + fret) % NOTES.length;
      const interval = (pitchClass - rootIndex + NOTES.length) % NOTES.length;

      if (!allowedIntervalSet.has(interval)) {
        continue;
      }

      notes.push({
        stringIndex,
        fret,
        noteName: NOTES[pitchClass],
        interval,
        degree: CHORD_DEGREE_LABELS[interval],
        isRoot: interval === 0,
      });
    }
  });

  return {
    notes,
    windowStart,
    windowEnd,
  };
}

function getRenderContext(currentState) {
  if (currentState.viewMode === "chord") {
    const cagedEnabled = SUPPORTED_CAGED_CHORD_TYPES.has(currentState.chordType);

    return {
      ...getHighlightedChordNotes(currentState),
      summary: cagedEnabled
        ? `${currentState.rootNote} ${currentState.chordType} · ${currentState.chordShape} Shape`
        : `${currentState.rootNote} ${currentState.chordType}`,
      windowSummary: cagedEnabled
        ? `24 Frets · ${currentState.chordShape} Shape`
        : "24 Frets · Full Chord Map",
      formulaSummary: getChordFormula(currentState.chordType),
      systemSummary: cagedEnabled ? "Chord View · CAGED" : "Chord View",
      panelNote: cagedEnabled
        ? "整块 24 品上的和弦构成音都会显示，当前选中的 CAGED shape 会被额外强调，根音仍使用琥珀色突出。"
        : "整块 24 品上的和弦构成音都会显示，根音会在开启时使用琥珀色突出，便于快速观察整板和弦分布。",
      legendPracticeText: cagedEnabled
        ? "先固定根音，再切换 C/A/G/E/D shape，观察同一和弦在指板不同区域的 CAGED 连接方式。"
        : "先固定根音，再切换常用和弦类型，观察 1、3、5、7 在六根弦上的重复分布与连接方式。",
      legendLabelText: "和弦视图支持在音名和和弦音程之间切换。用音程看结构，用音名看实际构成音。",
      legendWindowText: cagedEnabled
        ? "当前会保留整板和弦音，同时只对一个标准 CAGED shape 主区域做更强高亮，避免把和弦图挤成一整片。"
        : "和弦视图不会使用 3NPS Position 过滤，整块 24 品都会显示当前和弦音；非 maj/min 时 CAGED shape 高亮不可用。",
      scaleNotesSummary: "",
    };
  }

  const scaleContext = getHighlightedNotes(currentState);
  return {
    ...scaleContext,
    summary: `${currentState.rootNote} ${currentState.mode} · Position ${currentState.position}`,
    windowSummary: `24 Frets · Position Window ${scaleContext.windowStart}-${scaleContext.windowEnd}`,
    formulaSummary: getModeFormula(currentState.mode),
    systemSummary: "3 Notes Per String",
    panelNote: "整块 24 品上的调内音都会显示，当前 3NPS 把位窗口会使用更强的高亮强调，根音会在开启时使用琥珀色突出。",
    legendPracticeText: "先固定同一个主音，依次切换七个调式与 Position 1-7，观察根音和级数在横向与纵向上的位移关系。",
    legendLabelText: "使用“音名”模式训练听觉和命名，使用“级数”模式训练调式功能感与即兴映射。",
    legendWindowText: "指板中较亮的木纹区域代表当前把位窗口。整块 24 品仍会显示全部调内音，方便你同时观察单个指型与全指板分布。",
    scaleNotesSummary: getModeNoteNames(currentState.rootNote, currentState.mode).join(", "),
  };
}

function renderFretboard(currentState) {
  const {
    notes,
    windowStart,
    windowEnd,
    summary,
    windowSummary,
    formulaSummary,
    systemSummary,
    panelNote,
    legendPracticeText,
    legendLabelText,
    legendWindowText,
    scaleNotesSummary,
  } = getRenderContext(currentState);
  const highlightedMap = new Map(
    notes.map((note) => [`${note.stringIndex}-${note.fret}`, note]),
  );

  elements.fretboard.innerHTML = "";

  const corner = document.createElement("div");
  corner.className = "fret-header";
  corner.textContent = "String";
  elements.fretboard.appendChild(corner);

  for (let fret = 0; fret <= FRET_COUNT; fret += 1) {
    const headerCell = document.createElement("div");
    headerCell.className = "fret-header";
    headerCell.textContent = fret;
    elements.fretboard.appendChild(headerCell);
  }

  DISPLAY_STRING_ORDER.forEach((stringIndex) => {
    const stringData = STRING_TUNING[stringIndex];
    const labelCell = document.createElement("div");
    labelCell.className = "string-label";
    labelCell.textContent = stringData.name;
    elements.fretboard.appendChild(labelCell);

    for (let fret = 0; fret <= FRET_COUNT; fret += 1) {
      const cell = document.createElement("div");
      cell.className = "fret-cell";
      cell.style.setProperty("--string-gauge", stringData.gauge);

      if (fret === 0) {
        cell.classList.add("is-nut");
      }

      if (
        currentState.viewMode === "scale" &&
        fret >= windowStart &&
        fret <= windowEnd
      ) {
        cell.classList.add("is-window");
      }

      const marker = document.createElement("div");
      marker.className = "note-dot";

      const highlight = highlightedMap.get(`${stringIndex}-${fret}`);

      if (highlight) {
        marker.classList.add("is-scale");
        if (currentState.viewMode === "chord" && highlight.inShape) {
          marker.classList.add("is-chord-shape");
        }
        if (currentState.viewMode === "scale" && highlight.inPosition) {
          marker.classList.add("is-position");
        }
        marker.textContent =
          currentState.viewMode === "chord"
            ? currentState.chordLabelMode === "degree"
              ? highlight.degree
              : highlight.noteName
            : currentState.labelMode === "degree"
              ? highlight.degree
              : highlight.noteName;

        if (highlight.isRoot) {
          marker.classList.add(currentState.emphasizeRoot ? "is-root" : "is-muted-root");
        }
      }

      cell.appendChild(marker);
      elements.fretboard.appendChild(cell);
    }
  });

  const markerLabel = document.createElement("div");
  markerLabel.className = "marker-row-label";
  markerLabel.textContent = "Mark";
  elements.fretboard.appendChild(markerLabel);

  for (let fret = 0; fret <= FRET_COUNT; fret += 1) {
    const markerCell = document.createElement("div");
    markerCell.className = "marker-row-label";

    if (FRET_MARKERS.has(fret)) {
      const fretMarker = document.createElement("div");
      fretMarker.className = "fret-marker";
      markerCell.appendChild(fretMarker);
    }

    elements.fretboard.appendChild(markerCell);
  }

  elements.selectionSummary.textContent = summary;
  elements.scaleNotesSummary.textContent = scaleNotesSummary;
  elements.scaleNotesSummary.classList.toggle("is-hidden", currentState.viewMode !== "scale");
  elements.windowSummary.textContent = windowSummary;
  elements.formulaSummary.textContent = formulaSummary;
  elements.systemSummary.textContent = systemSummary;
  elements.panelNote.textContent = panelNote;
  elements.legendPracticeText.textContent = legendPracticeText;
  elements.legendLabelText.textContent = legendLabelText;
  elements.legendWindowText.textContent = legendWindowText;
}

function attachEvents() {
  elements.viewMode.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button) {
      return;
    }

    state.viewMode = button.dataset.value;
    updateViewModeButtons();
    updateViewModeUI();
    renderFretboard(state);
  });

  elements.rootNote.addEventListener("change", (event) => {
    state.rootNote = event.target.value;
    renderFretboard(state);
  });

  elements.mode.addEventListener("change", (event) => {
    state.mode = event.target.value;
    renderFretboard(state);
  });

  elements.position.addEventListener("change", (event) => {
    state.position = Number(event.target.value);
    renderFretboard(state);
  });

  elements.chordType.addEventListener("change", (event) => {
    state.chordType = event.target.value;
    updateViewModeUI();
    renderFretboard(state);
  });

  elements.chordShape.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button || !state.cagedEnabled) {
      return;
    }

    state.chordShape = button.dataset.value;
    updateChordShapeButtons();
    renderFretboard(state);
  });

  elements.theme.addEventListener("change", (event) => {
    applyTheme(event.target.value);
  });

  elements.labelMode.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button) {
      return;
    }

    if (state.viewMode === "chord") {
      state.chordLabelMode = button.dataset.value;
    } else {
      state.labelMode = button.dataset.value;
    }

    updateLabelModeButtons();
    renderFretboard(state);
  });

  elements.emphasizeRoot.addEventListener("change", (event) => {
    state.emphasizeRoot = event.target.checked;
    renderFretboard(state);
  });
}

function runSelfCheck() {
  NOTES.forEach((rootNote) => {
    Object.keys(MODES).forEach((modeName) => {
      for (let position = 1; position <= 7; position += 1) {
        const result = getHighlightedNotes({
          rootNote,
          mode: modeName,
          position,
          labelMode: "note",
          emphasizeRoot: true,
        });

        const perStringCounts = STRING_TUNING.map((_, stringIndex) =>
          result.notes.filter((note) => note.stringIndex === stringIndex && note.inPosition).length,
        );
        const fullScaleCounts = STRING_TUNING.map((_, stringIndex) =>
          result.notes.filter((note) => note.stringIndex === stringIndex).length,
        );

        console.assert(
          result.windowStart >= 0 && result.windowEnd <= FRET_COUNT,
          `Visible window should stay inside board for ${rootNote} ${modeName} position ${position}.`,
        );
        console.assert(
          perStringCounts.every((count) => count >= 2 && count <= 3),
          `Each string should keep 2-3 notes in ${rootNote} ${modeName} position ${position}.`,
        );
        console.assert(
          fullScaleCounts.every((count) => count >= 14),
          `Full-board rendering should expose the whole mode across 24 frets for ${rootNote} ${modeName}.`,
        );
        console.assert(
          getModeNoteNames(rootNote, modeName).length === MODES[modeName].length,
          `Mode note list should expose all scale tones for ${rootNote} ${modeName}.`,
        );
        console.assert(
          new Set(getModeNoteNames(rootNote, modeName)).size === MODES[modeName].length,
          `Mode note list should not duplicate note names for ${rootNote} ${modeName}.`,
        );
      }
    });
  });

  NOTES.forEach((rootNote) => {
    Object.keys(CHORDS).forEach((chordType) => {
      const result = getHighlightedChordNotes({
        rootNote,
        chordType,
      });
      const allowedIntervals = new Set(CHORDS[chordType]);

      console.assert(
        result.notes.length >= STRING_TUNING.length * CHORDS[chordType].length,
        `Chord rendering should produce repeated notes across the board for ${rootNote} ${chordType}.`,
      );
      console.assert(
        result.notes.every((note) => allowedIntervals.has(note.interval)),
        `Chord rendering should only contain chord tones for ${rootNote} ${chordType}.`,
      );
      console.assert(
        result.notes.some((note) => note.isRoot),
        `Chord rendering should include at least one root for ${rootNote} ${chordType}.`,
      );
    });
  });

  NOTES.forEach((rootNote) => {
    ["maj", "min"].forEach((chordType) => {
      ["C", "A", "G", "E", "D"].forEach((chordShape) => {
        const result = getHighlightedChordShape({
          rootNote,
          chordType,
          chordShape,
        });
        const allowedIntervals = new Set(CHORDS[chordType]);

        console.assert(
          result.windowStart >= 0 && result.windowEnd <= FRET_COUNT,
          `CAGED shape window should stay on board for ${rootNote} ${chordType} ${chordShape}.`,
        );
        console.assert(
          result.notes.length > 0,
          `CAGED shape should produce notes for ${rootNote} ${chordType} ${chordShape}.`,
        );
        console.assert(
          result.notes.every((note) => allowedIntervals.has(note.interval)),
          `CAGED shape should only contain chord tones for ${rootNote} ${chordType} ${chordShape}.`,
        );
        console.assert(
          result.notes.some((note) => note.isRoot),
          `CAGED shape should include a root for ${rootNote} ${chordType} ${chordShape}.`,
        );
      });
    });
  });
}

state.theme = resolveThemeId(readStoredTheme());
populateControls();
applyTheme(state.theme, { persist: false });
updateViewModeUI();
attachEvents();
runSelfCheck();
renderFretboard(state);
