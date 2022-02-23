# Dev environment setup

## Prerequisites

[Tauri's getting started guide](https://tauri.studio/en/docs/getting-started/intro) will walk you through getting the required dependencies (and also any platform-specific dependencies)

## Intellij IDEA recommended extensions

Since there isn't a way to share extension recommendations for Intellij IDEA in the same way that VSCode supports
extension recommendations, here's a list of extensions that I feel are pretty much required for using Intellij IDEA
when working with this project.

- [Rainbow Brackets](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)
  - This is now a native feature of VS Code, but I'm unsure what the case for IDEA is though
- [Better Comments](https://plugins.jetbrains.com/plugin/10850-better-comments)
- [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)
- [Rust](https://plugins.jetbrains.com/plugin/8182-rust)
- Javascript and Typescript (bundled)
- Node.js (bundled)
- Javascript Debugger (bundled)
- Javascript Intention Power Pack (bundled)
- Markdown (bundled)
- CSS (bundled)

## VS Code recommended extensions notes

- [GapStyle](https://marketplace.visualstudio.com/items?itemName=gaplo917.gapstylevs) is a phenominal colour theme overhaul. I recommend it, but honestly, I'm more evangelising it tbh 😉
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer) is being recommended instead of the [official rust extension](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust) because the official rust extension can't handle macro expansion (and most large libraries like Tauri use macros, so macro expansion is kinda required for autocomplete)
