# Decoding Claude Code

**What actually happens when you ask an AI to fix your code?**

A single-page interactive explainer of [Claude Code](https://code.claude.com)'s architecture — where computation happens, what data leaves your machine, how the agentic loop works, RAM usage, and security model.

Built for technical accuracy (every claim cites official sources) but written with cricket analogies and a light touch so anyone can follow along.

**Live site:** [decodeclaudecode.vercel.app](https://decodeclaudecode.vercel.app) *(deploy pending)*

---

## What's Covered

| Section | What You'll Learn |
|---------|-------------------|
| **The Split** | Claude Code is two systems: a local TypeScript client (Bun runtime, ~512K LOC) and Anthropic's servers (where all AI inference happens) |
| **The Agentic Loop** | The 6-step cycle: prompt → API → tool call → local execution → result → repeat |
| **The Data Question** | Yes, file contents Claude reads are sent to Anthropic. No, your entire codebase is not uploaded |
| **Security & Privacy** | Encryption, retention policies (30-day default, ZDR for Enterprise), training opt-in/out by tier, SOC 2 / ISO 27001 |
| **RAM & Resources** | ~820 MB per session baseline, CLI vs Desktop vs VS Code process models, why more RAM mostly doesn't help |
| **The Context Window** | What fills it, how compaction works, why there's no local indexing (confirmed by Claude Code's creator), prompt caching (92% reuse) |
| **Glossary** | 13 terms from "inference" to "prompt caching," explained without jargon |
| **Further Reading** | 10 curated links to official docs, engineering blog posts, and analysis |

## Tech Stack

- **Vanilla HTML + CSS + JS** — no framework, no build step, no dependencies
- **Inline SVG diagrams** with CSS animations (architecture split, agentic loop, data flow)
- **Fonts:** Fraunces (display) + Plus Jakarta Sans (body) + JetBrains Mono (code)
- **Dark theme** with amber/teal accent palette
- **Fully responsive** (mobile, tablet, desktop)
- **Scroll-reveal animations** via IntersectionObserver
- **Animated agentic loop diagram** that cycles through steps when in view
- **Expandable glossary** with keyboard accessibility

## Deploy to Vercel

This is a static site — no build step required.

```bash
# Option 1: Vercel CLI
vercel --prod

# Option 2: Connect the GitHub repo to Vercel
# Just point it at the root directory — it will serve index.html automatically
```

## Run Locally

```bash
# Any static file server works
python3 -m http.server 8123

# Then open http://localhost:8123
```

## Sources & Accuracy

Every technical claim is backed by inline citations linking to:

- [Official Claude Code docs](https://code.claude.com/docs/en/overview)
- [Anthropic Security docs](https://code.claude.com/docs/en/security)
- [Anthropic Data Usage policy](https://code.claude.com/docs/en/data-usage)
- [Anthropic Trust Center](https://trust.anthropic.com)
- [Claude Code GitHub repo](https://github.com/anthropics/claude-code)
- [Anthropic Engineering Blog](https://www.anthropic.com/engineering/claude-code-sandboxing)

Technical claims were last verified April 2026. If something has changed, Anthropic's official documentation is the authoritative source.

## License

[MIT](LICENSE)

---

Built with Claude Code, naturally.
