import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';

// Judge0 API Configuration (RapidAPI Extra CE format)
const JUDGE0_CONFIG = {
    BASE_URL: 'https://judge0-extra-ce.p.rapidapi.com',
    API_KEY: 'c88645d450msh5e2f974ef1b601fp18d783jsne06a11ccd96a',
    API_HOST: 'judge0-extra-ce.p.rapidapi.com'
};

// Judge0 Language ID Mapping (Correct for YOUR Extra CE instance)
const JUDGE0_LANGUAGE_IDS = {
    javascript: null,  // ❌ Not available in your instance
    python: 25,        // ✅ Python for ML (3.11.2) - best option
    java: 4,           // ✅ Java (OpenJDK 14.0.1)
    cpp: 2,           // ✅ C++ (Clang 10.0.1) 
    csharp: 21,       // ✅ C# (.NET Core SDK 3.1.406)
    typescript: null, // ❌ Not available in your instance
    go: null,         // ❌ Not available in your instance
    rust: null,       // ❌ Not available in your instance
    php: null,        // ❌ Not available in your instance
    swift: null,      // ❌ Not available in your instance
    kotlin: null,     // ❌ Not available in your instance
    dart: null,       // ❌ Not available in your instance
    ruby: null,       // ❌ Not available in your instance
    scala: null,      // ❌ Not available in your instance
    c: 1              // ✅ C (Clang 10.0.1)
};

// OpenAI Configuration
const OPENAI_CONFIG = {
    // Use environment variable to avoid exposing secrets in source code
    API_KEY: process.env.REACT_APP_OPENAI_API_KEY || '',
    BASE_URL: 'https://api.openai.com/v1/chat/completions'
};

/*
  🎨 QUANTUM CODEPAD - DA VINCI RENAISSANCE EDITION 🎨
  • LEONARDO-INSPIRED MECHANICAL CONTRAPTIONS
  • SACRED GEOMETRY & GOLDEN RATIO LAYOUTS
  • FLUID DYNAMICS & PARTICLE PHYSICS
  • RENAISSANCE ARCHITECTURAL ELEMENTS
  • ANATOMICAL & BOTANICAL MOTIFS
  • ADVANCED LIGHTING & SHADOW SYSTEMS
  • CLASSICAL ART MEETS QUANTUM SCIENCE
  • MATHEMATICAL PRECISION & ARTISTIC MASTERY
*/

// Da Vinci Renaissance CSS Animations & Ultra-Luxurious Styling
const renaissanceStyles = `
/* Import ULTRA-PREMIUM Fonts for Maximum Visual Impact */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

/* Additional Professional Coding Fonts */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Source+Code+Pro:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@300;400;500;600;700&display=swap');

/* Import Cascadia Code and Victor Mono from CDN */
@import url('https://cdn.jsdelivr.net/npm/@fontsource/cascadia-code@4.2.1/400.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/victor-mono@4.2.1/400.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/hack@4.2.1/400.css');

/* 🌐 ULTRA-PREMIUM GLASS SYSTEM - CRYSTAL PERFECTION */
:root {
    /* Advanced Glass Material Properties */
    --glass-primary: rgba(248, 251, 255, 0.12);
    --glass-secondary: rgba(240, 248, 255, 0.08);
    --glass-border-primary: rgba(255, 255, 255, 0.18);
    --glass-border-secondary: rgba(255, 255, 255, 0.12);
    --glass-highlight: rgba(255, 255, 255, 0.25);
    --glass-shadow-primary: rgba(0, 0, 0, 0.05);
    --glass-shadow-secondary: rgba(0, 0, 0, 0.02);
    --glass-emerald-tint: rgba(16, 185, 129, 0.04);
    --glass-emerald-glow: rgba(16, 185, 129, 0.08);
    
    /* Advanced Lighting Variables */
    --light-source-1: rgba(255, 255, 255, 0.3);
    --light-source-2: rgba(220, 240, 255, 0.2);
    --ambient-light: rgba(248, 250, 252, 0.15);
    --specular-highlight: rgba(255, 255, 255, 0.4);
    
    /* Refraction & Dispersion */
    --refraction-red: rgba(255, 100, 100, 0.02);
    --refraction-green: rgba(100, 255, 100, 0.02);
    --refraction-blue: rgba(100, 100, 255, 0.02);
}

/* ULTRA-PREMIUM SURFACE IMPERFECTION TEXTURES */
@keyframes glassShimmer {
    0%, 100% { 
        background-position: -200% 0, 0 -200%, 200% 0, 0 200%;
        opacity: 0.3;
    }
    25% { 
        background-position: -100% 0, 0 -100%, 100% 0, 0 100%;
        opacity: 0.5;
    }
    50% { 
        background-position: 0% 0, 0 0%, 0% 0, 0 0%;
        opacity: 0.7;
    }
    75% { 
        background-position: 100% 0, 0 100%, -100% 0, 0 -100%;
        opacity: 0.5;
    }
}

@keyframes subtleFloat {
    0%, 100% { 
        transform: translateY(0px) translateX(0px) rotateY(0deg);
    }
    33% { 
        transform: translateY(-1px) translateX(0.5px) rotateY(0.2deg);
    }
    66% { 
        transform: translateY(0.5px) translateX(-0.3px) rotateY(-0.1deg);
    }
}

@keyframes prismaticDispersion {
    0%, 100% {
        filter: hue-rotate(0deg) saturate(100%) brightness(100%);
    }
    25% {
        filter: hue-rotate(1deg) saturate(102%) brightness(101%);
    }
    50% {
        filter: hue-rotate(2deg) saturate(104%) brightness(102%);
    }
    75% {
        filter: hue-rotate(1deg) saturate(102%) brightness(101%);
    }
}

/* Reset & consistent typography */
*, *::before, *::after {
    box-sizing: border-box;
}

/* Crystal-clear text rendering for all text elements */
* {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
    text-rendering: optimizeSpeed;
    font-smooth: always;
}

/* COMPLETELY REMOVE ALL BLUR FROM TEXT ELEMENTS */
.monaco-editor,
.monaco-editor *,
.monaco-editor .view-lines,
.monaco-editor .view-line,
.monaco-editor .view-line span,
.monaco-editor .mtk1,
.monaco-editor .mtk2,
.monaco-editor .mtk3,
.monaco-editor .mtk4,
.monaco-editor .mtk5,
.monaco-editor .mtk6,
.monaco-editor .mtk7,
.monaco-editor .mtk17,
.monaco-editor .mtk22,
.emerald-terminal-text,
code, pre, kbd, samp, textarea,
.renaissance-panel span,
.renaissance-panel p,
.renaissance-panel div,
.renaissance-panel label,
.renaissance-panel input,
.renaissance-terminal span,
.renaissance-terminal p,
.renaissance-terminal div,
.leonardo-button span,
.leonardo-button p,
.leonardo-button div,
p, span, div, h1, h2, h3, h4, h5, h6, label, input, button {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    filter: none !important;
    -webkit-filter: none !important;
}

html, body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    background: 
        /* Enhanced multi-layer aurora with more sophisticated gradients */
        radial-gradient(ellipse 150% 100% at top left, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse 120% 80% at top right, rgba(236, 72, 153, 0.12) 0%, transparent 45%),
        radial-gradient(ellipse 100% 60% at center right, rgba(251, 191, 36, 0.1) 0%, transparent 40%),
        radial-gradient(ellipse 130% 90% at center left, rgba(14, 165, 233, 0.13) 0%, transparent 48%),
        radial-gradient(ellipse 110% 70% at bottom center, rgba(139, 92, 246, 0.14) 0%, transparent 52%),
        radial-gradient(ellipse 90% 50% at bottom left, rgba(16, 185, 129, 0.11) 0%, transparent 38%),
        radial-gradient(ellipse 140% 85% at top center, rgba(244, 63, 94, 0.08) 0%, transparent 35%),
        /* Sophisticated base gradient with more color stops */
        linear-gradient(135deg, 
            #fefefe 0%, 
            #f9fafb 8%,
            #f3f4f6 16%,
            #e5e7eb 24%,
            #d1d5db 32%,
            #9ca3af 40%,
            #6b7280 48%,
            #4b5563 56%,
            #374151 64%,
            #1f2937 72%,
            #111827 80%,
            #030712 88%,
            #000000 100%
        );
    background-size: 400% 400%, 350% 350%, 300% 300%, 380% 380%, 320% 320%, 290% 290%, 360% 360%, 100% 100%;
    animation: 
        gradientShift 25s ease-in-out infinite,
        prismaticDispersion 60s ease-in-out infinite;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
}

/* ATMOSPHERIC PARTICLES OVERLAY */
html::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.02) 0%, transparent 2%),
        radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.015) 0%, transparent 1.5%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.01) 0%, transparent 1%),
        radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 2.5%),
        radial-gradient(circle at 10% 60%, rgba(255, 255, 255, 0.012) 0%, transparent 1.2%);
    background-size: 200px 200px, 150px 150px, 100px 100px, 180px 180px, 120px 120px;
    pointer-events: none;
    z-index: 0;
    animation: glassShimmer 8s ease-in-out infinite;
}

/* Base monospace font family - will be dynamically updated */
code, pre, kbd, samp, textarea, .monaco-editor, .emerald-terminal-text {
    font-family: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace !important;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
    text-rendering: optimizeSpeed;
    font-smooth: always;
    -webkit-text-stroke: 0.01px rgba(0, 0, 0, 0.1);
}

/* MONACO EDITOR CRYSTAL-CLEAR TEXT STYLING */
.monaco-editor {
    font-feature-settings: 'liga' 1, 'calt' 1;
    -webkit-font-smoothing: subpixel-antialiased !important;
    -moz-osx-font-smoothing: auto !important;
    text-rendering: optimizeSpeed !important;
    font-smooth: always !important;
    -webkit-text-stroke: 0.01px rgba(0, 0, 0, 0.1) !important;
}

/* Clean text rendering without aggressive overrides */
.monaco-editor .view-lines .view-line span {
    text-rendering: optimizeSpeed !important;
    -webkit-font-smoothing: subpixel-antialiased !important;
    -moz-osx-font-smoothing: auto !important;
}

/* Extra crystal-clear rendering for all Monaco text elements */
.monaco-editor .view-lines,
.monaco-editor .view-line,
.monaco-editor .view-line span,
.monaco-editor .mtk1,
.monaco-editor .mtk2,
.monaco-editor .mtk3,
.monaco-editor .mtk4,
.monaco-editor .mtk5,
.monaco-editor .mtk6,
.monaco-editor .mtk7,
.monaco-editor .mtk17,
.monaco-editor .mtk22 {
    -webkit-font-smoothing: subpixel-antialiased !important;
    -moz-osx-font-smoothing: auto !important;
    text-rendering: optimizeSpeed !important;
    font-smooth: always !important;
    transform: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    filter: none !important;
}

/* Enhanced Code syntax highlighting with clean colors */
.monaco-editor .mtk1 { /* Default text */
    color: rgba(15, 23, 42, 1) !important;
}

.monaco-editor .mtk2, .monaco-editor .mtk22 { /* Keywords */
    color: rgba(30, 58, 138, 1) !important;
    font-weight: 600 !important;
}

.monaco-editor .mtk3, .monaco-editor .mtk17 { /* Strings */
    color: rgba(22, 101, 52, 1) !important;
}

.monaco-editor .mtk4, .monaco-editor .mtk6 { /* Numbers & Functions */
    color: rgba(147, 51, 234, 1) !important;
}

.monaco-editor .mtk5, .monaco-editor .mtk7 { /* Comments */
    color: rgba(75, 85, 99, 1) !important;
    font-style: italic !important;
}

/* Terminal text with crystal clear rendering */
.emerald-terminal-text {
    color: rgba(15, 23, 42, 1) !important;
    text-rendering: optimizeSpeed !important;
    -webkit-font-smoothing: subpixel-antialiased !important;
    -moz-osx-font-smoothing: auto !important;
    font-smooth: always !important;
}

/* ULTRA-PREMIUM MONACO EDITOR GLASS CONTAINER */
.monaco-editor {
    background: transparent !important;
    border-radius: 16px !important;
    position: relative !important;
    z-index: 5 !important;
    pointer-events: auto !important;
    overflow: hidden !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    filter: none !important;
}

.monaco-editor::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        linear-gradient(145deg at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
        linear-gradient(225deg at 70% 70%, rgba(16, 185, 129, 0.04) 0%, transparent 40%);
    border-radius: 16px;
    pointer-events: none;
    z-index: -1;
}

.monaco-editor .monaco-editor-background {
    background: transparent !important;
}

.monaco-editor .margin {
    background: transparent !important;
}

/* CRYSTAL-CLEAR LINE NUMBERS */
.monaco-editor .margin .line-numbers {
    color: rgba(75, 85, 99, 1) !important;
    font-size: 12px !important;
    text-rendering: optimizeSpeed !important;
    -webkit-font-smoothing: subpixel-antialiased !important;
    -moz-osx-font-smoothing: auto !important;
    font-smooth: always !important;
}

/* PREMIUM CURSOR WITH GLOW */
.monaco-editor .cursor {
    background: rgba(16, 185, 129, 0.9) !important;
    box-shadow: 
        0 0 8px rgba(16, 185, 129, 0.6) !important,
        0 0 16px rgba(16, 185, 129, 0.3) !important,
        0 0 24px rgba(16, 185, 129, 0.15) !important;
    width: 2px !important;
    border-radius: 1px !important;
}

/* ULTRA-PREMIUM SELECTION HIGHLIGHT */
.monaco-editor .selected-text {
    background: rgba(16, 185, 129, 0.18) !important;
    border: 1px solid rgba(16, 185, 129, 0.25) !important;
    border-radius: 4px !important;
}

/* Remove blue underlines and highlights */
.monaco-editor .view-line {
    border: none !important;
}

.monaco-editor .current-line {
    background: rgba(255, 255, 255, 0.06) !important;
    border: none !important;
    border-radius: 6px !important;
}

.monaco-editor .view-lines .view-line {
    border: none !important;
    outline: none !important;
}

/* PREMIUM SCROLLBAR */
.monaco-editor .monaco-scrollable-element > .scrollbar > .slider {
    background: 
        linear-gradient(135deg, 
            rgba(16, 185, 129, 0.4) 0%, 
            rgba(16, 185, 129, 0.6) 50%, 
            rgba(16, 185, 129, 0.4) 100%) !important;
    border-radius: 6px !important;
    backdrop-filter: none !important;
    box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
}

.monaco-editor .monaco-scrollable-element > .scrollbar > .slider:hover {
    background: 
        linear-gradient(135deg, 
            rgba(16, 185, 129, 0.6) 0%, 
            rgba(16, 185, 129, 0.8) 50%, 
            rgba(16, 185, 129, 0.6) 100%) !important;
    box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

/* Remove all blue highlights and decorations */
.monaco-editor .squiggly-error,
.monaco-editor .squiggly-warning,
.monaco-editor .squiggly-info {
    border-bottom: none !important;
}

.monaco-editor .bracket-match {
    background: rgba(16, 185, 129, 0.12) !important;
    border: 1px solid rgba(16, 185, 129, 0.3) !important;
    border-radius: 4px !important;
}

/* ULTRA-PREMIUM WIDGET STYLING */
.monaco-editor .find-widget {
    background: 
        linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.08) 100%) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 12px !important;
    backdrop-filter: none !important;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
}

.monaco-editor .suggest-widget {
    background: 
        linear-gradient(135deg, 
            rgba(255, 255, 255, 0.18) 0%, 
            rgba(255, 255, 255, 0.12) 100%) !important;
    border: 1px solid rgba(255, 255, 255, 0.25) !important;
    border-radius: 12px !important;
    backdrop-filter: none !important;
    box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        inset 0 -1px 0 rgba(0, 0, 0, 0.05) !important;
}

/* Remove blur from all text inside widgets */
.monaco-editor .find-widget *,
.monaco-editor .suggest-widget *,
.monaco-editor .find-widget input,
.monaco-editor .suggest-widget .monaco-list {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    filter: none !important;
}

/* FINAL SAFEGUARD - ABSOLUTELY NO BLUR ON ANY TEXT ELEMENT */
*:is(p, span, div, h1, h2, h3, h4, h5, h6, label, input, button, textarea, pre, code, kbd, samp) {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    filter: none !important;
    -webkit-filter: none !important;
}

/* ULTIMATE TEXT CLARITY OVERRIDE - ZERO BLUR ANYWHERE ON TEXT */
.monaco-editor .inputarea,
.monaco-editor .monaco-editor-background,
.monaco-editor .editor-container,
.monaco-editor .overflow-guard,
.monaco-editor .monaco-editor,
.monaco-editor .view-lines,
.monaco-editor .view-line,
.monaco-editor .view-line > span,
.monaco-editor .token {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    filter: none !important;
    -webkit-filter: none !important;
    will-change: auto !important;
    transform: none !important;
}

.monaco-editor .monaco-list .monaco-list-row.focused {
    background: rgba(16, 185, 129, 0.12) !important;
    border-radius: 6px !important;
}

.monaco-editor .monaco-list .monaco-list-row:hover {
    background: rgba(16, 185, 129, 0.06) !important;
    border-radius: 6px !important;
}

/* Enhanced line highlighting */
.monaco-editor .current-line-decoration {
    background: rgba(255, 255, 255, 0.08) !important;
    border: none !important;
    border-radius: 6px !important;
}

/* Remove all blue outlines and focus rings */
.monaco-editor,
.monaco-editor *,
.monaco-editor .monaco-editor,
.monaco-editor .view-lines,
.monaco-editor .view-line,
.monaco-editor textarea,
.monaco-editor input {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
}

.monaco-editor .monaco-editor-background,
.monaco-editor .inputarea {
    outline: none !important;
    border: none !important;
}

.monaco-editor .decorationsOverviewRuler {
    display: none !important;
}

.monaco-editor .margin-view-overlays {
    border: none !important;
}

.monaco-editor .view-overlays {
    border: none !important;
}

/* Remove focus outline from the editor container */
.glass-surface:focus,
.glass-surface:focus-within {
    outline: none !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
}

/* Plain text editor with crystal clear rendering */
textarea {
    color: rgba(15, 23, 42, 1) !important;
    background: transparent !important;
    z-index: 10 !important;
    position: relative !important;
    pointer-events: auto !important;
    text-rendering: optimizeSpeed !important;
    -webkit-font-smoothing: subpixel-antialiased !important;
    -moz-osx-font-smoothing: auto !important;
    font-smooth: always !important;
}

/* ✨ ULTRA-PREMIUM GLASS SURFACE SYSTEM ✨ */
.renaissance-panel,
.renaissance-terminal,
.leonardo-button,
.leonardo-select select {
    /* TRIPLE-LAYER GLASS BACKGROUND WITH ADVANCED LIGHTING */
    background: 
        /* Top highlight layer - simulates light hitting glass surface */
        linear-gradient(165deg at 30% 30%, 
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.12) 25%,
            transparent 50%
        ),
        /* Secondary reflection layer - creates depth */
        linear-gradient(195deg at 70% 70%, 
            rgba(16, 185, 129, 0.08) 0%,
            rgba(52, 211, 153, 0.05) 30%,
            transparent 60%
        ),
        /* Base glass material layer */
        linear-gradient(135deg, 
            var(--glass-primary) 0%,
            var(--glass-secondary) 50%,
            rgba(240, 248, 255, 0.06) 100%
        ),
        /* Subtle texture overlay */
        radial-gradient(ellipse at 40% 60%, 
            rgba(255, 255, 255, 0.04) 0%, 
            transparent 70%
        );
    
    /* ADVANCED BORDER SYSTEM */
    border: 1px solid transparent;
    background-clip: padding-box;
    position: relative;
    border-radius: 16px;
    
    /* ULTRA-PREMIUM BACKDROP FILTERING */
    backdrop-filter: 
        blur(12px) 
        saturate(180%) 
        brightness(110%) 
        contrast(105%);
    -webkit-backdrop-filter: 
        blur(12px) 
        saturate(180%) 
        brightness(110%) 
        contrast(105%);
    
    /* SOPHISTICATED SHADOW SYSTEM */
    box-shadow: 
        /* Outer shadows for depth */
        0 8px 32px rgba(0, 0, 0, 0.08),
        0 4px 16px rgba(0, 0, 0, 0.04),
        0 2px 8px rgba(0, 0, 0, 0.02),
        /* Inner highlights for glass effect */
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.05),
        inset 1px 0 0 rgba(255, 255, 255, 0.1),
        inset -1px 0 0 rgba(0, 0, 0, 0.03);
    
    /* PERFORMANCE OPTIMIZATION */
    transform: translateZ(0);
    will-change: transform, box-shadow, backdrop-filter;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    /* SUBTLE ANIMATION */
    animation: subtleFloat 8s ease-in-out infinite;
}

/* ULTRA-PREMIUM GLASS BORDER EFFECT */
.renaissance-panel::before,
.renaissance-terminal::before,
.leonardo-button::before,
.leonardo-select select::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 1px;
    background: 
        linear-gradient(135deg, 
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(16, 185, 129, 0.15) 50%,
            rgba(255, 255, 255, 0.1) 75%,
            rgba(255, 255, 255, 0.2) 100%
        );
    -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
    z-index: -1;
}

/* PRISMATIC DISPERSION EFFECT */
.renaissance-panel::after,
.renaissance-terminal::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 14px;
    background: 
        radial-gradient(ellipse at 25% 25%, var(--refraction-red) 0%, transparent 30%),
        radial-gradient(ellipse at 50% 50%, var(--refraction-green) 0%, transparent 30%),
        radial-gradient(ellipse at 75% 75%, var(--refraction-blue) 0%, transparent 30%);
    pointer-events: none;
    z-index: -1;
    opacity: 0.6;
    mix-blend-mode: screen;
}

/* PREMIUM SURFACE IMPERFECTIONS */
.leonardo-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        /* Microscopic surface variations */
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.06) 0%, transparent 2%),
        radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.04) 0%, transparent 1.5%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 1%),
        /* Main surface highlight */
        linear-gradient(165deg, 
            rgba(255, 255, 255, 0.15) 0%,
            rgba(16, 185, 129, 0.1) 50%,
            transparent 100%
        );
    border-radius: 16px;
    pointer-events: none;
    opacity: 0.8;
    mix-blend-mode: overlay;
    background-size: 50px 50px, 35px 35px, 25px 25px, 100% 100%;
}

.leonardo-button:active {
    transform: translateY(1px) translateZ(0);
    box-shadow:
        0 4px 16px rgba(0, 0, 0, 0.12),
        0 2px 8px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1),
        inset 1px 0 0 rgba(255, 255, 255, 0.2),
        inset -1px 0 0 rgba(0, 0, 0, 0.05);
    backdrop-filter: 
        blur(30px) 
        saturate(200%) 
        brightness(115%);
}

/* ENHANCED SHIMMER EFFECT FOR BUTTONS */
.leonardo-button:not(:active)::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: 
        linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 20%,
            rgba(16, 185, 129, 0.08) 40%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(16, 185, 129, 0.08) 60%,
            rgba(255, 255, 255, 0.05) 80%,
            transparent 100%
        );
    transition: left 3s ease-out;
    border-radius: 16px;
    mix-blend-mode: overlay;
    opacity: 0.7;
    z-index: 1;
}

/* Accessibility – enhanced support */
@media (prefers-reduced-transparency: reduce) {
    .renaissance-panel,
    .renaissance-terminal,
    .leonardo-button,
    .leonardo-select select {
        backdrop-filter: none !important;
        background: 
            linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%,
                rgba(248, 250, 252, 0.98) 100%) !important;
        border: 1px solid rgba(226, 232, 240, 0.8) !important;
    }
}

@media (prefers-reduced-motion: reduce) {
    .renaissance-panel,
    .renaissance-terminal,
    .leonardo-button,
    .leonardo-select select {
        animation: none !important;
    }
    
    html {
        animation: none !important;
    }
    
    html::before {
        animation: none !important;
    }
}

/* END OF ULTRA-PREMIUM GLASS SYSTEM */

/* PREMIUM GLASS INTERACTION STATES */
.leonardo-button:hover {
    transform: translateY(-1px) translateZ(0);
    box-shadow: 
        /* Enhanced outer shadows on hover */
        0 12px 40px rgba(0, 0, 0, 0.12),
        0 6px 20px rgba(0, 0, 0, 0.08),
        0 3px 10px rgba(0, 0, 0, 0.04),
        /* Enhanced inner highlights */
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.08),
        inset 1px 0 0 rgba(255, 255, 255, 0.15),
        inset -1px 0 0 rgba(0, 0, 0, 0.05);
    backdrop-filter: 
        blur(30px) 
        saturate(200%) 
        brightness(115%);
    animation: subtleFloat 6s ease-in-out infinite;
}

/* ENHANCED HOVER SHIMMER EFFECT */
.leonardo-button:hover::before {
    left: 100% !important;
    transition: left 0.8s ease-out !important;
}

/* PREMIUM GLASS SURFACE QUALITY INDICATOR */
.renaissance-panel::before,
.renaissance-terminal::before {
    background: 
        linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.15) 20%,
            rgba(16, 185, 129, 0.2) 40%,
            rgba(255, 255, 255, 0.1) 60%,
            rgba(16, 185, 129, 0.15) 80%,
            rgba(255, 255, 255, 0.25) 100%
        ) !important;
}

/* ATMOSPHERIC DEPTH ENHANCEMENT */
.glass-surface {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
}

/* ULTRA-PREMIUM TYPOGRAPHY - PSYCHOLOGICALLY COMPELLING */
.premium-brand-title {
    font-family: 'Orbitron', 'Inter', sans-serif;
    font-weight: 800;
    font-size: 32px;
    letter-spacing: 0.08em;
    background: linear-gradient(135deg, 
        #1e293b 0%,
        #334155 20%,
        #475569 40%,
        #64748b 60%,
        #94a3b8 80%,
        #cbd5e1 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.1),
        0 8px 16px rgba(0, 0, 0, 0.05),
        0 16px 32px rgba(0, 0, 0, 0.02);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.premium-subtitle {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #64748b;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    opacity: 0.8;
    /* Glass embedded text */
}

.premium-text {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    letter-spacing: 0.01em;
    line-height: 1.5;
    color: rgba(15, 23, 42, 0.98);
    text-shadow: 
        0 1px 0 rgba(255, 255, 255, 0.5),
        0 -1px 0 rgba(0, 0, 0, 0.1);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* ULTRA-PREMIUM GLASS BUTTONS - CRYSTAL CLARITY */
.leonardo-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    
    /* CRISP ENGRAVED GLASS TEXT EFFECT */
    color: rgba(15, 23, 42, 0.98);
    text-shadow: 
        0 1px 0 rgba(255, 255, 255, 0.7),
        0 -1px 0 rgba(0, 0, 0, 0.2);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
    text-decoration: none;
    transform: translateZ(0);
    will-change: transform, box-shadow;
    z-index: 10;
    pointer-events: auto;
}

.leonardo-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        linear-gradient(140deg, 
            transparent 15%,
            rgba(255,255,255,0.1) 20%,
            rgba(255,255,255,0.15) 22%,
            rgba(255,255,255,0.05) 28%,
            transparent 35%
        );
    border-radius: 10px;
    pointer-events: none;
}



/* Premium Crystal Glass Select Dropdown */
.leonardo-select {
    position: relative;
    display: inline-block;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 500;
    z-index: 15;
    pointer-events: auto;
}

.leonardo-select select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 6px 25px 6px 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(15, 23, 42, 0.9);
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 40%),
        linear-gradient(135deg, 
            rgba(30, 140, 90, 0.2) 0%,
            rgba(50, 180, 110, 0.15) 50%,
            rgba(70, 220, 130, 0.2) 100%
        );
    border: 1px solid rgba(180, 240, 200, 0.3);
    border-radius: 10px;
    backdrop-filter: blur(8px) saturate(130%);
    box-shadow: 
        0 4px 12px rgba(30, 140, 90, 0.15),
        inset 0 1px 2px rgba(255,255,255,0.15),
        inset 0 -1px 2px rgba(30, 140, 90, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    
    /* ENGRAVED/ETCHED GLASS TEXT EFFECT */
    text-shadow: 
        0 2px 0 rgba(255, 255, 255, 0.9),
        0 -1px 0 rgba(0, 0, 0, 0.4),
        0 3px 6px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.7),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    
    z-index: 20;
    pointer-events: auto;
    position: relative;
}

/* DROPDOWN ARROW - ONLY FOR SELECT ELEMENTS */
.leonardo-select::after {
    content: '▼';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(20, 20, 20, 0.7);
    font-size: 10px;
    pointer-events: none;
    transition: transform 0.3s ease;
    /* Glass text style */
}

/* BUTTON STYLE - SAME AS SELECT BUT NO ARROW */
.leonardo-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(15, 23, 42, 0.9);
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 40%),
        linear-gradient(135deg, 
            rgba(30, 140, 90, 0.2) 0%,
            rgba(50, 180, 110, 0.15) 50%,
            rgba(70, 220, 130, 0.2) 100%
        );
    border: 1px solid rgba(180, 240, 200, 0.3);
    border-radius: 10px;
    backdrop-filter: blur(14px) saturate(160%);
    box-shadow: 
        0 4px 12px rgba(30, 140, 90, 0.15),
        inset 0 1px 2px rgba(255,255,255,0.15),
        inset 0 -1px 2px rgba(30, 140, 90, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    
    /* ENGRAVED/ETCHED GLASS TEXT EFFECT */
    text-shadow: 
        0 2px 0 rgba(255, 255, 255, 0.9),
        0 -1px 0 rgba(0, 0, 0, 0.4),
        0 3px 6px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.7),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    
    z-index: 20;
    pointer-events: auto;
    padding: 6px 10px;
    gap: 4px;
}

/* SIMPLE HOVER - ONLY SCALE */
.leonardo-button:hover {
    transform: scale(1.08) !important;
}

/* ACTIVE STATE - SAME COLORS AS NORMAL */
.leonardo-button.active {
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 40%),
        linear-gradient(135deg, 
            rgba(30, 140, 90, 0.2) 0%,
            rgba(50, 180, 110, 0.15) 50%,
            rgba(70, 220, 130, 0.2) 100%
        );
    border: 1px solid rgba(180, 240, 200, 0.3);
    color: rgba(15, 23, 42, 0.9);
    
    /* ENHANCED ENGRAVED TEXT FOR ACTIVE STATE */
    text-shadow: 
        0 3px 0 rgba(255, 255, 255, 1.0),
        0 -1px 0 rgba(0, 0, 0, 0.5),
        0 4px 8px rgba(0, 0, 0, 0.2),
        inset 0 2px 0 rgba(255, 255, 255, 0.8),
        inset 0 -2px 0 rgba(0, 0, 0, 0.3);
    font-weight: 800;
}

/* ACTIVE HOVER - ONLY SCALE */
.leonardo-button.active:hover {
    transform: scale(1.08) !important;
}

/* DISABLED STATE - MATCHING EXECUTE CODE BUTTON */
.leonardo-button:disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
}

.leonardo-button:disabled:hover {
    transform: none !important;
}

/* Dropdown arrow - no hover effects */

/* Dropdown selects - no hover effects */

/* Premium Crystal Glass Panel Styling */
.renaissance-panel {
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 40%),
        radial-gradient(ellipse at 80% 30%, var(--theme-highlight, rgba(200,255,230,0.12)) 0%, transparent 45%),
        linear-gradient(135deg, 
            var(--theme-primary, rgba(30, 140, 90, 0.2)) 0%,
            var(--theme-secondary, rgba(50, 180, 110, 0.15)) 50%,
            var(--theme-accent, rgba(70, 220, 130, 0.2)) 100%
        );
    backdrop-filter: blur(14px) saturate(160%);
    border: 1px solid var(--theme-border, rgba(180, 240, 200, 0.3));
    border-radius: 15px;
    box-shadow: 
        0 10px 30px var(--theme-glow, rgba(30, 140, 90, 0.2)),
        0 5px 15px var(--theme-glow, rgba(50, 180, 110, 0.15)),
        inset 0 2px 4px rgba(255,255,255,0.15),
        inset 0 -1px 3px var(--theme-glow, rgba(30, 140, 90, 0.1));
    position: relative;
    overflow: hidden;
}

.renaissance-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        linear-gradient(140deg, 
            transparent 15%,
            rgba(255,255,255,0.08) 20%,
            rgba(255,255,255,0.12) 22%,
            rgba(255,255,255,0.04) 28%,
            transparent 35%
        );
    pointer-events: none;
    opacity: 0.6;
    border-radius: 15px;
}

/* ULTRA-PREMIUM GLOWING TERMINAL - PSYCHOLOGICALLY MAGNETIC */
.renaissance-terminal {
    background: 
        /* Ultra-sophisticated multi-dimensional glass layers */
        radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.6) 0%, transparent 30%),
        radial-gradient(ellipse at 80% 15%, rgba(248,250,252,0.5) 0%, transparent 35%),
        radial-gradient(ellipse at 15% 85%, rgba(241,245,249,0.45) 0%, transparent 40%),
        radial-gradient(ellipse at 85% 80%, rgba(226,232,240,0.4) 0%, transparent 35%),
        radial-gradient(ellipse at 50% 50%, rgba(203,213,225,0.25) 0%, transparent 60%),
        
        /* Premium crystalline glass base with depth */
        linear-gradient(135deg, 
            rgba(248,250,252,0.88) 0%,
            rgba(241,245,249,0.82) 15%,
            rgba(226,232,240,0.78) 30%,
            rgba(203,213,225,0.72) 45%,
            rgba(226,232,240,0.78) 60%,
            rgba(241,245,249,0.82) 75%,
            rgba(248,250,252,0.88) 90%,
            rgba(255,255,255,0.9) 100%
        ),
        
        /* Mesmerizing internal light reflections */
        linear-gradient(45deg, 
            transparent 0%,
            rgba(255,255,255,0.4) 15%,
            transparent 20%,
            rgba(248,250,252,0.3) 35%,
            transparent 40%,
            rgba(255,255,255,0.2) 65%,
            transparent 70%,
            rgba(241,245,249,0.25) 85%,
            transparent 90%
        );
    
    border: 2px solid rgba(203,213,225,0.8);
    border-radius: 20px;
    
    box-shadow: 
        /* MESMERIZING GLOW EFFECTS - IMPOSSIBLE TO IGNORE */
        0 0 60px rgba(248,250,252,0.8),
        0 0 100px rgba(241,245,249,0.6),
        0 0 140px rgba(226,232,240,0.4),
        0 0 180px rgba(203,213,225,0.3),
        
        /* Premium depth shadows */
        0 40px 80px rgba(15,23,42,0.15),
        0 25px 50px rgba(15,23,42,0.12),
        0 15px 30px rgba(15,23,42,0.1),
        0 8px 16px rgba(15,23,42,0.08),
        
        /* Ultra-premium inner crystal effects */
        inset 0 4px 12px rgba(255,255,255,0.6),
        inset 0 -3px 8px rgba(203,213,225,0.4),
        inset 0 0 40px rgba(248,250,252,0.3),
        inset 0 1px 0 rgba(255,255,255,0.8),
        
        /* Magnetic border glow */
        inset 0 0 0 1px rgba(255,255,255,0.5),
        0 0 0 1px rgba(203,213,225,0.6),
        0 2px 8px rgba(15,23,42,0.12);
    
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(32px) saturate(240%) contrast(1.25) brightness(1.15);
    
    /* Psychological appeal - subtle pulsing glow */
    animation: terminalGlow 4s ease-in-out infinite alternate;
}

/* SOPHISTICATED ANIMATIONS */
@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@keyframes terminalGlow {
    0% {
        box-shadow: 
            0 0 60px rgba(248,250,252,0.8),
            0 0 100px rgba(241,245,249,0.6),
            0 0 140px rgba(226,232,240,0.4),
            0 0 180px rgba(203,213,225,0.3),
            0 40px 80px rgba(15,23,42,0.15),
            0 25px 50px rgba(15,23,42,0.12),
            0 15px 30px rgba(15,23,42,0.1),
            0 8px 16px rgba(15,23,42,0.08),
            inset 0 4px 12px rgba(255,255,255,0.6),
            inset 0 -3px 8px rgba(203,213,225,0.4),
            inset 0 0 40px rgba(248,250,252,0.3),
            inset 0 1px 0 rgba(255,255,255,0.8),
            inset 0 0 0 1px rgba(255,255,255,0.5),
            0 0 0 1px rgba(203,213,225,0.6),
            0 2px 8px rgba(15,23,42,0.12);
    }
    100% {
        box-shadow: 
            0 0 80px rgba(248,250,252,0.9),
            0 0 120px rgba(241,245,249,0.7),
            0 0 160px rgba(226,232,240,0.5),
            0 0 200px rgba(203,213,225,0.4),
            0 40px 80px rgba(15,23,42,0.15),
            0 25px 50px rgba(15,23,42,0.12),
            0 15px 30px rgba(15,23,42,0.1),
            0 8px 16px rgba(15,23,42,0.08),
            inset 0 4px 12px rgba(255,255,255,0.7),
            inset 0 -3px 8px rgba(203,213,225,0.5),
            inset 0 0 50px rgba(248,250,252,0.4),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 0 0 1px rgba(255,255,255,0.6),
            0 0 0 1px rgba(203,213,225,0.7),
            0 2px 8px rgba(15,23,42,0.12);
    }
}

@keyframes gentleFloat {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-2px);
    }
}

@keyframes shimmerFlow {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

/* ENHANCED FLOATING PARTICLES BACKGROUND */
.app-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 60%),
        radial-gradient(circle at 80% 20%, rgba(255, 75, 178, 0.12) 0%, transparent 55%),
        radial-gradient(circle at 40% 40%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 60% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 10% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 90% 60%, rgba(236, 72, 153, 0.08) 0%, transparent 45%);
    pointer-events: none;
    z-index: -1;
    animation: particleFloat 25s ease-in-out infinite;
}

@keyframes particleFloat {
    0%, 100% {
        opacity: 0.3;
        transform: translateY(0px) rotate(0deg);
    }
    50% {
        opacity: 0.6;
        transform: translateY(-10px) rotate(180deg);
    }
}

/* ENHANCED GLASS MORPHISM */
.glass-morphism {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-radius: 16px;
}

/* SOPHISTICATED VISUAL ENHANCEMENTS */
.aesthetic-glow {
    position: relative;
    overflow: hidden;
}

.aesthetic-glow::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: 
        conic-gradient(from 0deg at 50% 50%, 
            rgba(120, 119, 198, 0.4) 0deg,
            rgba(255, 75, 178, 0.4) 60deg,
            rgba(255, 206, 84, 0.4) 120deg,
            rgba(34, 211, 238, 0.4) 180deg,
            rgba(139, 92, 246, 0.4) 240deg,
            rgba(16, 185, 129, 0.4) 300deg,
            rgba(120, 119, 198, 0.4) 360deg);
    animation: rotate 15s linear infinite;
    z-index: -1;
    border-radius: 20px;
    filter: blur(8px);
    opacity: 0.6;
}

.aesthetic-glow::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border-radius: 18px;
    z-index: -1;
    pointer-events: none;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* PREMIUM TITLE STYLING */
.premium-title {
    background: linear-gradient(135deg, 
        rgba(15, 23, 42, 0.95) 0%,
        rgba(30, 41, 59, 0.9) 30%,
        rgba(51, 65, 85, 0.85) 60%,
        rgba(71, 85, 105, 0.9) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 
        0 2px 4px rgba(255, 255, 255, 0.8),
        0 -1px 2px rgba(0, 0, 0, 0.3),
        0 4px 8px rgba(0, 0, 0, 0.15);
    font-weight: 800;
    position: relative;
    animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
    0% {
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
    }
    100% {
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
    }
}

/* REFINED EMBEDDED TEXT ON GLASS */
.embedded-text {
    color: rgba(15, 23, 42, 0.92);
    text-shadow: 
        0 1px 0 rgba(255, 255, 255, 0.85),
        0 -0.5px 0 rgba(0, 0, 0, 0.18),
        0 1.5px 3px rgba(0, 0, 0, 0.08);
    font-weight: 600;
    letter-spacing: 0.01em;
}

.glass-text {
    color: rgba(15, 23, 42, 0.88);
    text-shadow: 
        0 0.8px 0 rgba(255, 255, 255, 0.7),
        0 -0.4px 0 rgba(0, 0, 0, 0.12),
        0 1px 2px rgba(0, 0, 0, 0.06);
    font-weight: 500;
    letter-spacing: 0.005em;
}

/* BUTTON GROUP ENHANCEMENTS */
.button-group-container {
    position: relative;
    overflow: hidden;
}

.button-group-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%);
    animation: groupShimmer 4s ease-in-out infinite;
    pointer-events: none;
    z-index: -1;
}

@keyframes groupShimmer {
    0%, 100% {
        left: -100%;
        opacity: 0;
    }
    50% {
        left: 100%;
        opacity: 1;
    }
}

/* BUTTON-ONLY HOVER EFFECTS */
.button-hover {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* DELETED HOVER REF */


/* ENHANCED GLASS PANEL AESTHETICS */
.premium-panel {
    position: relative;
    background: 
        linear-gradient(135deg, 
            rgba(255, 255, 255, 0.35) 0%,
            rgba(255, 255, 255, 0.15) 100%);
    backdrop-filter: blur(25px) saturate(200%) brightness(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.08),
        0 8px 16px rgba(0, 0, 0, 0.04),
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -1px 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.premium-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
        transparent 0%,
        rgba(255, 255, 255, 0.8) 50%,
        transparent 100%);
}

/* ENHANCED GLASS SURFACE TEXTURE */
.glass-surface {
    background: 
        radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 60%),
        radial-gradient(ellipse at 70% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, 
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.15) 30%,
            rgba(255, 255, 255, 0.2) 70%,
            rgba(255, 255, 255, 0.3) 100%);
    backdrop-filter: blur(25px) saturate(200%) brightness(1.08) contrast(1.05);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.08),
        0 4px 16px rgba(0, 0, 0, 0.04),
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -2px 4px rgba(0, 0, 0, 0.08),
        0 0 0 1px rgba(255, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
}

.glass-surface::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
        transparent 0%,
        rgba(255, 255, 255, 0.6) 30%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0.6) 70%,
        transparent 100%);
    pointer-events: none;
    z-index: -1;
}

/* ENHANCED FLOATING ELEMENTS */
.floating-orb {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, 
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.2) 30%,
        rgba(255, 255, 255, 0.1) 60%,
        transparent 100%);
    backdrop-filter: blur(15px) saturate(150%);
    box-shadow: 
        0 8px 32px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: float 8s ease-in-out infinite;
    pointer-events: none;
}

.floating-orb:nth-child(1) {
    width: 80px;
    height: 80px;
    top: 8%;
    left: 85%;
    animation-delay: 0s;
    background: radial-gradient(circle, 
        rgba(120, 119, 198, 0.3) 0%,
        rgba(120, 119, 198, 0.1) 50%,
        transparent 100%);
}

.floating-orb:nth-child(2) {
    width: 60px;
    height: 60px;
    top: 65%;
    left: 5%;
    animation-delay: 2.5s;
    background: radial-gradient(circle, 
        rgba(255, 75, 178, 0.3) 0%,
        rgba(255, 75, 178, 0.1) 50%,
        transparent 100%);
}

.floating-orb:nth-child(3) {
    width: 100px;
    height: 100px;
    top: 75%;
    left: 75%;
    animation-delay: 5s;
    background: radial-gradient(circle, 
        rgba(34, 211, 238, 0.3) 0%,
        rgba(34, 211, 238, 0.1) 50%,
        transparent 100%);
}

/* Additional floating orbs */
.floating-orb:nth-child(4) {
    width: 45px;
    height: 45px;
    top: 25%;
    left: 15%;
    animation-delay: 1s;
    background: radial-gradient(circle, 
        rgba(139, 92, 246, 0.3) 0%,
        rgba(139, 92, 246, 0.1) 50%,
        transparent 100%);
}

.floating-orb:nth-child(5) {
    width: 70px;
    height: 70px;
    top: 45%;
    left: 90%;
    animation-delay: 3.5s;
    background: radial-gradient(circle, 
        rgba(16, 185, 129, 0.3) 0%,
        rgba(16, 185, 129, 0.1) 50%,
        transparent 100%);
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.4;
    }
    50% {
        transform: translateY(-25px) rotate(180deg);
        opacity: 0.8;
    }
}

/* CONTENT BREATHING ANIMATION */
@keyframes contentBreathe {
    0%, 100% {
        transform: scale(1);
        filter: brightness(1) saturate(100%);
    }
    50% {
        transform: scale(1.002);
        filter: brightness(1.02) saturate(105%);
    }
}

/* ENHANCED SHIMMER EFFECT */
@keyframes advancedShimmer {
    0% {
        transform: translateX(-100%) skewX(-15deg);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateX(200%) skewX(-15deg);
        opacity: 0;
    }
}

.shimmer-effect {
    position: relative;
    overflow: hidden;
}

.shimmer-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 100%
    );
    animation: advancedShimmer 3s ease-in-out infinite;
    animation-delay: 2s;
    pointer-events: none;
    z-index: -1;
}

/* PREMIUM SCROLLBAR */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, 
        rgba(120, 119, 198, 0.6) 0%, 
        rgba(255, 75, 178, 0.6) 100%);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, 
        rgba(120, 119, 198, 0.8) 0%, 
        rgba(255, 75, 178, 0.8) 100%);
}
}

/* PREMIUM CRYSTAL GLASS INTERNAL STRUCTURE - SOPHISTICATED */
.renaissance-terminal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        /* Elegant internal glass reflections */
        radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 30%),
        radial-gradient(ellipse at 80% 25%, rgba(220,255,240,0.15) 0%, transparent 35%),
        radial-gradient(ellipse at 30% 80%, rgba(200,255,230,0.12) 0%, transparent 40%),
        radial-gradient(ellipse at 70% 70%, rgba(240,255,250,0.1) 0%, transparent 25%),
        
        /* Subtle glass depth layers */
        linear-gradient(125deg, 
            transparent 20%,
            rgba(255,255,255,0.08) 25%,
            transparent 30%,
            rgba(200,255,230,0.06) 60%,
            transparent 65%
        ),
        
        /* Crystal-like internal structure */
        radial-gradient(circle at 45% 45%, rgba(180,240,210,0.08) 0%, transparent 50%);
    
    opacity: 0.6;
    pointer-events: none;
}

/* REFINED GLASS SURFACE HIGHLIGHTS - STATIC ELEGANCE */
.renaissance-terminal::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        /* Primary sophisticated glass highlight */
        linear-gradient(140deg, 
            transparent 15%,
            rgba(255,255,255,0.12) 20%,
            rgba(255,255,255,0.18) 22%,
            rgba(255,255,255,0.08) 28%,
            transparent 35%
        ),
        /* Secondary refined reflection */
        linear-gradient(45deg, 
            transparent 60%,
            rgba(255,255,255,0.06) 65%,
            rgba(255,255,255,0.04) 70%,
            transparent 75%
        ),
        /* Edge highlight for premium glass effect */
        linear-gradient(to right, 
            rgba(255,255,255,0.1) 0%,
            transparent 3%,
            transparent 97%,
            rgba(255,255,255,0.1) 100%
        ),
        linear-gradient(to bottom, 
            rgba(255,255,255,0.08) 0%,
            transparent 2%,
            transparent 98%,
            rgba(255,255,255,0.06) 100%
        );
    
    opacity: 0.8;
    pointer-events: none;
    border-radius: 18px;
}



/* PREMIUM CRYSTAL GLASS TEXT - ELEGANT BLACK */
.emerald-terminal-text {
    color: rgba(15, 23, 42, 0.95); /* near-black for better contrast */
    text-shadow:
        0 1px 1px rgba(255, 255, 255, 0.7),
        0 -1px 1px rgba(0, 0, 0, 0.25);
    font-weight: 500;
    letter-spacing: 0.02em;
}

/* SOPHISTICATED GLASS HEADER STYLING */
.liquid-glass-header {
    background: 
        linear-gradient(135deg, 
            rgba(180, 240, 210, 0.25) 0%,
            rgba(160, 230, 195, 0.2) 30%,
            rgba(140, 220, 180, 0.18) 70%,
            rgba(160, 230, 195, 0.22) 100%
        );
    border-bottom: 1px solid rgba(180, 240, 210, 0.4);
    backdrop-filter: blur(8px) saturate(130%);
    box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.2),
        inset 0 -1px 2px rgba(120, 180, 150, 0.15),
        0 1px 4px rgba(160, 230, 195, 0.2);
}

/* Red glossy overlay on right side */
.right-red-gloss {
    position: fixed;
    top: 0;
    right: 0;
    width: 28vw;
    height: 100vh;
    pointer-events: none;
    background: linear-gradient(135deg, rgba(255,0,64,0.25) 0%, rgba(255,0,0,0.1) 40%, transparent 80%);
    mix-blend-mode: screen;
    filter: blur(30px) saturate(180%);
    animation: redGlossSweep 10s ease-in-out infinite;
    z-index: 5;
}

@keyframes redGlossSweep {
    0% { transform: translateY(-30%) skewX(-15deg); }
    50% { transform: translateY(30%) skewX(-15deg); }
    100% { transform: translateY(-30%) skewX(-15deg); }
}



/* REMOVED DUPLICATE ACTIVE BUTTON DEFINITION - USING CONSISTENT LIGHT COLORS */



/* PSYCHOLOGICALLY COMPELLING ANIMATIONS */
@keyframes terminalGlow {
    0% {
        box-shadow: 
            0 0 60px rgba(248,250,252,0.8),
            0 0 100px rgba(241,245,249,0.6),
            0 0 140px rgba(226,232,240,0.4),
            0 0 180px rgba(203,213,225,0.3),
            0 40px 80px rgba(15,23,42,0.15),
            0 25px 50px rgba(15,23,42,0.12),
            0 15px 30px rgba(15,23,42,0.1),
            0 8px 16px rgba(15,23,42,0.08),
            inset 0 4px 12px rgba(255,255,255,0.6),
            inset 0 -3px 8px rgba(203,213,225,0.4),
            inset 0 0 40px rgba(248,250,252,0.3),
            inset 0 1px 0 rgba(255,255,255,0.8),
            inset 0 0 0 1px rgba(255,255,255,0.5),
            0 0 0 1px rgba(203,213,225,0.6),
            0 2px 8px rgba(15,23,42,0.12);
    }
    100% {
        box-shadow: 
            0 0 80px rgba(248,250,252,0.9),
            0 0 120px rgba(241,245,249,0.7),
            0 0 160px rgba(226,232,240,0.5),
            0 0 200px rgba(203,213,225,0.4),
            0 40px 80px rgba(15,23,42,0.15),
            0 25px 50px rgba(15,23,42,0.12),
            0 15px 30px rgba(15,23,42,0.1),
            0 8px 16px rgba(15,23,42,0.08),
            inset 0 4px 12px rgba(255,255,255,0.7),
            inset 0 -3px 8px rgba(203,213,225,0.5),
            inset 0 0 50px rgba(248,250,252,0.4),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 0 0 1px rgba(255,255,255,0.6),
            0 0 0 1px rgba(203,213,225,0.7),
            0 2px 8px rgba(15,23,42,0.12);
    }
}

@keyframes subtleFloat {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-2px);
    }
 }

 /* PEACEFUL ANIMATIONS */
 @keyframes gentleFloat {
     0%, 100% {
         transform: translateY(0px) scale(1);
         box-shadow: 
             0 0 16px rgba(220, 240, 255, 0.3),
             0 6px 18px rgba(15, 23, 42, 0.06),
             0 3px 10px rgba(15, 23, 42, 0.04),
             inset 0 2px 4px rgba(255, 255, 255, 0.5),
             inset 0 -1px 2px rgba(220, 240, 255, 0.3);
     }
     50% {
         transform: translateY(-1px) scale(1.005);
         box-shadow: 
             0 0 20px rgba(220, 240, 255, 0.4),
             0 8px 22px rgba(15, 23, 42, 0.07),
             0 4px 12px rgba(15, 23, 42, 0.05),
             inset 0 2px 5px rgba(255, 255, 255, 0.6),
             inset 0 -1px 3px rgba(220, 240, 255, 0.4);
     }
 }

/* Glass Quality Override */
.leonardo-select select {
    backdrop-filter: blur(14px) saturate(160%) !important;
}

/* PREMIUM GLASS TEXTURE */
.premium-glass-texture {
    position: relative;
    overflow: hidden;
}
.premium-glass-texture::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    /* Layered gradients + subtle noise pattern */
    background:
        radial-gradient(circle at 30% 20%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.15) 60%),
        radial-gradient(circle at 80% 100%, rgba(255,186,150,0.50) 0%, rgba(255,186,150,0.15) 65%),
        radial-gradient(circle at 10% 80%, rgba(255,204,204,0.45) 0%, transparent 70%),
        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.35) 0%, transparent 50%),
        url('data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP4DwQACfsD/UPPe+4AAAAASUVORK5CYII=');
    background-blend-mode: overlay, overlay, overlay, screen, multiply;
    opacity: 0.85;
    filter: blur(3px) saturate(130%);
}

.premium-glass-texture::after {
    content: '';
    position: absolute;
    inset: -6px;
    pointer-events: none;
    border-radius: inherit;
    background:
        conic-gradient(from 0deg at 50% 50%,
            rgba(255, 255, 255, 0.65) 0deg,
            rgba(255, 140, 255, 0.55) 60deg,
            rgba(255, 170, 255, 0.45) 90deg,
            rgba(140, 255, 255, 0.55) 150deg,
            rgba(170, 255, 255, 0.45) 180deg,
            rgba(255, 255, 140, 0.55) 240deg,
            rgba(255, 255, 170, 0.45) 270deg,
            rgba(255, 255, 255, 0.65) 360deg);
    filter: blur(16px) saturate(150%);
    opacity: 0.8;
    animation: radiantRotate 8s linear infinite;
}

@keyframes radiantRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* ==== PASTEL SUNRISE GLASS TEXTURE (terminal) ==== */
.pastel-glass-texture {
    position: relative;
    overflow: hidden;
}
.pastel-glass-texture::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    background:
        /* corner auras */
        radial-gradient(circle at 15% 25%, rgba(255, 180, 255, 0.55) 0%, transparent 60%),
        radial-gradient(circle at 85% 15%, rgba(180, 255, 255, 0.45) 0%, transparent 65%),
        radial-gradient(circle at 85% 85%, rgba(255, 255, 180, 0.50) 0%, transparent 60%),
        radial-gradient(circle at 15% 85%, rgba(255, 200, 180, 0.55) 0%, transparent 60%),
        /* soft centre blend */
        radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%),
        /* swirl pattern (very subtle) */
        url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwMCIgaGVpZ2h0PSIyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDAgcTgwMCAxMDAwIDE2MDAgMCAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSIzLjUgMy41IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLj05Ii8+PC9zdmc+')
        ;
    background-blend-mode: screen, screen, screen, screen, overlay, multiply;
    filter: blur(4px) saturate(140%);
    opacity: 0.65; /* slightly less intense for readability */
}
.pastel-glass-texture::after {
    content: '';
    position: absolute;
    inset: -8px;
    pointer-events: none;
    border-radius: inherit;
    background:
    conic-gradient(from 0deg at 50 % 50 %,
        rgba(255, 255, 255, 0.75) 0deg,
        rgba(255, 150, 255, 0.45) 90deg,
        rgba(150, 255, 255, 0.45) 180deg,
        rgba(255, 255, 150, 0.45) 270deg,
        rgba(255, 255, 255, 0.75) 360deg);
    filter: blur(18px) saturate(160 %);
    opacity: 0.85;
    animation: pastelRotate 12s linear infinite;
}
@keyframes pastelRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}

/* === Pastel text contrast === */
.pastel-glass-texture pre,
.pastel-glass-texture .emerald-terminal-text {
    color: rgba(15,23,42,0.96) !important;
    text-shadow: 0 1px 1px rgba(255,255,255,0.8), 0 -1px 1px rgba(0,0,0,0.3);
}
/* =================================================== */

/* === Quantum Dry Glass for Code Editor === */
.code-glass-panel {
    position: relative;
    overflow: hidden;
}
.code-glass-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 12px;
    background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.04) 100%),
        radial-gradient(ellipse at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 70%),
        radial-gradient(ellipse at 75% 75%, rgba(255, 255, 255, 0.01) 0%, transparent 65%);
    backdrop-filter: none;
    opacity: 0.98;
    box-shadow:
        /* Glass edge highlights only */
        inset 0 1px 1px rgba(255, 255, 255, 0.3),
        inset 0 -1px 1px rgba(255, 255, 255, 0.1),
        inset 1px 0 1px rgba(255, 255, 255, 0.2),
        inset -1px 0 1px rgba(255, 255, 255, 0.2),
        /* Very subtle depth */
        0 2px 8px rgba(0, 0, 0, 0.03);
}
/* Glass border effect */
.code-glass-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}
/* Crystal clear etched text */
.code-glass-panel textarea,
.code-glass-panel pre {
    color: rgba(20, 30, 40, 0.95) !important;
    text-shadow: 
        0 0 1px rgba(255, 255, 255, 0.7),
        0 1px 0 rgba(255, 255, 255, 0.4);
    font-weight: 500;
    background: transparent !important;
}
/* ========================================== */

/* === Remove Blurriness from Text Areas === */
.monaco-editor, .monaco-editor *,
.renaissance-terminal, .renaissance-terminal *,
.emerald-terminal-text, .emerald-terminal-text *,
.renaissance-panel *,
textarea, pre, code {
    filter: none !important;
    backdrop-filter: none !important;
}

`;

// Renaissance CSS Keyframes with Mathematical Precision
const additionalAnimations = `
@keyframes sacredGeometry {
    0 %, 100 % {
        transform: translateX(0%) translateY(0%) rotate(0deg);
        opacity: 0.3;
    }
    25% {
        transform: translateX(61.803%) translateY(-31.831%) rotate(137.508deg);
        opacity: 0.4;
    }
    50% {
        transform: translateX(-38.197%) translateY(-15.915%) rotate(180deg);
        opacity: 0.5;
    }
    75% {
        transform: translateX(31.831%) translateY(-61.803%) rotate(275.016deg);
        opacity: 0.35;
    }
}

@keyframes renaissanceGlow {
    0 %, 100 % {
        transform: translateY(0px) rotateX(0deg);
        filter: sepia(0%) brightness(1) contrast(1);
        box-shadow:
            0 0 30px rgba(139, 119, 89, 0.3),
            0 0 60px rgba(139, 119, 89, 0.2),
            0 0 90px rgba(139, 119, 89, 0.1),
            inset 0 2px 0 rgba(255, 255, 255, 0.4);
    }
    50% {
        transform: translateY(-38.197px) rotateX(111.246deg);
        filter: sepia(20%) brightness(1.2) contrast(1.1);
        box-shadow:
            0 0 40px rgba(160, 140, 110, 0.4),
            0 0 80px rgba(160, 140, 110, 0.3),
            0 0 120px rgba(160, 140, 110, 0.2),
            inset 0 3px 0 rgba(255, 255, 255, 0.6);
    }
}

@keyframes vitruvianFloat {
    0 %, 100 % {
        transform: scale(1) rotate(0deg) translateZ(0px);
        opacity: 0.8;
    }
    25 % {
        transform: scale(1.02) rotate(55.754deg) translateZ(30.901px);
        opacity: 0.9;
    }
    50 % {
        transform: scale(0.98) rotate(111.508deg) translateZ(0px);
        opacity: 1;
    }
    75% {
        transform: scale(1.01) rotate(167.262deg) translateZ(-18.541px);
        opacity: 0.85;
    }
}

@keyframes mechanicalGears {
    0% {
        transform: rotate(0deg);
        filter: contrast(1) brightness(1);
    }
    100% {
        transform: rotate(582.48deg);
        filter: contrast(1.1) brightness(1.05);
    }
}

@keyframes manuscriptFloat {
    0%, 100% {
        transform: translateY(0px) rotateZ(0deg) scale(1);
        background-position: 0% 0%;
    }
    33% {
        transform: translateY(-31.831px) rotateZ(74.164deg) scale(1.02);
        background-position: 38.196% 38.196%;
    }
    66% {
        transform: translateY(15.915px) rotateZ(148.328deg) scale(0.98);
        background-position: 61.803% 61.803%;
    }
}

@keyframes goldenRatio {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(0.809) rotate(137.508deg); }
    100% { transform: scale(1) rotate(275.016deg); }
}

@keyframes anatomicalPulse {
    0%, 100% {
        transform: scale(1) translateZ(0px);
        filter: sepia(10%) brightness(1) hue-rotate(0deg);
        border-radius: 12px;
    }
    50% {
        transform: scale(1.03) translateZ(6px);
        filter: sepia(25%) brightness(1.15) hue-rotate(9deg);
        border-radius: 15px;
    }
}
`;

// Inject Da Vinci Renaissance styles into document head
if (typeof document !== 'undefined') {
    const mainStyleSheet = document.createElement('style');
    mainStyleSheet.textContent = renaissanceStyles;
    document.head.appendChild(mainStyleSheet);

    const animationStyleSheet = document.createElement('style');
    animationStyleSheet.textContent = additionalAnimations;
    document.head.appendChild(animationStyleSheet);
}





// Clean Static Interface - No 3D components needed





// UI Components Only - No 3D Elements Needed

// Da Vinci Renaissance Aesthetic Design System - Master's Vision
const RenaissancePanel = ({ children, className, variant = 'manuscript', ...props }) => {
    const PHI = (1 + Math.sqrt(5)) / 2; // Golden Ratio - Divine Proportion

    const variants = {
        manuscript: {
            background: `
                linear-gradient(135deg, rgba(244, 241, 232, 0.95), rgba(232, 225, 208, 0.85)),
                radial-gradient(circle at 30% 30%, rgba(139, 119, 89, 0.15), transparent 50%),
                url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L40 80M0 40L80 40' stroke='%23d4c4a8' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='40' cy='40' r='30' fill='none' stroke='%23d4c4a8' stroke-width='0.3' opacity='0.2'/%3E%3C/svg%3E")
            `,
            backdropFilter: 'blur(20px) saturate(130%)',
            border: '2px solid rgba(139, 119, 89, 0.4)',
            boxShadow: `
                0 25px 50px rgba(139, 69, 19, 0.3),
                0 12px 25px rgba(139, 119, 89, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.6),
                inset 0 -2px 0 rgba(139, 119, 89, 0.3),
                0 0 0 1px rgba(139, 119, 89, 0.1)
            `
        },
        anatomical: {
            background: `
                linear-gradient(135deg, rgba(248, 245, 235, 0.95), rgba(240, 235, 220, 0.88)),
                radial-gradient(circle at 20% 80%, rgba(139, 119, 89, 0.1), transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(160, 140, 110, 0.08), transparent 30%),
                url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23d4c4a8' stroke-width='0.4' fill='none' opacity='0.25'%3E%3Ccircle cx='60' cy='60' r='45'/%3E%3Crect x='25' y='25' width='70' height='70'/%3E%3Cpath d='M60 15L60 105M15 60L105 60'/%3E%3Cpath d='M30 30L90 90M90 30L30 90'/%3E%3C/g%3E%3C/svg%3E")
            `,
            backdropFilter: 'blur(25px) saturate(140%)',
            border: '2px solid rgba(160, 140, 110, 0.5)',
            boxShadow: `
                0 30px 60px rgba(139, 69, 19, 0.35),
                0 15px 30px rgba(160, 140, 110, 0.25),
                inset 0 3px 0 rgba(255, 255, 255, 0.7),
                inset 0 -3px 0 rgba(139, 119, 89, 0.4),
                0 0 100px rgba(160, 140, 110, 0.15)
            `
        },
        mechanical: {
            background: `
                linear-gradient(135deg, rgba(141, 110, 99, 0.9), rgba(109, 76, 65, 0.85)),
                radial-gradient(circle at 50% 50%, rgba(184, 156, 132, 0.2), transparent 60%),
                url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%236d4c41' stroke-width='0.8' fill='none' opacity='0.4'%3E%3Ccircle cx='50' cy='50' r='35' /%3E%3Ccircle cx='50' cy='50' r='25' /%3E%3Ccircle cx='50' cy='50' r='15' /%3E%3Cpath d='M50 15L50 85M15 50L85 50'/%3E%3Cpath d='M35.35 35.35L64.64 64.64M64.64 35.35L35.35 64.64'/%3E%3C/g%3E%3C/svg%3E")
            `,
            backdropFilter: 'blur(18px) saturate(120%)',
            border: '3px solid rgba(141, 110, 99, 0.6)',
            boxShadow: `
                0 20px 40px rgba(109, 76, 65, 0.4),
                0 10px 20px rgba(141, 110, 99, 0.3),
                inset 0 2px 0 rgba(184, 156, 132, 0.8),
                inset 0 -2px 0 rgba(109, 76, 65, 0.5)
            `
        }
    };

    return (
        <motion.div
            className={`
                relative overflow - hidden
transition - all duration - 1000 ease - out
hover: scale - [1.01] hover: rotate - [0.2deg]
                ${className}
`}
            style={{
                ...variants[variant],
                WebkitBackdropFilter: variants[variant].backdropFilter,
                transform: 'translateZ(0)', // Hardware acceleration
                borderRadius: `${20 / PHI} px`, // Golden ratio border radius
            }}
            whileHover={{
                y: -3,
                rotateX: 2,
                transition: { duration: 0.4, ease: "easeOut" }
            }}
            {...props}
        >
            {/* Leonardo's Sacred Geometry Overlay */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 23.606% 23.606%, transparent ${100 / PHI}%, rgba(139,119,89,0.1) ${100 / PHI + 1}%, rgba(139, 119, 89, 0.1) ${200 / PHI}%, transparent ${200 / PHI + 1}%),
                        radial-gradient(circle at 61.803% 61.803%, transparent ${100 / PHI}%, rgba(160,140,110,0.08) ${100 / PHI + 1}%, rgba(160, 140, 110, 0.08) ${200 / PHI}%, transparent ${200 / PHI + 1}%),
                        radial-gradient(circle at 76.394% 23.606%, transparent ${100 / PHI}%, rgba(139,119,89,0.06) ${100 / PHI + 1}%, rgba(139, 119, 89, 0.06) ${200 / PHI}%, transparent ${200 / PHI + 1}%)
                    `,
                    backgroundSize: `${80 * PHI}px ${80 * PHI} px, ${60 * PHI}px ${60 * PHI} px, ${100 * PHI}px ${100 * PHI} px`,
                    animation: 'sacredGeometry 25s ease-in-out infinite'
                }}
            />

            {/* Renaissance Paper Texture */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `
url("data:image/svg+xml,%3Csvg viewBox='0 0 800 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperTexture'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04 2.0' numOctaves='5' seed='8' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.87 0 0 0 0 0.78 0 0 0 0 0.59 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperTexture)' opacity='0.6'/%3E%3C/svg%3E")
                    `,
                    backgroundSize: '400px 300px'
                }}
            />

            {/* Vitruvian Man Inspired Golden Ratio Guidelines */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="goldenGrid" x="0" y="0" width={`${100 / PHI} `} height={`${100 / PHI} `} patternUnits="userSpaceOnUse">
                            <path
                                d={`M 0 0 L ${100 / PHI} 0 L ${100 / PHI} ${100 / PHI} L 0 ${100 / PHI} Z`}
                                fill="none"
                                stroke="rgba(139, 119, 89, 0.4)"
                                strokeWidth="0.5"
                            />
                            <circle
                                cx={`${50 / PHI} `}
                                cy={`${50 / PHI} `}
                                r={`${40 / PHI} `}
                                fill="none"
                                stroke="rgba(139, 119, 89, 0.3)"
                                strokeWidth="0.3"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#goldenGrid)" />
                </svg>
            </div>

            {/* Content with Renaissance Typography */}
            <div style={{ position: 'relative', zIndex: 10, padding: '32px', fontFamily: "'Crimson Text', 'Times New Roman', serif" }}>
                {children}
            </div>

            {/* Leonardo's Mirror Writing Animation */}
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            fontSize: `${10 + Math.random() * 6}px`,
                            opacity: 0.2,
                            fontFamily: 'serif',
                            right: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            transform: 'scaleX(-1)', // Mirror writing effect
                            color: 'rgba(139, 119, 89, 0.6)'
                        }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            y: [0, -20, 0],
                            transition: {
                                duration: 8 + Math.random() * 4,
                                repeat: Infinity,
                                delay: i * 2
                            }
                        }}
                    >
                        {['Arte et Scientia', 'Codex Atlanticus', 'Homo Vitruvianus', 'Mona Lisa', 'The Last Supper'][i]}
                    </motion.div>
                ))}
            </div>

            {/* Renaissance Illumination Effect */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                            rgba(255, 215, 0, 0.1), transparent 40%)
                    `,
                    filter: 'blur(30px)',
                    borderRadius: `${20 / PHI} px`
                }}
            />
        </motion.div>
    );
};

// Hyper-Advanced Button with Neural Network Aesthetics
const NeuralButton = ({ children, onClick, disabled, variant = 'primary', size = 'md', className = '', ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    const variants = {
        primary: {
            background: `linear-gradient(135deg,
                rgba(255, 255, 255, 0.4),
                rgba(255, 255, 255, 0.2))`,
            color: '#1a1a1a',
            boxShadow: `
0 10px 30px rgba(0, 0, 0, 0.1),
    0 4px 10px rgba(0, 0, 0, 0.05),
        inset 0 0 0 1px rgba(255, 255, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.6)`
        },
        neural: {
            background: `linear-gradient(135deg,
                rgba(255, 255, 255, 0.5),
                rgba(255, 255, 255, 0.2))`,
            color: '#1a1a1a',
            boxShadow: `
0 15px 40px rgba(0, 0, 0, 0.1),
    0 8px 20px rgba(0, 0, 0, 0.05),
        inset 0 0 0 1px rgba(255, 255, 255, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.7)`
        },
        quantum: {
            background: `linear-gradient(135deg,
                rgba(255, 255, 255, 0.6),
                rgba(255, 255, 255, 0.3))`,
            color: '#1a1a1a',
            boxShadow: `
0 20px 50px rgba(0, 0, 0, 0.1),
    0 10px 25px rgba(0, 0, 0, 0.05),
        inset 0 0 0 1px rgba(255, 255, 255, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)`
        }
    };

    const sizes = {
        sm: 'px-6 py-3 text-sm',
        md: 'px-8 py-4 text-base',
        lg: 'px-12 py-5 text-lg'
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative rounded - 2xl font - bold tracking - wide overflow - hidden
backdrop - blur - lg backdrop - saturate - 150
transition - all duration - 500 ease - out
                ${sizes[size]}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${className}
`}
            style={{
                ...variants[variant],
                transform: 'translateZ(0)',
                WebkitTapHighlightColor: 'transparent',
                backdropFilter: 'blur(12px) saturate(180%)',
            }}
            whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
            }}
            {...props}
        >
            {/* Water droplet refraction effect */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `
                        radial-gradient(circle at 30% 30%,
                            rgba(255, 255, 255, 0.4) 0%,
                            rgba(255, 255, 255, 0.1) 30%,
                            transparent 70%),
                        radial-gradient(circle at 70% 70%,
                            rgba(255, 255, 255, 0.3) 0%,
                            rgba(255, 255, 255, 0.1) 20%,
                            transparent 50%)
                    `,
                    filter: 'blur(4px)',
                    mixBlendMode: 'overlay'
                }}
            />

            {/* Surface tension ripple effect */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: `
                        radial-gradient(circle at 50% 50%,
                            transparent 20%,
                            rgba(255, 255, 255, 0.1) 40%,
                            transparent 60%)
                    `,
                    animation: isHovered ? 'ripple 2s ease-out infinite' : 'none'
                }}
            />

            {/* Text with perfect anti-aliasing */}
            <span className="relative z-10 font-medium tracking-wide mix-blend-overlay">
                {children}
            </span>

            {/* Edge highlight */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(135deg,
                            rgba(255, 255, 255, 0.4) 0%,
                            transparent 50%,
                            rgba(255, 255, 255, 0.1) 100%)
                    `,
                    mixBlendMode: 'overlay'
                }}
            />

            <style jsx>{`
@keyframes ripple {
    0 % {
        transform: scale(0.8);
        opacity: 0;
    }
    50 % {
        transform: scale(1.2);
        opacity: 0.3;
    }
    100 % {
        transform: scale(1.5);
        opacity: 0;
    }
}
`}</style>
        </motion.button>
    );
};

// Ultra-Sophisticated Select with Quantum Physics Aesthetics  
const QuantumSelect = ({ value, onChange, options, placeholder, className = '', ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const option = options.find(opt => opt.value === value);
        setSelectedOption(option);
    }, [value, options]);

    return (
        <div className={`relative ${className} `}>
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div
                    className={`
w - full px - 6 py - 4 rounded - 2xl
transition - all duration - 500 ease - out
                        ${isOpen ? 'rounded-b-lg' : ''}
`}
                    style={{
                        background: `
                            linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05)),
                            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1), transparent 50%)
                        `,
                        backdropFilter: 'blur(30px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: `
0 10px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ color: '#1f2937', fontWeight: '600', letterSpacing: '0.025em' }}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <motion.svg
                            style={{ width: '20px', height: '20px', color: '#4b5563', marginLeft: '8px' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 50,
                            marginTop: '8px',
                            background: `
                                linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08)),
                                radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08), transparent 70%)
                            `,
                            backdropFilter: 'blur(40px) saturate(200%)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            borderRadius: '16px',
                            boxShadow: `
                                0 20px 40px rgba(0, 0, 0, 0.15),
                                0 8px 20px rgba(0, 0, 0, 0.1),
                                inset 0 1px 0 rgba(255, 255, 255, 0.4)
                            `
                        }}
                    >
                        {options.map((option, index) => (
                            <motion.div
                                key={option.value}
                                onClick={() => {
                                    onChange({ target: { value: option.value } });
                                    setIsOpen(false);
                                }}
                                className={`
                                    px-6 py-4 cursor-pointer transition-all duration-300
                                    hover:bg-white/10 first:rounded-t-2xl last:rounded-b-2xl
                                    ${option.value === value ? 'bg-white/15' : ''}
                                `}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    x: 4
                                }}
                            >
                                <span style={{ color: '#1f2937', fontWeight: '500', letterSpacing: '0.025em' }}>
                                    {option.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Hyper-Advanced Badge with Holographic Effects
const HolographicBadge = ({ children, className = '' }) => (
    <motion.span
        className={`
            inline-flex items-center px-4 py-2 rounded-xl
            font-bold text-sm tracking-wider uppercase
            ${className}
        `}
        style={{
            background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1)),
                linear-gradient(45deg, rgba(59, 130, 246, 0.1), transparent 30%),
                linear-gradient(-45deg, rgba(147, 51, 234, 0.08), transparent 30%)
            `,
            backdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `
0 8px 20px rgba(0, 0, 0, 0.1),
    0 3px 8px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05)
                `,
            color: '#374151',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
        }}
        whileHover={{
            scale: 1.05,
            boxShadow: `
0 12px 30px rgba(0, 0, 0, 0.15),
    0 6px 12px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
            0 0 20px rgba(59, 130, 246, 0.2)
                `
        }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.span>
);

// Clean Interface Themes - No 3D Components
const INTERFACE_THEMES = [
    {
        id: 'professional',
        label: 'PROFESSIONAL',
        name: 'Clean Development Environment',
        color: '#6b7280',
        bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1)'
    },
    {
        id: 'minimal',
        label: 'MINIMAL',
        name: 'Distraction-Free Coding',
        color: '#374151',
        bg: 'linear-gradient(135deg, #ffffff, #f9fafb, #f3f4f6)'
    },
    {
        id: 'focus',
        label: 'FOCUS MODE',
        name: 'Pure Productivity',
        color: '#111827',
        bg: 'linear-gradient(135deg, #fafafa, #f5f5f5, #e5e5e5)'
    }
];

// Professional Code Snippets with Ultra-Modern Output
const HYPER_CODE_EXAMPLES = {
    javascript: {
        label: 'JavaScript',
        badge: 'JS',
        code: `// Quantum Neural Network Implementation
class QuantumNeuralProcessor {
    constructor(dimensions = 1024) {
        this.dimensions = dimensions;
        this.quantumState = new Float32Array(dimensions);
        this.entanglementMatrix = this.createEntanglementMatrix();
        this.coherenceLevel = 0.97;

        console.log('🧠 Quantum Neural Processor - Initialized');
        console.log(\`✨ Dimensions: \${dimensions}\`);
        console.log(\`🔗 Entanglement Matrix: \${dimensions}x\${dimensions}\`);
    }
    
    createEntanglementMatrix() {
        const matrix = [];
        for (let i = 0; i < this.dimensions; i++) {
            matrix[i] = new Float32Array(this.dimensions);
            for (let j = 0; j < this.dimensions; j++) {
                matrix[i][j] = Math.random() * Math.PI * 2;
            }
        }
        return matrix;
    }
    
    async processQuantumData(inputData) {
        console.log('🚀 Starting Quantum Processing...');
        
        // Simulate quantum superposition
        for (let i = 0; i < this.dimensions; i++) {
            this.quantumState[i] = Math.sin(inputData[i % inputData.length] * this.entanglementMatrix[i][0]);
        }
        
        // Apply quantum interference
        const interference = this.quantumState.reduce((sum, state, idx) => {
            return sum + state * Math.cos(this.entanglementMatrix[idx][idx]);
        }, 0);
        
        // Measure quantum state collapse
        const measurement = Math.abs(interference) / this.dimensions;
        
        console.log(\`⚡ Quantum Interference: \${interference.toFixed(6)}\`);
        console.log(\`📊 Measurement Result: \${measurement.toFixed(6)}\`);
        console.log(\`🎯 Coherence Level: \${(this.coherenceLevel * 100).toFixed(2)}%\`);
        
        return {
            quantumState: this.quantumState,
            interference,
            measurement,
            coherence: this.coherenceLevel
        };
    }
    
    async trainNeuralQuantumModel(trainingData) {
        console.log('🎓 Neural Quantum Training - Initiated');
        
        for (let epoch = 0; epoch < 100; epoch++) {
            const batchResults = [];
            
            for (const batch of trainingData) {
                const result = await this.processQuantumData(batch);
                batchResults.push(result.measurement);
            }
            
            // Update entanglement based on results
            const avgMeasurement = batchResults.reduce((a, b) => a + b, 0) / batchResults.length;
            this.coherenceLevel = Math.min(0.99, this.coherenceLevel + avgMeasurement * 0.001);
            
            if (epoch % 10 === 0) {
                console.log(\`📈 Epoch \${epoch}: Coherence \${(this.coherenceLevel * 100).toFixed(3)}%\`);
            }
        }
        
        console.log('✅ Neural Quantum Training - Complete');
        console.log(\`🏆 Final Coherence: \${(this.coherenceLevel * 100).toFixed(4)}%\`);
    }
}

// Initialize and demonstrate
const neuralProcessor = new QuantumNeuralProcessor(512);
const mockData = Array.from({length: 10}, () => Math.random() * 10);

neuralProcessor.processQuantumData(mockData)
    .then(result => {
        console.log('🎉 Quantum Processing Complete!');
        console.log('📊 Final Results:', result);
    });`,
        output: `[NEURAL SYSTEM] Quantum Neural Processor v3.0

🧠 Quantum Neural Processor - Initialized
✨ Dimensions: 512
🔗 Entanglement Matrix: 512x512
📡 Quantum State Vector: Ready
🔮 Coherence Stabilizers: Online

🚀 Starting Quantum Processing...
⚙️ Superposition calculation: 512 qubits
⚡ Quantum Interference: 0.847293
🌀 Entanglement correlation: 94.7%
📊 Measurement Result: 0.001653
🎯 Coherence Level: 97.00%

[QUANTUM ANALYSIS]
├── Processing Speed: 847.3 THz
├── Quantum Efficiency: 94.7%  
├── Neural Pathways: 262,144 active
├── Entanglement Strength: 0.973
└── Decoherence Time: 847.3 µs

🎉 Quantum Processing Complete!
📊 Neural quantum state successfully processed
🌟 System ready for next operation...`
    },

    python: {
        label: 'Python',
        badge: 'PY',
        code: `#!/usr/bin/env python3
"""
Hyper-Advanced Quantum Machine Learning Framework
Ultra-modern neural architecture with quantum processing capabilities
"""

import numpy as np
import tensorflow as tf
from typing import Tuple, List, Dict, Optional
import asyncio
import logging
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor

@dataclass
class QuantumConfig:
    """Configuration for quantum neural networks"""
    num_qubits: int = 64
    coherence_time: float = 100.0  # microseconds
    gate_fidelity: float = 0.999
    decoherence_rate: float = 0.001

class HyperQuantumNeuralNetwork:
    """
    Advanced Quantum-Enhanced Neural Network
    Combines classical deep learning with quantum computing principles
    """
    
    def __init__(self, config: QuantumConfig):
        self.config = config
        self.quantum_state = np.zeros(2**config.num_qubits, dtype=complex)
        self.classical_model = self._build_classical_network()
        self.quantum_gates = self._initialize_quantum_gates()
        self.training_metrics = {
            'quantum_fidelity': [],
            'classical_accuracy': [],
            'hybrid_performance': []
        }
        
        print("🚀 Hyper-Quantum Neural Network - Initializing...")
        print(f"⚛️  Qubits: {config.num_qubits}")
        print(f"🔄 Coherence Time: {config.coherence_time}µs")
        print(f"📡 Gate Fidelity: {config.gate_fidelity * 100:.3f}%")
        
    def _build_classical_network(self) -> tf.keras.Model:
        """Build the classical neural network component"""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(256, activation='relu', input_dim=self.config.num_qubits),
            tf.keras.layers.BatchNormalization(),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.BatchNormalization(),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(10, activation='softmax')
        ])
        
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def _initialize_quantum_gates(self) -> Dict[str, np.ndarray]:
        """Initialize quantum gate matrices"""
        return {
            'hadamard': np.array([[1, 1], [1, -1]]) / np.sqrt(2),
            'pauli_x': np.array([[0, 1], [1, 0]]),
            'pauli_y': np.array([[0, -1j], [1j, 0]]),
            'pauli_z': np.array([[1, 0], [0, -1]]),
            'phase': np.array([[1, 0], [0, 1j]])
        }
    
    async def quantum_feature_map(self, classical_data: np.ndarray) -> np.ndarray:
        """Map classical data to quantum feature space"""
        print("🔮 Quantum Feature Mapping - Started")
        
        # Initialize quantum state in superposition
        self.quantum_state[0] = 1.0  # |00...0⟩ state
        
        # Apply quantum feature encoding
        for i, data_point in enumerate(classical_data):
            if i >= self.config.num_qubits:
                break
                
            # Encode data as rotation angles
            theta = data_point * np.pi
            phi = data_point * np.pi / 2
            
            # Apply parameterized quantum gates
            rotation_matrix = np.array([
                [np.cos(theta/2), -1j * np.sin(theta/2) * np.exp(-1j * phi)],
                [-1j * np.sin(theta/2) * np.exp(1j * phi), np.cos(theta/2)]
            ])
            
            # Simulate quantum gate application (simplified)
            self.quantum_state *= np.abs(rotation_matrix[0, 0])
        
        # Measure quantum state probabilities
        probabilities = np.abs(self.quantum_state[:self.config.num_qubits])**2
        probabilities /= np.sum(probabilities)  # Normalize
        
        print(f"⚡ Quantum encoding completed: {len(probabilities)} features")
        return probabilities
    
    async def hybrid_training_step(self, X_batch: np.ndarray, y_batch: np.ndarray) -> Dict[str, float]:
        """Perform one step of hybrid quantum-classical training"""
        
        # Quantum feature extraction
        quantum_features = []
        for sample in X_batch:
            q_features = await self.quantum_feature_map(sample)
            quantum_features.append(q_features)
        
        quantum_features = np.array(quantum_features)
        
        # Classical neural network training
        with tf.GradientTape() as tape:
            predictions = self.classical_model(quantum_features)
            loss = tf.keras.losses.categorical_crossentropy(y_batch, predictions)
        
        # Apply gradients
        gradients = tape.gradient(loss, self.classical_model.trainable_variables)
        self.classical_model.optimizer.apply_gradients(
            zip(gradients, self.classical_model.trainable_variables)
        )
        
        # Calculate metrics
        accuracy = tf.keras.metrics.categorical_accuracy(y_batch, predictions)
        quantum_fidelity = np.mean(np.abs(self.quantum_state)**2)
        
        return {
            'loss': float(np.mean(loss)),
            'accuracy': float(np.mean(accuracy)),
            'quantum_fidelity': quantum_fidelity
        }
    
    async def train_hybrid_model(self, X_train: np.ndarray, y_train: np.ndarray, 
                                epochs: int = 50, batch_size: int = 32):
        """Train the hybrid quantum-classical model"""
        print("🎓 Hybrid Model Training - Initiated")
        print(f"📊 Training Samples: {len(X_train)}")
        print(f"🔄 Epochs: {epochs}")
        print(f"📦 Batch Size: {batch_size}")
        
        num_batches = len(X_train) // batch_size
        
        for epoch in range(epochs):
            epoch_metrics = {'loss': [], 'accuracy': [], 'quantum_fidelity': []}
            
            for batch_idx in range(num_batches):
                start_idx = batch_idx * batch_size
                end_idx = start_idx + batch_size
                
                X_batch = X_train[start_idx:end_idx]
                y_batch = y_train[start_idx:end_idx]
                
                metrics = await self.hybrid_training_step(X_batch, y_batch)
                
                for key, value in metrics.items():
                    epoch_metrics[key].append(value)
            
            # Log epoch results
            avg_loss = np.mean(epoch_metrics['loss'])
            avg_accuracy = np.mean(epoch_metrics['accuracy'])
            avg_fidelity = np.mean(epoch_metrics['quantum_fidelity'])
            
            self.training_metrics['classical_accuracy'].append(avg_accuracy)
            self.training_metrics['quantum_fidelity'].append(avg_fidelity)
            
            if epoch % 10 == 0:
                print(f"📈 Epoch {epoch:3d}: Loss={avg_loss:.6f}, Accuracy={avg_accuracy:.4f}, Q-Fidelity={avg_fidelity:.6f}")
        
        print("✅ Hybrid Training Complete!")
        print(f"🏆 Final Accuracy: {self.training_metrics['classical_accuracy'][-1]:.4f}")
        print(f"⚛️ Final Quantum Fidelity: {self.training_metrics['quantum_fidelity'][-1]:.6f}")

# Initialize and run the quantum neural network
async def main():
    config = QuantumConfig(num_qubits=32, coherence_time=150.0, gate_fidelity=0.9995)
    qnn = HyperQuantumNeuralNetwork(config)
    
    # Generate synthetic quantum-inspired data
    X_train = np.random.randn(1000, 32)
    y_train = tf.keras.utils.to_categorical(np.random.randint(0, 10, 1000), 10)
    
    await qnn.train_hybrid_model(X_train, y_train, epochs=30)
    
    print("🌟 Quantum Neural Network Demo Complete!")

# Run the quantum simulation
if __name__ == "__main__":
    asyncio.run(main())`,
        output: `[QUANTUM SYSTEM] Hyper-Quantum Neural Network v4.0

🚀 Hyper-Quantum Neural Network - Initializing...
⚛️  Qubits: 32
🔄 Coherence Time: 150.0µs  
📡 Gate Fidelity: 99.950%
🧠 Classical Network: 6 layers, 592,906 parameters
🔗 Quantum-Classical Interface: Ready

🎓 Hybrid Model Training - Initiated
📊 Training Samples: 1000
🔄 Epochs: 30
📦 Batch Size: 32

🔮 Quantum Feature Mapping - Started
⚡ Quantum encoding completed: 32 features
📈 Quantum state superposition: 94.7%

[TRAINING PROGRESS]
📈 Epoch   0: Loss=0.847293, Accuracy=0.7234, Q-Fidelity=0.987543
📈 Epoch  10: Loss=0.234857, Accuracy=0.8967, Q-Fidelity=0.994728
📈 Epoch  20: Loss=0.098472, Accuracy=0.9534, Q-Fidelity=0.997849

[QUANTUM METRICS]
├── Quantum Coherence: 99.78%
├── Gate Operations: 15,360 executed
├── Decoherence Events: 23 detected
├── Entanglement Fidelity: 97.3%
└── Measurement Accuracy: 99.12%

✅ Hybrid Training Complete!
🏆 Final Accuracy: 0.9534
⚛️ Final Quantum Fidelity: 0.997849
🌟 Quantum Neural Network Demo Complete!`
    },
    java: {
        label: 'Java',
        code: `// Classic Hello World in Java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, Quantum World!");\n    }\n}`,
        output: `Compiling HelloWorld.java...\nRunning...\nHello, Quantum World!`
    },
    c: {
        label: 'C',
        code: `/* Basic C program */\n#include <stdio.h>\nint main(void) {\n    printf("Hello, Quantum World!\\n");\n    return 0;\n}`,
        output: `gcc main.c -o main\n./main\nHello, Quantum World!`
    },
    cpp: {
        label: 'C++',
        code: `// Simple C++ example\n#include <iostream>\nint main(){\n    std::cout << "Hello, Quantum World!" << std::endl;\n    return 0;\n}`,
        output: `g++ main.cpp -o main\n./main\nHello, Quantum World!`
    }
};

// Ultra-Modern App Component with Quantum Aesthetics
// Da Vinci Renaissance 3D Masterpiece - A Living Art Installation


// Simple Code Examples
const CODE_EXAMPLES = {
    javascript: {
        label: 'JavaScript',
        code: `// Quantum Neural Network Implementation
class QuantumProcessor {
    constructor(qubits = 64) {
        this.qubits = qubits;
        this.coherence = 0.95;
        this.entanglementMatrix = this.initializeMatrix();
        
        console.log('🚀 Quantum Processor Initialized');
        console.log(\`⚛️ Qubits: \${this.qubits}\`);
        console.log(\`🔗 Coherence: \${(this.coherence * 100).toFixed(1)}%\`);
    }
    
    initializeMatrix() {
        const matrix = [];
        for (let i = 0; i < this.qubits; i++) {
            matrix[i] = Array.from({length: this.qubits}, () => Math.random() * Math.PI);
        }
        return matrix;
    }
    
    async processQuantumData(data) {
        console.log('🧠 Processing quantum data...');
        console.log('⚡ Applying quantum gates...');
        
        // Simulate quantum processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Quantum transformation
        const result = data.map((value, index) => {
            const phase = value * this.entanglementMatrix[index % this.qubits][0];
            return Math.sin(phase) * this.coherence;
        });
        
        console.log('✅ Quantum processing complete!');
        console.log(\`📊 Processed \${data.length} quantum states\`);
        
        return result;
    }
    
    measureCoherence() {
        const randomDecay = Math.random() * 0.01;
        this.coherence = Math.max(0.9, this.coherence - randomDecay);
        return this.coherence;
    }
}

// Initialize and demonstrate
const processor = new QuantumProcessor(32);
const testData = Array.from({length: 16}, () => Math.random() * 10);

console.log('🎯 Starting quantum demonstration...');

processor.processQuantumData(testData)
    .then(result => {
        console.log('📈 Quantum Results:', result.slice(0, 5));
        console.log(\`🎉 Coherence Level: \${(processor.measureCoherence() * 100).toFixed(2)}%\`);
        console.log('🌟 Quantum demo complete!');
    })
    .catch(error => {
        console.error('❌ Quantum error:', error);
    });`,
        output: `[QUANTUM SYSTEM] Advanced Neural Processor v2.0

🚀 Quantum Processor Initialized
⚛️ Qubits: 32
🔗 Coherence: 95.0%

🎯 Starting quantum demonstration...
🧠 Processing quantum data...
⚡ Applying quantum gates...

[QUANTUM PROCESSING STAGES]
├── Superposition initialization: ✅
├── Entanglement correlation: 94.7%
├── Quantum gate operations: 2,048 applied
├── Phase coherence: Stable at 95.0%
├── Measurement preparation: Ready
└── State collapse: Controlled

✅ Quantum processing complete!
📊 Processed 16 quantum states
📈 Quantum Results: [0.847, -0.234, 0.592, -0.103, 0.776]
🎉 Coherence Level: 94.73%
🌟 Quantum demo complete!

[SYSTEM STATUS]
Processing Speed: 847.3 GHz
Neural Pathways: 16,384 active
Quantum Efficiency: 94.7%
Decoherence Time: 150μs`
    },
    python: {
        label: 'Python',
        code: `#!/usr/bin/env python3
"""
Advanced Quantum Neural Network Framework
Combining quantum computing with neural networks
"""

import numpy as np
import asyncio
from typing import List, Tuple, Optional
import time

class QuantumNeuralNetwork:
    """
    Quantum-enhanced neural network for advanced processing
    """
    
    def __init__(self, qubits: int = 16, layers: int = 3):
        self.qubits = qubits
        self.layers = layers
        self.quantum_state = np.zeros(2**qubits, dtype=complex)
        self.weights = [np.random.randn(qubits, qubits) for _ in range(layers)]
        self.coherence = 0.97
        
        print("🧠 Quantum Neural Network - Initializing")
        print(f"⚛️ Qubits: {qubits}")
        print(f"🔗 Layers: {layers}")
        print(f"🌊 Coherence: {self.coherence * 100:.1f}%")
        
    def apply_quantum_gates(self, data: np.ndarray) -> np.ndarray:
        """Apply quantum gates to input data"""
        print("⚡ Applying quantum transformations...")
        
        # Initialize quantum state
        self.quantum_state[0] = 1.0  # |0⟩ state
        
        # Apply rotations based on input data
        for i, value in enumerate(data[:self.qubits]):
            # Rotation angles from data
            theta = value * np.pi
            phi = value * np.pi / 2
            
            # Simulate quantum rotation
            rotation_factor = np.exp(1j * theta) * np.cos(phi)
            self.quantum_state[i] *= rotation_factor
            
        return np.abs(self.quantum_state[:self.qubits])**2
    
    def neural_processing(self, quantum_features: np.ndarray) -> np.ndarray:
        """Process quantum features through neural layers"""
        print("🧠 Neural network processing...")
        
        activation = quantum_features
        
        for layer_idx, weights in enumerate(self.weights):
            # Linear transformation
            activation = np.dot(activation, weights[:len(activation), :len(activation)])
            
            # Quantum-inspired activation function
            activation = np.tanh(activation) * self.coherence
            
            print(f"   Layer {layer_idx + 1}: Shape {activation.shape}")
            
        return activation
    
    async def process_data(self, input_data: np.ndarray) -> Tuple[np.ndarray, dict]:
        """Complete quantum neural processing pipeline"""
        print("🚀 Starting quantum neural processing...")
        
        # Quantum gate application
        quantum_features = self.apply_quantum_gates(input_data)
        
        # Neural network processing
        await asyncio.sleep(0.5)  # Simulate processing time
        neural_output = self.neural_processing(quantum_features)
        
        # Calculate metrics
        fidelity = np.abs(np.sum(self.quantum_state))**2
        energy = np.sum(neural_output**2)
        
        metrics = {
            'quantum_fidelity': fidelity,
            'neural_energy': energy,
            'coherence': self.coherence,
            'processing_time': time.time()
        }
        
        print("✅ Quantum neural processing complete!")
        return neural_output, metrics
    
    def train_step(self, input_batch: np.ndarray, target_batch: np.ndarray) -> float:
        """Single training step"""
        print("🎓 Training step...")
        
        # Forward pass
        predictions = []
        total_loss = 0
        
        for i, (input_data, target) in enumerate(zip(input_batch, target_batch)):
            # Process single sample
            quantum_features = self.apply_quantum_gates(input_data)
            neural_output = self.neural_processing(quantum_features)
            
            # Calculate loss (simplified)
            loss = np.mean((neural_output - target)**2)
            total_loss += loss
            
            # Update coherence based on performance
            if loss < 0.1:
                self.coherence = min(0.99, self.coherence + 0.001)
            
        avg_loss = total_loss / len(input_batch)
        print(f"   Batch loss: {avg_loss:.6f}")
        print(f"   Coherence: {self.coherence * 100:.3f}%")
        
        return avg_loss

# Demonstration
async def main():
    print("🌟 Quantum Neural Network Demo")
    print("=" * 40)
    
    # Initialize network
    qnn = QuantumNeuralNetwork(qubits=12, layers=2)
    
    # Generate sample data
    sample_data = np.random.randn(8)
    print(f"📊 Input data shape: {sample_data.shape}")
    
    # Process data
    result, metrics = await qnn.process_data(sample_data)
    
    print(f"📈 Output shape: {result.shape}")
    print(f"🎯 Quantum fidelity: {metrics['quantum_fidelity']:.6f}")
    print(f"⚡ Neural energy: {metrics['neural_energy']:.6f}")
    
    # Training demonstration
    print("\\n🎓 Training demonstration...")
    batch_size = 4
    input_batch = np.random.randn(batch_size, 8)
    target_batch = np.random.randn(batch_size, 8)
    
    for epoch in range(3):
        loss = qnn.train_step(input_batch, target_batch)
        print(f"Epoch {epoch + 1}: Loss = {loss:.6f}")
    
    print("🎉 Quantum neural demo complete!")

# Run the demonstration
if __name__ == "__main__":
    asyncio.run(main())`,
        output: `[QUANTUM SYSTEM] Quantum Neural Network v3.0

🧠 Quantum Neural Network - Initializing
⚛️ Qubits: 12
🔗 Layers: 2
🌊 Coherence: 97.0%

🌟 Quantum Neural Network Demo
========================================
📊 Input data shape: (8,)

🚀 Starting quantum neural processing...
⚡ Applying quantum transformations...
🧠 Neural network processing...
   Layer 1: Shape (8,)
   Layer 2: Shape (8,)
✅ Quantum neural processing complete!

📈 Output shape: (8,)
🎯 Quantum fidelity: 0.987543
⚡ Neural energy: 2.47853

🎓 Training demonstration...
🎓 Training step...
⚡ Applying quantum transformations...
🧠 Neural network processing...
   Layer 1: Shape (8,)
   Layer 2: Shape (8,)
   Batch loss: 0.847293
   Coherence: 97.000%
Epoch 1: Loss = 0.847293

🎓 Training step...
⚡ Applying quantum transformations...
🧠 Neural network processing...
   Layer 1: Shape (8,)
   Layer 2: Shape (8,)
   Batch loss: 0.234857
   Coherence: 97.001%
Epoch 2: Loss = 0.234857

🎓 Training step...
⚡ Applying quantum transformations...
🧠 Neural network processing...
   Layer 1: Shape (8,)
   Layer 2: Shape (8,)
   Batch loss: 0.098472
   Coherence: 97.002%
Epoch 3: Loss = 0.098472

🎉 Quantum neural demo complete!

[PERFORMANCE METRICS]
Final Coherence: 97.002%
Processing Speed: 2.47 THz
Neural Efficiency: 96.8%
Quantum Gates Applied: 144
Training Accuracy: 94.7%`
    },
    cpp: {
        label: 'C++',
        code: `#include <iostream>
#include <vector>
#include <memory>

class QuantumProcessor {
private:
    int qubits;
    double coherence;

public:
    QuantumProcessor(int q = 32) : qubits(q), coherence(0.95) {
        std::cout << "🚀 C++ Quantum Processor\\n";
        std::cout << "⚛️ Qubits: " << qubits << "\\n";
    }
    
    std::vector<double> process(const std::vector<double>& data) {
        std::cout << "🧠 Processing...\\n";
        std::vector<double> result;
        for(auto val : data) {
            result.push_back(sin(val) * coherence);
        }
        return result;
    }
};

int main() {
    auto processor = std::make_unique<QuantumProcessor>(16);
    std::vector<double> data = {1.2, 3.4, 5.6};
    auto result = processor->process(data);
    std::cout << "✅ Complete!\\n";
    return 0;
}`,
        output: `🚀 C++ Quantum Processor
⚛️ Qubits: 16
🧠 Processing...
✅ Complete!

[C++ COMPILER]
Version: g++ 11.3.0
Optimization: -O3
Execution: 0.001s
Memory: 2.1MB`
    },
    java: {
        label: 'Java',
        code: `public class QuantumProcessor {
    private int qubits;
    private double coherence;
    
    public QuantumProcessor(int qubits) {
        this.qubits = qubits;
        this.coherence = 0.95;
        System.out.println("🚀 Java Quantum Processor");
        System.out.println("⚛️ Qubits: " + qubits);
    }
    
    public double[] processData(double[] data) {
        System.out.println("🧠 Processing data...");
        double[] result = new double[data.length];
        
        for(int i = 0; i < data.length; i++) {
            result[i] = Math.sin(data[i]) * coherence;
        }
        
        System.out.println("✅ Processing complete!");
        return result;
    }
    
    public static void main(String[] args) {
        QuantumProcessor processor = new QuantumProcessor(24);
        double[] testData = {1.5, 2.7, 3.9};
        double[] result = processor.processData(testData);
        System.out.println("🎉 Demo complete!");
    }
}`,
        output: `🚀 Java Quantum Processor
⚛️ Qubits: 24
🧠 Processing data...
✅ Processing complete!
🎉 Demo complete!

[JVM INFO]
Java Version: 17.0.2
Heap Memory: 64MB
Execution: 47ms
GC Collections: 2`
    },
    csharp: {
        label: 'C#',
        code: `using System;
using System.Threading.Tasks;

namespace QuantumComputing
{
    public class QuantumProcessor
    {
        private int qubits;
        private double coherence;
        
        public QuantumProcessor(int qubits = 32)
        {
            this.qubits = qubits;
            this.coherence = 0.95;
            Console.WriteLine("🚀 C# Quantum Processor");
            Console.WriteLine($"⚛️ Qubits: {qubits}");
        }
        
        public async Task<double[]> ProcessDataAsync(double[] data)
        {
            Console.WriteLine("🧠 Processing with async/await...");
            await Task.Delay(300);
            
            var result = new double[data.Length];
            for(int i = 0; i < data.Length; i++)
            {
                result[i] = Math.Sin(data[i]) * coherence;
            }
            
            Console.WriteLine("✅ Complete!");
            return result;
        }
        
        static async Task Main(string[] args)
        {
            var processor = new QuantumProcessor(20);
            var data = new double[] { 1.2, 3.4, 5.6 };
            var result = await processor.ProcessDataAsync(data);
            Console.WriteLine("🎉 C# demo complete!");
        }
    }
}`,
        output: `🚀 C# Quantum Processor
⚛️ Qubits: 20
🧠 Processing with async/await...
✅ Complete!
🎉 C# demo complete!

[.NET RUNTIME]
Framework: .NET 6.0
Memory: 5.2MB
Execution: 347ms
Thread Pool: 8 threads`
    },
    typescript: {
        label: 'TypeScript',
        code: `interface QuantumState {
  qubits: number;
  coherence: number;
}

class QuantumProcessor {
  private qubits: number;
  private coherence: number;
  
  constructor(qubits: number = 32) {
    this.qubits = qubits;
    this.coherence = 0.95;
    console.log('🚀 TypeScript Quantum Processor');
    console.log(\`⚛️ Qubits: \${qubits}\`);
  }
  
  async processData(data: number[]): Promise<number[]> {
    console.log('🧠 Processing with TypeScript...');
    
    const result = data.map(value => 
      Math.sin(value) * this.coherence
    );
    
    console.log('✅ Processing complete!');
    return result;
  }
  
  getState(): QuantumState {
    return {
      qubits: this.qubits,
      coherence: this.coherence
    };
  }
}

// Demo execution
(async () => {
  const processor = new QuantumProcessor(16);
  const data = [1.5, 2.8, 4.1];
  const result = await processor.processData(data);
  console.log('🎉 TypeScript demo complete!');
})();`,
        output: `🚀 TypeScript Quantum Processor
⚛️ Qubits: 16
🧠 Processing with TypeScript...
✅ Processing complete!
🎉 TypeScript demo complete!

[TYPESCRIPT COMPILER]
Version: 4.9.5
Compilation: 0.34s
Type Checking: Passed
Bundle Size: 15.2KB`
    },
    go: {
        label: 'Go',
        code: `package main

import (
    "fmt"
    "math"
    "sync"
)

type QuantumProcessor struct {
    qubits    int
    coherence float64
    mu        sync.RWMutex
}

func NewQuantumProcessor(qubits int) *QuantumProcessor {
    fmt.Printf("🚀 Go Quantum Processor\\n")
    fmt.Printf("⚛️ Qubits: %d\\n", qubits)
    
    return &QuantumProcessor{
        qubits:    qubits,
        coherence: 0.95,
    }
}

func (qp *QuantumProcessor) ProcessData(data []float64) []float64 {
    qp.mu.Lock()
    defer qp.mu.Unlock()
    
    fmt.Println("🧠 Processing with Go goroutines...")
    
    result := make([]float64, len(data))
    for i, value := range data {
        result[i] = math.Sin(value) * qp.coherence
    }
    
    fmt.Println("✅ Processing complete!")
    return result
}

func main() {
    processor := NewQuantumProcessor(20)
    data := []float64{1.2, 3.4, 5.6, 7.8}
    
    result := processor.ProcessData(data)
    _ = result
    
    fmt.Println("🎉 Go demo complete!")
}`,
        output: `🚀 Go Quantum Processor
⚛️ Qubits: 20
🧠 Processing with Go goroutines...
✅ Processing complete!
🎉 Go demo complete!

[GO RUNTIME]
Version: go1.20.3
Goroutines: 4 active
Memory: 3.2MB
Compilation: 0.89s`
    },
    rust: {
        label: 'Rust',
        code: `use std::f64::consts::PI;

pub struct QuantumProcessor {
    qubits: usize,
    coherence: f64,
}

impl QuantumProcessor {
    pub fn new(qubits: usize) -> Self {
        println!("🚀 Rust Quantum Processor");
        println!("⚛️ Qubits: {}", qubits);
        
        QuantumProcessor {
            qubits,
            coherence: 0.95,
        }
    }
    
    pub fn process_data(&self, data: Vec<f64>) -> Vec<f64> {
        println!("🧠 Processing with Rust...");
        
        let result: Vec<f64> = data
            .iter()
            .map(|&value| value.sin() * self.coherence)
            .collect();
        
        println!("✅ Processing complete!");
        result
    }
}

fn main() {
    let processor = QuantumProcessor::new(24);
    let data = vec![1.5, 2.8, 4.1, 5.7];
    
    let _result = processor.process_data(data);
    
    println!("🎉 Rust demo complete! 🦀");
}`,
        output: `🚀 Rust Quantum Processor
⚛️ Qubits: 24
🧠 Processing with Rust...
✅ Processing complete!
🎉 Rust demo complete! 🦀

[RUST TOOLCHAIN]
Version: rustc 1.70.0
Optimization: --release
Memory Safety: Guaranteed
Compilation: 3.2s`
    },
    php: {
        label: 'PHP',
        code: `<?php

class QuantumProcessor {
    private int $qubits;
    private float $coherence;
    
    public function __construct(int $qubits = 32) {
        $this->qubits = $qubits;
        $this->coherence = 0.95;
        
        echo "🚀 PHP Quantum Processor\\n";
        echo "⚛️ Qubits: {$qubits}\\n";
    }
    
    public function processData(array $data): array {
        echo "🧠 Processing with PHP...\\n";
        
        $result = [];
        foreach ($data as $value) {
            $result[] = sin($value) * $this->coherence;
        }
        
        echo "✅ Processing complete!\\n";
        return $result;
    }
    
    public function getState(): array {
        return [
            'qubits' => $this->qubits,
            'coherence' => $this->coherence
        ];
    }
}

// Demo execution
$processor = new QuantumProcessor(18);
$data = [1.2, 3.4, 5.6];
$result = $processor->processData($data);

echo "📊 Results: " . json_encode($result) . "\\n";
echo "🎉 PHP demo complete!\\n";

?>`,
        output: `🚀 PHP Quantum Processor
⚛️ Qubits: 18
🧠 Processing with PHP...
✅ Processing complete!
📊 Results: [0.932,0.058,-0.631]
🎉 PHP demo complete!

[PHP RUNTIME]
Version: PHP 8.2.0
Memory Usage: 2MB
Execution: 0.023s
OPcache: Enabled`
    },
    swift: {
        label: 'Swift',
        code: `import Foundation

struct QuantumProcessor {
    let qubits: Int
    let coherence: Double
    
    init(qubits: Int = 32) {
        self.qubits = qubits
        self.coherence = 0.95
        
        print("🚀 Swift Quantum Processor")
        print("⚛️ Qubits: \\(qubits)")
    }
    
    func processData(_ data: [Double]) async -> [Double] {
        print("🧠 Processing with Swift async...")
        
        // Simulate async processing
        try? await Task.sleep(nanoseconds: 300_000_000)
        
        let result = data.map { value in
            sin(value) * coherence
        }
        
        print("✅ Processing complete!")
        return result
    }
}

// Demo execution
Task {
    let processor = QuantumProcessor(qubits: 16)
    let data = [1.5, 2.8, 4.1]
    
    let result = await processor.processData(data)
    print("📊 Results: \\(result)")
    print("🎉 Swift demo complete!")
}`,
        output: `🚀 Swift Quantum Processor
⚛️ Qubits: 16
🧠 Processing with Swift async...
✅ Processing complete!
📊 Results: [0.9974, 0.3342, -0.8462]
🎉 Swift demo complete!

[SWIFT COMPILER]
Version: Swift 5.8
Optimization: -O
ARC: Enabled
Execution: 0.31s`
    },
    kotlin: {
        label: 'Kotlin',
        code: `import kotlinx.coroutines.*
import kotlin.math.sin

class QuantumProcessor(private val qubits: Int = 32) {
    private val coherence = 0.95
    
    init {
        println("🚀 Kotlin Quantum Processor")
        println("⚛️ Qubits: $qubits")
    }
    
    suspend fun processData(data: List<Double>): List<Double> {
        println("🧠 Processing with Kotlin coroutines...")
        
        // Simulate processing
        delay(300)
        
        val result = data.map { value ->
            sin(value) * coherence
        }
        
        println("✅ Processing complete!")
        return result
    }
    
    fun getState() = mapOf(
        "qubits" to qubits,
        "coherence" to coherence
    )
}

fun main() = runBlocking {
    val processor = QuantumProcessor(20)
    val data = listOf(1.5, 2.8, 4.1, 5.7)
    
    val result = processor.processData(data)
    println("📊 Results: $result")
    println("🎉 Kotlin demo complete!")
}`,
        output: `🚀 Kotlin Quantum Processor
⚛️ Qubits: 20
🧠 Processing with Kotlin coroutines...
✅ Processing complete!
📊 Results: [0.9974, 0.3342, -0.8462, -0.5507]
🎉 Kotlin demo complete!

[KOTLIN COMPILER]
Version: 1.8.20
JVM Target: 17
Coroutines: Active
Compilation: 2.1s`
    },
    dart: {
        label: 'Dart',
        code: `import 'dart:math';

class QuantumProcessor {
  final int qubits;
  final double coherence;
  
  QuantumProcessor({this.qubits = 32}) : coherence = 0.95 {
    print('🚀 Dart Quantum Processor');
    print('⚛️ Qubits: $qubits');
  }
  
  Future<List<double>> processData(List<double> data) async {
    print('🧠 Processing with Dart async...');
    
    await Future.delayed(Duration(milliseconds: 300));
    
    final result = data.map((value) => sin(value) * coherence).toList();
    
    print('✅ Processing complete!');
    return result;
  }
  
  Map<String, dynamic> getState() => {
    'qubits': qubits,
    'coherence': coherence,
  };
}

void main() async {
  final processor = QuantumProcessor(qubits: 18);
  final data = [1.5, 2.8, 4.1];
  
  final result = await processor.processData(data);
  print('📊 Results: $result');
  print('🎉 Dart demo complete!');
}`,
        output: `🚀 Dart Quantum Processor
⚛️ Qubits: 18
🧠 Processing with Dart async...
✅ Processing complete!
📊 Results: [0.9974, 0.3342, -0.8462]
🎉 Dart demo complete!

[DART VM]
Version: 3.0.0
Mode: JIT compilation
Memory: 4.1MB
Execution: 0.31s`
    },
    ruby: {
        label: 'Ruby',
        code: `class QuantumProcessor
  attr_reader :qubits, :coherence
  
  def initialize(qubits: 32)
    @qubits = qubits
    @coherence = 0.95
    
    puts "🚀 Ruby Quantum Processor"
    puts "⚛️ Qubits: #{qubits}"
  end
  
  def process_data(data)
    puts "🧠 Processing with Ruby..."
    
    result = data.map do |value|
      Math.sin(value) * @coherence
    end
    
    puts "✅ Processing complete!"
    result
  end
  
  def state
    {
      qubits: @qubits,
      coherence: @coherence
    }
  end
end

# Demo execution
processor = QuantumProcessor.new(qubits: 22)
data = [1.5, 2.8, 4.1, 5.7]

result = processor.process_data(data)
puts "📊 Results: #{result}"
puts "🎉 Ruby demo complete!"`,
        output: `🚀 Ruby Quantum Processor
⚛️ Qubits: 22
🧠 Processing with Ruby...
✅ Processing complete!
📊 Results: [0.9974, 0.3342, -0.8462, -0.5507]
🎉 Ruby demo complete!

[RUBY RUNTIME]
Version: Ruby 3.2.0
Memory: 8.7MB
Execution: 0.045s
GC Collections: 1`
    },
    scala: {
        label: 'Scala',
        code: `import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import scala.math.sin

class QuantumProcessor(val qubits: Int = 32) {
  val coherence: Double = 0.95
  
  println(s"🚀 Scala Quantum Processor")
  println(s"⚛️ Qubits: $qubits")
  
  def processData(data: List[Double]): Future[List[Double]] = {
    println("🧠 Processing with Scala Futures...")
    
    Future {
      Thread.sleep(300) // Simulate processing
      
      val result = data.map(value => sin(value) * coherence)
      
      println("✅ Processing complete!")
      result
    }
  }
  
  def getState: Map[String, Any] = Map(
    "qubits" -> qubits,
    "coherence" -> coherence
  )
}

object QuantumDemo extends App {
  val processor = new QuantumProcessor(24)
  val data = List(1.5, 2.8, 4.1)
  
  processor.processData(data).foreach { result =>
    println(s"📊 Results: $result")
    println("🎉 Scala demo complete!")
  }
}`,
        output: `🚀 Scala Quantum Processor
⚛️ Qubits: 24
🧠 Processing with Scala Futures...
✅ Processing complete!
📊 Results: List(0.9974, 0.3342, -0.8462)
🎉 Scala demo complete!

[SCALA COMPILER]
Version: 2.13.10
JVM Target: 11
Compilation: 3.4s
Execution: 0.32s`
    },
    c: {
        label: 'C',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

typedef struct {
    int qubits;
    double coherence;
} QuantumProcessor;

QuantumProcessor* create_processor(int qubits) {
    QuantumProcessor* processor = malloc(sizeof(QuantumProcessor));
    processor->qubits = qubits;
    processor->coherence = 0.95;
    
    printf("🚀 C Quantum Processor\\n");
    printf("⚛️ Qubits: %d\\n", qubits);
    
    return processor;
}

void process_data(QuantumProcessor* processor, double* data, double* result, int size) {
    printf("🧠 Processing with C...\\n");
    
    for (int i = 0; i < size; i++) {
        result[i] = sin(data[i]) * processor->coherence;
    }
    
    printf("✅ Processing complete!\\n");
}

int main() {
    QuantumProcessor* processor = create_processor(16);
    
    double data[] = {1.5, 2.8, 4.1};
    double result[3];
    int size = 3;
    
    process_data(processor, data, result, size);
    
    printf("📊 Results: [");
    for (int i = 0; i < size; i++) {
        printf("%.4f", result[i]);
        if (i < size - 1) printf(", ");
    }
    printf("]\\n");
    
    printf("🎉 C demo complete!\\n");
    
    free(processor);
    return 0;
}`,
        output: `🚀 C Quantum Processor
⚛️ Qubits: 16
🧠 Processing with C...
✅ Processing complete!
📊 Results: [0.9974, 0.3342, -0.8462]
🎉 C demo complete!

[C COMPILER]
Version: gcc 11.3.0
Optimization: -O2
Memory: 1.2MB
Execution: 0.001s`
    }
};

// Judge0 API Functions (RapidAPI format)
const submitCode = async (sourceCode, languageId, stdin = '') => {
    try {
        console.log('🔗 Submitting to Judge0 via RapidAPI...', {
            languageId,
            codeLength: sourceCode.length,
            endpoint: `${JUDGE0_CONFIG.BASE_URL}/submissions?base64_encoded=true&wait=false`
        });

        const requestData = {
            source_code: btoa(sourceCode),
            language_id: languageId,
            stdin: btoa(stdin || ""),
            cpu_time_limit: "2"
        };

        const headers = {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': JUDGE0_CONFIG.API_KEY,
            'X-RapidAPI-Host': JUDGE0_CONFIG.API_HOST
        };

        console.log('📤 Request headers:', headers);
        console.log('📤 Request data:', requestData);

        const response = await axios.post(
            `${JUDGE0_CONFIG.BASE_URL}/submissions?base64_encoded=true&wait=false`,
            requestData,
            { headers }
        );

        console.log('✅ Submission successful:', response.data);
        return response.data.token;
    } catch (error) {
        console.error('❌ Submission error:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers
        });
        throw error;
    }
};

const getSubmissionResult = async (token) => {
    try {
        const endpoint = `${JUDGE0_CONFIG.BASE_URL}/submissions/${token}?base64_encoded=true`;
        console.log('📥 Fetching result from:', endpoint);

        const headers = {
            'X-RapidAPI-Key': JUDGE0_CONFIG.API_KEY,
            'X-RapidAPI-Host': JUDGE0_CONFIG.API_HOST
        };

        const response = await axios.get(endpoint, { headers });
        console.log('📄 Result received:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Result fetch error:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        });
        throw error;
    }
};

// OpenAI API Function
const callOpenAI = async (prompt) => {
    try {
        console.log('🤖 Calling OpenAI API...');

        const response = await axios.post(
            OPENAI_CONFIG.BASE_URL,
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful programming assistant. Generate code suggestions, explanations, and optimizations. Keep responses concise and practical."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_CONFIG.API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ OpenAI response received');
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('❌ OpenAI API error:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        });
        throw error;
    }
};

// AI Assistant Component with Mind-Blowing Interface
const AIAssistant = ({ isVisible, onClose, onSuggestion }) => {
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiThinking, setAiThinking] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const generateAISuggestion = async () => {
        if (!aiPrompt.trim()) {
            alert('Please enter a prompt for the AI assistant');
            return;
        }

        setAiThinking(true);
        setSuggestions([]);

        try {
            console.log('🤖 Generating AI suggestion with prompt:', aiPrompt);
            const aiResponse = await callOpenAI(aiPrompt);

            // Parse the AI response to extract code and description
            const suggestion = {
                title: "🤖 AI Generated Code",
                code: aiResponse,
                description: "AI-generated code based on your prompt"
            };

            setSuggestions([suggestion]);
        } catch (error) {
            console.error('❌ AI suggestion failed:', error);

            // Fallback to mock suggestion if OpenAI fails
            const fallbackSuggestion = {
                title: "⚠️ AI Service Unavailable - Mock Response",
                code: `// AI service is currently unavailable
// This is a fallback example for your prompt: "${aiPrompt}"

console.log("AI assistant is temporarily offline");
console.log("Please try again later or check your API configuration");

// Example code structure:
function exampleFunction() {
    // Your code implementation would go here
    return "AI-generated code will appear here when service is available";
}`,
                description: "Mock response - AI service unavailable"
            };

            setSuggestions([fallbackSuggestion]);
        } finally {
            setAiThinking(false);
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                background: 'linear-gradient(135deg, rgba(103, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                padding: '30px',
                width: '80%',
                maxWidth: '800px',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 25px 50px rgba(103, 126, 234, 0.3)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{
                    color: 'white',
                    margin: 0,
                    fontSize: '24px',
                    background: 'linear-gradient(135deg, #fff, #f093fb)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    🤖 Quantum AI Assistant
                </h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer'
                    }}
                >
                    ×
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ask the AI to generate code, optimize algorithms, or suggest improvements..."
                    style={{
                        width: '100%',
                        height: '80px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '10px',
                        padding: '15px',
                        color: 'white',
                        fontSize: '14px',
                        resize: 'none'
                    }}
                />
                <button
                    onClick={generateAISuggestion}
                    disabled={aiThinking}
                    style={{
                        marginTop: '10px',
                        background: aiThinking ? 'rgba(100, 100, 100, 0.5)' : 'linear-gradient(135deg, #f093fb, #667eea)',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '12px 24px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: aiThinking ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {aiThinking ? '🧠 AI Thinking...' : '✨ Generate AI Suggestion'}
                </button>
            </div>

            {suggestions.map((suggestion, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '15px',
                        padding: '20px',
                        marginBottom: '15px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                >
                    <h3 style={{ color: '#f093fb', margin: '0 0 10px 0', fontSize: '18px' }}>
                        {suggestion.title}
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 15px 0', fontSize: '14px' }}>
                        {suggestion.description}
                    </p>
                    <pre style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '8px',
                        padding: '15px',
                        color: '#00ff88',
                        fontSize: '12px',
                        overflow: 'auto',
                        maxHeight: '200px'
                    }}>
                        {suggestion.code}
                    </pre>
                    <button
                        onClick={() => onSuggestion(suggestion.code)}
                        style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: 'white',
                            fontSize: '12px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        💫 Apply to Editor
                    </button>
                </motion.div>
            ))}
        </motion.div>
    );
};

// Drawing Canvas Component
const DrawingCanvas = ({ isVisible, onClose }) => {
    const canvasRef = useRef();
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushColor, setBrushColor] = useState('#667eea');
    const [brushSize, setBrushSize] = useState(5);

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                background: 'linear-gradient(135deg, rgba(103, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                padding: '20px',
                width: '90%',
                maxWidth: '900px',
                boxShadow: '0 25px 50px rgba(103, 126, 234, 0.3)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>🎨 Quantum Drawing Canvas</h2>
                <button onClick={onClose} style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer'
                }}>×</button>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', alignItems: 'center' }}>
                <input
                    type="color"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    style={{ width: '50px', height: '40px', border: 'none', borderRadius: '8px' }}
                />
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(e.target.value)}
                    style={{ width: '150px' }}
                />
                <span style={{ color: 'white', fontSize: '14px' }}>Size: {brushSize}px</span>
                <button
                    onClick={clearCanvas}
                    style={{
                        background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    🗑️ Clear
                </button>
            </div>

            <canvas
                ref={canvasRef}
                width={800}
                height={500}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{
                    background: 'white',
                    borderRadius: '10px',
                    cursor: 'crosshair',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
            />
        </motion.div>
    );
};

// Enhanced Editor Modes
const EDITOR_MODES = {
    code: { label: 'Code Editor', icon: '' },
    draw: { label: 'Drawing Canvas', icon: '' },
    text: { label: 'Plain Text', icon: '' },
    ai: { label: 'AI Assistant', icon: '' }
};

// Enhanced Stopwatch Component with Controls
const Stopwatch = ({ isRunning = false }) => {
    const [elapsed, setElapsed] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [startTime, setStartTime] = useState(Date.now());
    const [pausedTime, setPausedTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setElapsed(Date.now() - startTime + pausedTime);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, startTime, pausedTime]);

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            // Pause: save current elapsed time
            setPausedTime(elapsed);
            setIsPlaying(false);
        } else {
            // Play: restart with saved time
            setStartTime(Date.now());
            setIsPlaying(true);
        }
    };

    const handleReset = () => {
        setElapsed(0);
        setPausedTime(0);
        setStartTime(Date.now());
        setIsPlaying(true);
    };

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                color: 'rgba(0, 0, 0, 0.8)',
                fontWeight: '600'
            }}>
                ⏱️ {formatTime(elapsed)}
            </span>

            <div style={{ display: 'flex', gap: '4px' }}>
                <button
                    onClick={handlePlayPause}
                    style={{
                        background: 'rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '10px',
                        cursor: 'pointer',
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                    }}
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>

                <button
                    onClick={handleReset}
                    style={{
                        background: 'rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '10px',
                        cursor: 'pointer',
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                    }}
                >
                    🔄
                </button>
            </div>
        </div>
    );
};

export default function App() {
    const [code, setCode] = useState(CODE_EXAMPLES.javascript.code);
    const [output, setOutput] = useState('Welcome to CodePad!\n\nSystem Status: ONLINE\nDevelopment Environment: Ready\nCode Execution: Active\nAll Systems: Operational\n\nSelect a language and press "Execute Code" to begin...\n\nReady for development.');
    const [lang, setLang] = useState('javascript');
    const [isExecuting, setIsExecuting] = useState(false);
    const [isModeChanging, setIsModeChanging] = useState(false);
    const [changingMode, setChangingMode] = useState(null);
    const [editorMode, setEditorMode] = useState('code');
    const [showAI, setShowAI] = useState(false);
    const [showDrawing, setShowDrawing] = useState(false);

    const [autocompleteVisible, setAutocompleteVisible] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [currentTheme, setCurrentTheme] = useState('emerald');
    const [selectedFont, setSelectedFont] = useState('jetbrains-mono');

    // Ultimate Color Themes Collection - 30+ Stunning Themes
    const COLOR_THEMES = {
        // Original Nostalgic Themes
        emerald: {
            name: "🌿 Emerald Garden",
            primary: "rgba(20, 120, 80, 0.3)",
            secondary: "rgba(40, 160, 100, 0.25)",
            accent: "rgba(60, 200, 120, 0.3)",
            highlight: "rgba(180, 240, 200, 0.4)",
            border: "rgba(180, 240, 200, 0.3)",
            glow: "rgba(30, 140, 90, 0.2)",
            description: "Peaceful forest memories"
        },
        sunset: {
            name: "🌅 Golden Sunset",
            primary: "rgba(255, 140, 70, 0.3)",
            secondary: "rgba(255, 180, 100, 0.25)",
            accent: "rgba(255, 200, 120, 0.3)",
            highlight: "rgba(255, 230, 180, 0.4)",
            border: "rgba(255, 220, 170, 0.3)",
            glow: "rgba(255, 160, 80, 0.2)",
            description: "Warm summer evenings"
        },
        ocean: {
            name: "🌊 Deep Ocean",
            primary: "rgba(30, 100, 150, 0.3)",
            secondary: "rgba(50, 130, 180, 0.25)",
            accent: "rgba(70, 160, 210, 0.3)",
            highlight: "rgba(150, 200, 240, 0.4)",
            border: "rgba(140, 190, 230, 0.3)",
            glow: "rgba(40, 120, 170, 0.2)",
            description: "Calming ocean depths"
        },
        lavender: {
            name: "💜 Lavender Dreams",
            primary: "rgba(120, 80, 160, 0.3)",
            secondary: "rgba(140, 100, 180, 0.25)",
            accent: "rgba(160, 120, 200, 0.3)",
            highlight: "rgba(200, 180, 240, 0.4)",
            border: "rgba(190, 170, 230, 0.3)",
            glow: "rgba(130, 90, 170, 0.2)",
            description: "Dreamy childhood nights"
        },
        autumn: {
            name: "🍂 Autumn Memories",
            primary: "rgba(150, 80, 50, 0.3)",
            secondary: "rgba(180, 110, 70, 0.25)",
            accent: "rgba(200, 140, 90, 0.3)",
            highlight: "rgba(240, 200, 160, 0.4)",
            border: "rgba(230, 190, 150, 0.3)",
            glow: "rgba(170, 100, 60, 0.2)",
            description: "Nostalgic autumn walks"
        },
        moonlight: {
            name: "🌙 Moonlight Serenade",
            primary: "rgba(80, 100, 140, 0.3)",
            secondary: "rgba(100, 120, 160, 0.25)",
            accent: "rgba(120, 140, 180, 0.3)",
            highlight: "rgba(180, 200, 240, 0.4)",
            border: "rgba(170, 190, 230, 0.3)",
            glow: "rgba(90, 110, 150, 0.2)",
            description: "Peaceful midnight moments"
        },

        // 🌈 NEON COLLECTION - Electric & Vibrant
        neonCyan: {
            name: "⚡ Neon Cyan",
            primary: "rgba(0, 255, 255, 0.4)",
            secondary: "rgba(0, 200, 255, 0.35)",
            accent: "rgba(0, 150, 255, 0.4)",
            highlight: "rgba(100, 255, 255, 0.5)",
            border: "rgba(0, 255, 255, 0.6)",
            glow: "rgba(0, 255, 255, 0.3)",
            description: "Electric cyberpunk vibes"
        },
        neonPink: {
            name: "💖 Neon Pink",
            primary: "rgba(255, 0, 150, 0.4)",
            secondary: "rgba(255, 50, 200, 0.35)",
            accent: "rgba(255, 100, 255, 0.4)",
            highlight: "rgba(255, 150, 255, 0.5)",
            border: "rgba(255, 0, 150, 0.6)",
            glow: "rgba(255, 0, 150, 0.3)",
            description: "Hot pink energy"
        },
        neonGreen: {
            name: "🔋 Neon Green",
            primary: "rgba(0, 255, 0, 0.4)",
            secondary: "rgba(50, 255, 100, 0.35)",
            accent: "rgba(100, 255, 150, 0.4)",
            highlight: "rgba(150, 255, 200, 0.5)",
            border: "rgba(0, 255, 0, 0.6)",
            glow: "rgba(0, 255, 0, 0.3)",
            description: "Matrix green glow"
        },
        neonOrange: {
            name: "🔥 Neon Orange",
            primary: "rgba(255, 100, 0, 0.4)",
            secondary: "rgba(255, 150, 50, 0.35)",
            accent: "rgba(255, 200, 100, 0.4)",
            highlight: "rgba(255, 220, 150, 0.5)",
            border: "rgba(255, 100, 0, 0.6)",
            glow: "rgba(255, 100, 0, 0.3)",
            description: "Fiery neon burst"
        },
        neonPurple: {
            name: "🌟 Neon Purple",
            primary: "rgba(150, 0, 255, 0.4)",
            secondary: "rgba(180, 50, 255, 0.35)",
            accent: "rgba(200, 100, 255, 0.4)",
            highlight: "rgba(220, 150, 255, 0.5)",
            border: "rgba(150, 0, 255, 0.6)",
            glow: "rgba(150, 0, 255, 0.3)",
            description: "Electric violet dreams"
        },
        neonYellow: {
            name: "⚡ Neon Yellow",
            primary: "rgba(255, 255, 0, 0.4)",
            secondary: "rgba(255, 255, 100, 0.35)",
            accent: "rgba(255, 255, 150, 0.4)",
            highlight: "rgba(255, 255, 200, 0.5)",
            border: "rgba(255, 255, 0, 0.6)",
            glow: "rgba(255, 255, 0, 0.3)",
            description: "Lightning bright energy"
        },

        // 🌃 CYBERPUNK COLLECTION
        cyberpunk: {
            name: "🤖 Cyberpunk",
            primary: "rgba(0, 255, 255, 0.3)",
            secondary: "rgba(255, 0, 150, 0.25)",
            accent: "rgba(150, 0, 255, 0.3)",
            highlight: "rgba(100, 255, 255, 0.4)",
            border: "rgba(0, 255, 255, 0.4)",
            glow: "rgba(255, 0, 150, 0.2)",
            description: "Future noir aesthetic"
        },
        synthwave: {
            name: "🌆 Synthwave",
            primary: "rgba(255, 0, 150, 0.3)",
            secondary: "rgba(150, 0, 255, 0.25)",
            accent: "rgba(0, 255, 255, 0.3)",
            highlight: "rgba(255, 100, 200, 0.4)",
            border: "rgba(255, 0, 150, 0.4)",
            glow: "rgba(150, 0, 255, 0.2)",
            description: "80s retro wave"
        },
        matrix: {
            name: "💊 Matrix",
            primary: "rgba(0, 255, 65, 0.3)",
            secondary: "rgba(0, 200, 50, 0.25)",
            accent: "rgba(0, 150, 35, 0.3)",
            highlight: "rgba(100, 255, 150, 0.4)",
            border: "rgba(0, 255, 65, 0.4)",
            glow: "rgba(0, 255, 65, 0.2)",
            description: "Digital rain code"
        },

        // 🌌 DARK THEMES
        darkVoid: {
            name: "🕳️ Dark Void",
            primary: "rgba(30, 30, 35, 0.8)",
            secondary: "rgba(45, 45, 50, 0.7)",
            accent: "rgba(60, 60, 70, 0.8)",
            highlight: "rgba(100, 100, 120, 0.6)",
            border: "rgba(80, 80, 90, 0.5)",
            glow: "rgba(120, 120, 140, 0.3)",
            description: "Deep space darkness"
        },
        midnight: {
            name: "🌃 Midnight Blue",
            primary: "rgba(20, 30, 60, 0.8)",
            secondary: "rgba(30, 45, 80, 0.7)",
            accent: "rgba(40, 60, 100, 0.8)",
            highlight: "rgba(80, 120, 180, 0.6)",
            border: "rgba(60, 90, 140, 0.5)",
            glow: "rgba(100, 150, 220, 0.3)",
            description: "City lights at night"
        },
        obsidian: {
            name: "🔮 Obsidian",
            primary: "rgba(25, 25, 25, 0.8)",
            secondary: "rgba(40, 40, 45, 0.7)",
            accent: "rgba(55, 55, 65, 0.8)",
            highlight: "rgba(100, 100, 120, 0.6)",
            border: "rgba(80, 80, 100, 0.5)",
            glow: "rgba(120, 120, 150, 0.3)",
            description: "Volcanic glass"
        },

        // 🌈 VIBRANT THEMES
        rainbow: {
            name: "🌈 Rainbow",
            primary: "rgba(255, 100, 150, 0.3)",
            secondary: "rgba(100, 255, 150, 0.25)",
            accent: "rgba(150, 100, 255, 0.3)",
            highlight: "rgba(255, 200, 100, 0.4)",
            border: "rgba(200, 150, 255, 0.4)",
            glow: "rgba(255, 150, 200, 0.2)",
            description: "Colorful spectrum"
        },
        tropical: {
            name: "🏝️ Tropical",
            primary: "rgba(0, 200, 150, 0.3)",
            secondary: "rgba(255, 180, 0, 0.25)",
            accent: "rgba(255, 100, 150, 0.3)",
            highlight: "rgba(100, 255, 200, 0.4)",
            border: "rgba(0, 200, 150, 0.4)",
            glow: "rgba(255, 180, 0, 0.2)",
            description: "Paradise vibes"
        },
        coral: {
            name: "🪸 Coral Reef",
            primary: "rgba(255, 127, 80, 0.3)",
            secondary: "rgba(255, 160, 122, 0.25)",
            accent: "rgba(255, 182, 193, 0.3)",
            highlight: "rgba(255, 218, 185, 0.4)",
            border: "rgba(255, 127, 80, 0.4)",
            glow: "rgba(255, 160, 122, 0.2)",
            description: "Underwater coral"
        },

        // ❄️ COOL THEMES
        arctic: {
            name: "🧊 Arctic",
            primary: "rgba(176, 224, 230, 0.3)",
            secondary: "rgba(173, 216, 230, 0.25)",
            accent: "rgba(135, 206, 235, 0.3)",
            highlight: "rgba(240, 248, 255, 0.4)",
            border: "rgba(176, 224, 230, 0.4)",
            glow: "rgba(173, 216, 230, 0.2)",
            description: "Frozen tundra"
        },
        glacier: {
            name: "🏔️ Glacier",
            primary: "rgba(175, 238, 238, 0.3)",
            secondary: "rgba(224, 255, 255, 0.25)",
            accent: "rgba(176, 196, 222, 0.3)",
            highlight: "rgba(230, 230, 250, 0.4)",
            border: "rgba(175, 238, 238, 0.4)",
            glow: "rgba(224, 255, 255, 0.2)",
            description: "Ancient ice"
        },

        // 🔥 WARM THEMES
        volcano: {
            name: "🌋 Volcano",
            primary: "rgba(255, 69, 0, 0.3)",
            secondary: "rgba(255, 140, 0, 0.25)",
            accent: "rgba(255, 165, 0, 0.3)",
            highlight: "rgba(255, 215, 0, 0.4)",
            border: "rgba(255, 69, 0, 0.4)",
            glow: "rgba(255, 140, 0, 0.2)",
            description: "Molten lava"
        },
        desert: {
            name: "🏜️ Desert",
            primary: "rgba(255, 218, 185, 0.3)",
            secondary: "rgba(255, 222, 173, 0.25)",
            accent: "rgba(255, 228, 181, 0.3)",
            highlight: "rgba(255, 235, 205, 0.4)",
            border: "rgba(255, 218, 185, 0.4)",
            glow: "rgba(255, 222, 173, 0.2)",
            description: "Sand dunes"
        },

        // 🌸 NATURE THEMES
        sakura: {
            name: "🌸 Sakura",
            primary: "rgba(255, 182, 193, 0.3)",
            secondary: "rgba(255, 192, 203, 0.25)",
            accent: "rgba(255, 218, 185, 0.3)",
            highlight: "rgba(255, 228, 225, 0.4)",
            border: "rgba(255, 182, 193, 0.4)",
            glow: "rgba(255, 192, 203, 0.2)",
            description: "Cherry blossoms"
        },
        forest: {
            name: "🌲 Forest",
            primary: "rgba(34, 139, 34, 0.3)",
            secondary: "rgba(50, 205, 50, 0.25)",
            accent: "rgba(124, 252, 0, 0.3)",
            highlight: "rgba(144, 238, 144, 0.4)",
            border: "rgba(34, 139, 34, 0.4)",
            glow: "rgba(50, 205, 50, 0.2)",
            description: "Deep woods"
        },

        // 💎 LUXURY THEMES
        gold: {
            name: "👑 Gold",
            primary: "rgba(255, 215, 0, 0.3)",
            secondary: "rgba(255, 223, 0, 0.25)",
            accent: "rgba(255, 235, 59, 0.3)",
            highlight: "rgba(255, 245, 157, 0.4)",
            border: "rgba(255, 215, 0, 0.4)",
            glow: "rgba(255, 223, 0, 0.2)",
            description: "Royal luxury"
        },
        silver: {
            name: "🥈 Silver",
            primary: "rgba(192, 192, 192, 0.3)",
            secondary: "rgba(211, 211, 211, 0.25)",
            accent: "rgba(220, 220, 220, 0.3)",
            highlight: "rgba(245, 245, 245, 0.4)",
            border: "rgba(192, 192, 192, 0.4)",
            glow: "rgba(211, 211, 211, 0.2)",
            description: "Metallic elegance"
        },
        diamond: {
            name: "💎 Diamond",
            primary: "rgba(185, 242, 255, 0.3)",
            secondary: "rgba(224, 255, 255, 0.25)",
            accent: "rgba(240, 248, 255, 0.3)",
            highlight: "rgba(248, 248, 255, 0.4)",
            border: "rgba(185, 242, 255, 0.4)",
            glow: "rgba(224, 255, 255, 0.2)",
            description: "Crystal brilliance"
        },

        // 🎨 ARTISTIC THEMES
        pastel: {
            name: "🎨 Pastel",
            primary: "rgba(255, 182, 193, 0.3)",
            secondary: "rgba(221, 160, 221, 0.25)",
            accent: "rgba(176, 224, 230, 0.3)",
            highlight: "rgba(255, 228, 225, 0.4)",
            border: "rgba(255, 182, 193, 0.4)",
            glow: "rgba(221, 160, 221, 0.2)",
            description: "Soft artist colors"
        },
        vintage: {
            name: "📷 Vintage",
            primary: "rgba(160, 82, 45, 0.3)",
            secondary: "rgba(210, 180, 140, 0.25)",
            accent: "rgba(222, 184, 135, 0.3)",
            highlight: "rgba(245, 222, 179, 0.4)",
            border: "rgba(160, 82, 45, 0.4)",
            glow: "rgba(210, 180, 140, 0.2)",
            description: "Old photo sepia"
        },

        // ⚫ MINIMALIST THEMES
        monochrome: {
            name: "⚫ Monochrome",
            primary: "rgba(64, 64, 64, 0.3)",
            secondary: "rgba(96, 96, 96, 0.25)",
            accent: "rgba(128, 128, 128, 0.3)",
            highlight: "rgba(192, 192, 192, 0.4)",
            border: "rgba(64, 64, 64, 0.4)",
            glow: "rgba(96, 96, 96, 0.2)",
            description: "Pure black & white"
        },
        minimal: {
            name: "⚪ Minimal",
            primary: "rgba(250, 250, 250, 0.3)",
            secondary: "rgba(245, 245, 245, 0.25)",
            accent: "rgba(240, 240, 240, 0.3)",
            highlight: "rgba(255, 255, 255, 0.4)",
            border: "rgba(230, 230, 230, 0.4)",
            glow: "rgba(200, 200, 200, 0.2)",
            description: "Clean simplicity"
        }
    };

    // Professional Font Options for Code Editor
    const FONT_OPTIONS = {
        'jetbrains-mono': {
            name: '🔧 JetBrains Mono',
            family: "'JetBrains Mono', monospace",
            description: 'Designed for developers'
        },
        'fira-code': {
            name: '🔍 Fira Code',
            family: "'Fira Code', monospace",
            description: 'Programming ligatures'
        },
        'source-code-pro': {
            name: '📝 Source Code Pro',
            family: "'Source Code Pro', monospace",
            description: 'Adobe\'s monospace font'
        },
        'monaco': {
            name: '💎 Monaco',
            family: "Monaco, 'Lucida Console', monospace",
            description: 'Classic Mac font'
        },
        'consolas': {
            name: '🖥️ Consolas',
            family: "Consolas, 'Courier New', monospace",
            description: 'Microsoft\'s coding font'
        },
        'cascadia-code': {
            name: '⚡ Cascadia Code',
            family: "'Cascadia Code', monospace",
            description: 'Modern Microsoft font'
        },
        'roboto-mono': {
            name: '🤖 Roboto Mono',
            family: "'Roboto Mono', monospace",
            description: 'Google\'s monospace'
        },
        'sf-mono': {
            name: '🍎 SF Mono',
            family: "'SF Mono', 'Menlo', monospace",
            description: 'Apple system font'
        },
        'victor-mono': {
            name: '✨ Victor Mono',
            family: "'Victor Mono', monospace",
            description: 'Semi-connected cursive'
        },
        'hack': {
            name: '⚡ Hack',
            family: "'Hack', monospace",
            description: 'Hand groomed typeface'
        }
    };

    // Enhanced Autocomplete Suggestions
    const AUTOCOMPLETE_SUGGESTIONS = {
        javascript: [
            { text: 'console.log(', description: 'Console output' },
            { text: 'function ', description: 'Function declaration' },
            { text: 'const ', description: 'Constant declaration' },
            { text: 'async ', description: 'Async function' },
            { text: 'await ', description: 'Await expression' },
            { text: 'class ', description: 'Class declaration' },
            { text: 'import ', description: 'Import statement' },
            { text: 'export ', description: 'Export statement' },
            { text: 'QuantumProcessor', description: 'Quantum processing class' },
            { text: 'NeuralNetwork', description: 'Neural network implementation' }
        ],
        python: [
            { text: 'print(', description: 'Print output' },
            { text: 'def ', description: 'Function definition' },
            { text: 'class ', description: 'Class definition' },
            { text: 'import ', description: 'Import module' },
            { text: 'from ', description: 'From import' },
            { text: 'async def ', description: 'Async function' },
            { text: 'await ', description: 'Await expression' },
            { text: 'np.', description: 'NumPy functions' },
            { text: 'tf.', description: 'TensorFlow functions' },
            { text: 'QuantumNeuralNetwork', description: 'Quantum ML class' }
        ]
    };

    const executeCode = async () => {
        setIsExecuting(true);
        setOutput('🚀 Initializing Judge0 code execution...\n');

        try {
            // Check if language is supported in your Judge0 Extra CE instance
            let languageId = JUDGE0_LANGUAGE_IDS[lang];
            if (!languageId || languageId === null) {
                setOutput(prev => prev + `❌ Language ${lang} not available in your Judge0 Extra CE instance\n`);
                setOutput(prev => prev + `✅ Available languages: Java, Python, C++, C#, C\n`);
                setOutput(prev => prev + `🔍 Try switching to one of the supported languages\n`);
                setIsExecuting(false);
                return;
            }

            setOutput(prev => prev + `📝 Language: ${CODE_EXAMPLES[lang].label} (ID: ${languageId})\n`);
            setOutput(prev => prev + '🔗 Submitting code to Judge0...\n');

            // Submit code to Judge0
            const token = await submitCode(code, languageId);
            setOutput(prev => prev + `✅ Code submitted! Token: ${token}\n`);
            setOutput(prev => prev + '⏳ Waiting for compilation and execution...\n');

            // Poll for results
            let attempts = 0;
            const maxAttempts = 30; // 30 seconds max wait

            while (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                attempts++;

                const result = await getSubmissionResult(token);
                setOutput(prev => prev + `📊 Checking status... (${attempts}/${maxAttempts})\n`);

                if (result.status && result.status.id <= 2) {
                    // Still in queue or processing
                    setOutput(prev => prev + `🔄 Status: ${result.status.description}\n`);
                    continue;
                }

                // Execution completed
                setOutput(prev => prev + `🎯 Status: ${result.status.description}\n`);
                setOutput(prev => prev + '='.repeat(50) + '\n');

                if (result.stdout) {
                    const stdout = atob(result.stdout).trim();
                    if (stdout) {
                        setOutput(prev => prev + '📤 OUTPUT:\n');
                        setOutput(prev => prev + stdout + '\n');
                    }
                }

                if (result.stderr) {
                    const stderr = atob(result.stderr).trim();
                    if (stderr) {
                        setOutput(prev => prev + '❌ ERRORS:\n');
                        setOutput(prev => prev + stderr + '\n');
                    }
                }

                if (result.compile_output) {
                    const compileOutput = atob(result.compile_output).trim();
                    if (compileOutput) {
                        setOutput(prev => prev + '🔧 COMPILATION:\n');
                        setOutput(prev => prev + compileOutput + '\n');
                    }
                }

                // Show execution stats
                setOutput(prev => prev + '\n📈 EXECUTION STATS:\n');
                setOutput(prev => prev + `⏱️  Time: ${result.time || 'N/A'}s\n`);
                setOutput(prev => prev + `💾 Memory: ${result.memory || 'N/A'} KB\n`);

                setOutput(prev => prev + '\n🎉 Judge0 execution complete!\n');
                break;
            }

            if (attempts >= maxAttempts) {
                setOutput(prev => prev + '⏰ Execution timeout - please try again\n');
            }

        } catch (error) {
            setOutput(prev => prev + `❌ Error: ${error.message}\n`);
            if (error.response) {
                setOutput(prev => prev + `📜 Status: ${error.response.status}\n`);
                setOutput(prev => prev + `📜 Status Text: ${error.response.statusText}\n`);
                setOutput(prev => prev + `📜 Response Data: ${JSON.stringify(error.response.data, null, 2)}\n`);
            }
        } finally {
            setIsExecuting(false);
        }
    };

    const handleAISuggestion = (suggestion) => {
        setCode(suggestion);
        setShowAI(false);
    };

    const handleModeChange = async (mode) => {
        setIsModeChanging(true);
        setChangingMode(mode);

        // Simulate loading time like executeCode
        await new Promise(resolve => setTimeout(resolve, 600));

        setEditorMode(mode);
        if (mode === 'ai') {
            setShowAI(true);
        } else if (mode === 'draw') {
            setShowDrawing(true);
        }

        setIsModeChanging(false);
        setChangingMode(null);
    };

    const handleCodeChange = (value) => {
        setCode(value || '');
        // Disable custom autocomplete box
        setAutocompleteVisible(false);
    };

    const insertAutocomplete = (suggestion) => {
        const words = code.split(/\s+/);
        words[words.length - 1] = suggestion.text;
        setCode(words.join(' '));
        setAutocompleteVisible(false);
    };

    // Apply theme colors dynamically
    React.useEffect(() => {
        const theme = COLOR_THEMES[currentTheme];
        const root = document.documentElement;

        root.style.setProperty('--theme-primary', theme.primary);
        root.style.setProperty('--theme-secondary', theme.secondary);
        root.style.setProperty('--theme-accent', theme.accent);
        root.style.setProperty('--theme-highlight', theme.highlight);
        root.style.setProperty('--theme-border', theme.border);
        root.style.setProperty('--theme-glow', theme.glow);
    }, [currentTheme, COLOR_THEMES]);

    // Apply selected font globally
    React.useEffect(() => {
        const selectedFontFamily = FONT_OPTIONS[selectedFont].family;
        const root = document.documentElement;

        // Update CSS custom property for dynamic font usage
        root.style.setProperty('--code-font-family', selectedFontFamily);

        // Apply to all code elements directly
        const codeElements = document.querySelectorAll('code, pre, kbd, samp, textarea, .monaco-editor, .emerald-terminal-text');
        codeElements.forEach(element => {
            element.style.fontFamily = selectedFontFamily;
        });
    }, [selectedFont, FONT_OPTIONS]);

    return (
        <div style={{
            minHeight: '100vh',
            background: `
                radial-gradient(circle at 20% 20%, rgba(248,250,252,0.8) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(241,245,249,0.6) 0%, transparent 50%),
                linear-gradient(135deg, #fefefe 0%, #fafafa 25%, #f8fafc 50%, #f1f5f9 75%, #fafafa 100%)
            `,
            fontFamily: "'Inter', system-ui, sans-serif",
            position: 'relative',
            backgroundAttachment: 'fixed',
            overflow: 'hidden'
        }}>

            {/* Enhanced Floating Orbs */}
            <div className="floating-orb"></div>
            <div className="floating-orb"></div>
            <div className="floating-orb"></div>
            <div className="floating-orb"></div>
            <div className="floating-orb"></div>

            {/* UI Content */}
            <div style={{ position: 'relative', zIndex: 10, padding: '20px' }}>


                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '20px' }}
                >
                    <div className="renaissance-panel aesthetic-glow" style={{
                        padding: '24px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 5,
                        pointerEvents: 'auto',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                            <div style={{ flex: '0 0 auto' }}>
                                <h1 style={{
                                    margin: 0,
                                    marginBottom: '4px',
                                    fontSize: '48px',
                                    fontWeight: 900,
                                    letterSpacing: '0.06em',
                                    fontFamily: "'Orbitron', 'Audiowide', sans-serif",
                                    background: 'linear-gradient(180deg, #f4f4f5 0%, #c7c9cc 40%, #9ca3af 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: `0 1px 0 #ffffff,
                                                0 2px 0 #d8dadd,
                                                0 3px 0 #b0b3b8,
                                                0 4px 0 #8b8f96,
                                                0 5px 10px rgba(0,0,0,0.35)`
                                }}>
                                    CodePad
                                </h1>
                                <p style={{
                                    margin: 0,
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    letterSpacing: '0.12em',
                                    color: 'rgba(55,65,81,0.85)',
                                    textTransform: 'uppercase'
                                }}>
                                    Professional Development Environment
                                </p>
                            </div>

                            {/* ALL BUTTONS GROUPED TO RIGHT SIDE */}
                            <div style={{
                                display: 'flex',
                                gap: '4px',
                                alignItems: 'center',
                                flexWrap: 'nowrap',
                                justifyContent: 'flex-end',
                                flex: '1 1 auto',
                                minWidth: 0,
                                maxWidth: '75%',
                                overflow: 'hidden'
                            }}>
                                {/* Editor Mode Buttons */}
                                {Object.entries(EDITOR_MODES).map(([mode, config]) => (
                                    <button
                                        key={mode}
                                        onClick={() => handleModeChange(mode)}
                                        disabled={isModeChanging}
                                        className={`leonardo-button ${editorMode === mode ? 'active' : ''}`}
                                        style={{
                                            opacity: isModeChanging && changingMode !== mode ? 0.6 : 1,
                                            cursor: isModeChanging ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        <span>{config.icon}</span>
                                        <span>
                                            {isModeChanging && changingMode === mode
                                                ? 'Loading…'
                                                : config.label
                                            }
                                        </span>
                                    </button>
                                ))}

                                {/* Language Selector - Actual dropdown */}
                                {editorMode === 'code' && (
                                    <div className="leonardo-select">
                                        <select
                                            value={lang}
                                            onChange={(e) => {
                                                setLang(e.target.value);
                                                setCode(CODE_EXAMPLES[e.target.value].code);
                                            }}
                                        >
                                            {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
                                                <option key={key} value={key}>
                                                    {example.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Execute Code Button */}
                                {editorMode === 'code' && (
                                    <>
                                        <button
                                            onClick={executeCode}
                                            disabled={isExecuting}
                                            className="leonardo-button"
                                            style={{
                                                opacity: isExecuting ? 0.6 : 1,
                                                cursor: isExecuting ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {isExecuting ? 'Executing…' : 'Execute Code'}
                                        </button>

                                        <button
                                            onClick={async () => {
                                                setIsExecuting(true);
                                                setOutput('🧪 Testing Judge0 API...\n');
                                                try {
                                                    // Test with Python for ML using correct ID
                                                    const pythonId = JUDGE0_LANGUAGE_IDS.python; // ID 25
                                                    setOutput(prev => prev + `🐍 Using Python for ML ID: ${pythonId}\n`);

                                                    const token = await submitCode("print('Hello, Judge0!')", pythonId);
                                                    setOutput(prev => prev + `📝 Test submitted! Token: ${token}\n`);

                                                    // Wait a bit then get result
                                                    await new Promise(resolve => setTimeout(resolve, 2000));
                                                    const result = await getSubmissionResult(token);

                                                    if (result.stdout) {
                                                        setOutput(prev => prev + '📤 Test OUTPUT:\n');
                                                        setOutput(prev => prev + atob(result.stdout) + '\n');
                                                        setOutput(prev => prev + '🎉 Full integration test successful!\n');
                                                    } else {
                                                        setOutput(prev => prev + `⏳ Status: ${result.status?.description || 'Processing'}\n`);
                                                    }
                                                } catch (testError) {
                                                    setOutput(prev => prev + `❌ Test execution failed: ${testError.message}\n`);
                                                    if (testError.response?.data) {
                                                        setOutput(prev => prev + `📜 Error details: ${JSON.stringify(testError.response.data, null, 2)}\n`);
                                                    }
                                                }
                                                setIsExecuting(false);
                                            }}
                                            disabled={isExecuting}
                                            className="leonardo-button"
                                            style={{
                                                opacity: isExecuting ? 0.6 : 1,
                                                cursor: isExecuting ? 'not-allowed' : 'pointer',
                                                fontSize: '12px',
                                                padding: '6px 12px'
                                            }}
                                        >
                                            Test API
                                        </button>
                                    </>
                                )}

                                {/* Font Selector - Actual dropdown */}
                                <div
                                    className="leonardo-select"
                                    title={`${FONT_OPTIONS[selectedFont].name} - ${FONT_OPTIONS[selectedFont].description}`}
                                >
                                    <select
                                        value={selectedFont}
                                        onChange={(e) => setSelectedFont(e.target.value)}
                                    >
                                        {Object.entries(FONT_OPTIONS).map(([key, font]) => (
                                            <option key={key} value={key} title={font.description}>
                                                {font.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Theme Selector - Actual dropdown */}
                                <div
                                    className="leonardo-select"
                                    title={`${COLOR_THEMES[currentTheme].name} - ${COLOR_THEMES[currentTheme].description}`}
                                >
                                    <select
                                        value={currentTheme}
                                        onChange={(e) => setCurrentTheme(e.target.value)}
                                    >
                                        {Object.entries(COLOR_THEMES).map(([key, theme]) => (
                                            <option key={key} value={key} title={theme.description}>
                                                {theme.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* AI Assistant Button */}
                                <button
                                    onClick={() => setShowAI(true)}
                                    className="leonardo-button"
                                >
                                    AI Assistant
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Main Content */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '25px',
                        minHeight: '65vh'
                    }}
                >
                    {/* Multi-Mode Editor Panel */}
                    <div className="renaissance-panel aesthetic-glow shimmer-effect" style={{
                        padding: '25px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        animation: 'contentBreathe 6s ease-in-out infinite',
                        zIndex: 1,
                        pointerEvents: 'auto'
                    }}>


                        <div className="glass-surface" style={{
                            borderRadius: '15px',
                            overflow: 'hidden',
                            height: '65vh',
                            position: 'relative',
                            zIndex: 2,
                            pointerEvents: 'auto'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.4) 100%)',
                                padding: '16px 24px',
                                borderBottom: '1px solid rgba(255,255,255,0.4)',
                                color: 'rgba(15, 23, 42, 0.9)',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textShadow: '0 1px 0 rgba(255, 255, 255, 0.8), 0 -1px 0 rgba(0, 0, 0, 0.15)',
                                backdropFilter: 'blur(10px) saturate(150%)',
                                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(0, 0, 0, 0.05)'
                            }}>
                                <span>
                                    {editorMode === 'code' ? `${CODE_EXAMPLES[lang].label} Editor` :
                                        editorMode === 'text' ? 'Plain Text Editor' :
                                            editorMode === 'draw' ? 'Drawing Canvas' : 'AI Assistant'}
                                </span>
                                {editorMode === 'code' && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {/* Inline Language Selector */}
                                        <select
                                            value={lang}
                                            onChange={(e) => {
                                                setLang(e.target.value);
                                                setCode(CODE_EXAMPLES[e.target.value].code);
                                            }}
                                            style={{
                                                fontSize: '12px',
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                background: 'rgba(255,255,255,0.6)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
                                                <option key={key} value={key}>{example.label}</option>
                                            ))}
                                        </select>

                                        {/* Inline Execute Button */}
                                        <button
                                            onClick={executeCode}
                                            disabled={isExecuting}
                                            style={{
                                                fontSize: '12px',
                                                padding: '4px 12px',
                                                borderRadius: '6px',
                                                background: isExecuting ? 'rgba(0,0,0,0.1)' : 'rgba(16,185,129,0.7)',
                                                color: '#fff',
                                                border: 'none',
                                                cursor: isExecuting ? 'not-allowed' : 'pointer',
                                                transition: 'background 0.2s ease-in-out'
                                            }}
                                        >
                                            {isExecuting ? 'Executing…' : 'Run'}
                                        </button>

                                        <span style={{ fontSize: '12px', opacity: 0.7, textShadow: '0 1px 0 rgba(255, 255, 255, 0.6)' }}>
                                            Type to see autocomplete
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Code Editor Mode */}
                            {editorMode === 'code' && (
                                <div className="code-glass-panel" style={{ position: 'relative', height: 'calc(100% - 55px)' }}>
                                    <MonacoEditor
                                        height="100%"
                                        language={lang}
                                        value={code}
                                        onChange={handleCodeChange}
                                        theme="vs"
                                        options={{
                                            fontFamily: FONT_OPTIONS[selectedFont].family,
                                            fontSize: 14,
                                            fontWeight: '500',
                                            lineHeight: 1.7,
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            wordWrap: 'on',
                                            automaticLayout: true,
                                            padding: { top: 20, bottom: 20, left: 20, right: 20 },
                                            bracketPairColorization: { enabled: true },
                                            renderLineHighlight: 'gutter',
                                            smoothScrolling: true,
                                            cursorBlinking: 'smooth',
                                            suggestOnTriggerCharacters: true,
                                            quickSuggestions: true,
                                            background: 'transparent',
                                            // Font rendering optimizations
                                            fontLigatures: true,
                                            renderWhitespace: 'selection',
                                            renderControlCharacters: false,
                                            renderIndentGuides: true,
                                            renderLineHighlightOnlyWhenFocus: false,
                                            // Disable features that might cause blur
                                            occurrencesHighlight: false,
                                            selectionHighlight: false,
                                            // Enable better font rendering
                                            fontFeatureSettings: '"liga" 1, "calt" 1',
                                            antialiasing: 'default'
                                        }}
                                    />

                                    {/* Enhanced Autocomplete Panel */}
                                    {/* Disabled */}
                                    {false && autocompleteVisible && AUTOCOMPLETE_SUGGESTIONS[lang] && (
                                        <motion.div />
                                    )}
                                </div>
                            )}

                            {/* Plain Text Mode - Just Glass */}
                            {editorMode === 'text' && (
                                <div
                                    className="glass-text"
                                    style={{
                                        width: '100%',
                                        height: 'calc(100% - 55px)',
                                        background: 'transparent',
                                        border: 'none',
                                        padding: '20px'
                                    }}
                                >
                                    {/* Pure glass panel - no interactive elements */}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Output Terminal */}
                    <div className="renaissance-panel aesthetic-glow shimmer-effect" style={{
                        padding: '25px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        animation: 'contentBreathe 6s ease-in-out infinite 1s'
                    }}>
                        {/* Terminal Glow Effect */}


                        <div className="renaissance-terminal pastel-glass-texture" style={{ height: '65vh' }}>
                            <div style={{
                                padding: '15px 20px',
                                color: 'rgba(30, 41, 59, 0.9)',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid rgba(203, 213, 225, 0.2)',
                                background: 'rgba(248, 250, 252, 0.3)'
                            }}>
                                <span>Output Terminal</span>
                                <span style={{
                                    fontSize: '12px',
                                    opacity: 0.7,
                                    color: 'rgba(51, 65, 85, 0.8)',
                                    fontWeight: '500'
                                }}>
                                    Status: {isExecuting ? 'Processing' : <Stopwatch isRunning={!isExecuting} />}
                                </span>
                            </div>
                            <pre className="emerald-terminal-text" style={{
                                fontFamily: FONT_OPTIONS[selectedFont].family,
                                fontSize: '13px',
                                lineHeight: '1.6',
                                padding: '20px',
                                margin: 0,
                                height: 'calc(100% - 55px)',
                                overflow: 'auto',
                                whiteSpace: 'pre-wrap',
                                background: 'transparent',
                                fontWeight: '500',
                                textRendering: 'optimizeLegibility'
                            }}>
                                {output}
                            </pre>
                        </div>
                    </div>
                </motion.main>

                {/* Footer Status */}
                <motion.footer
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{ marginTop: '20px' }}
                >
                    <div className="renaissance-panel aesthetic-glow" style={{ padding: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'rgba(30, 41, 59, 0.8)', fontSize: '14px', fontWeight: '500' }}>
                                {isExecuting ? 'Processing...' : <Stopwatch isRunning={!isExecuting} />}
                            </div>
                        </div>
                    </div>
                </motion.footer>
            </div>

            {/* AI Assistant Modal */}
            <AnimatePresence>
                {showAI && (
                    <AIAssistant
                        isVisible={showAI}
                        onClose={() => setShowAI(false)}
                        onSuggestion={handleAISuggestion}
                    />
                )}
            </AnimatePresence>

            {/* Drawing Canvas Modal */}
            <AnimatePresence>
                {showDrawing && (
                    <DrawingCanvas
                        isVisible={showDrawing}
                        onClose={() => setShowDrawing(false)}
                    />
                )}
            </AnimatePresence>






        </div>
    );
} 