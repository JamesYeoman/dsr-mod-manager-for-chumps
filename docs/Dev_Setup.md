# Dev environment setup

## Prerequisites

[Tauri's getting started guide](https://tauri.studio/en/docs/getting-started/intro) will walk you through getting
the requirements for your OS (I personally prefer [Volta](https://volta.sh/) instead of nvm or nodenv (windows caveats detailed below))

## Windows Volta caveats

On windows, this can be a bit wacky as you either need to enable Developer mode,
or see [here](https://superuser.com/a/994147) for advice on setting up symlinks.

Once you've done that, the volta executable in `C:\Program Files\Volta` will be able to create symlinks
and stuff needed in `%LOCALAPPDATA%\Volta`.

You'll know that you've done everything correctly if you can run `C:\\Program\ Files\\Volta\\volta.exe setup` without any errors.

I'd personally recommend enabling Developer mode as a "this is a much easier method", but the symlink method could be made more secure
by creating a Symlink group that _only_ has r/w access to `%LOCALAPPDATA%\Volta`, and adding yourself to that symlink group.

## Setup

So you've got Webview2, rustup, yarn (via volta, or `npm install -g yarn`), and any other OS-specific dedpendencies installed.

What next?

I'm assuming you've cloned the repository. I'll use `<root>` to represent the repository root on your local machine, and that you're
using Bash (ZSH in the case of MacOS, and Git Bash in the case of Windows). The volta caveats section above assumed no such thing.

```bash
cd <root>
yarn set version berry # Set yarn to the latest version
yarn                   # Get yarn to fetch all dependencies and build the workspace map
cd packages/tauri
cargo update           # Install the rust libraries

# [Optional] build the rust documentation.
# Will be accecssible at <root>/packages/tauri/target/doc/dsrbmm/index.html
cargo doc

cd <root>

# Here's the commands to start up the different environments
cargo tauri dev        # (from <root>/packages/tauri) start up the tauri app in dev mode, using the web dev server
yarn frontend dev      # Start up the ViteJS dev server
yarn sb start          # Start up the Storybook server
```

The reason for `cargo tauri dev` instead of `yarn tauri dev` is because yarn invoked the cargo build using CMD instead of Git Bash,
which meant that the dev server couldn't start because the cargo environment didn't know about the yarn-installed executables like vite.

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

- [GapStyle](https://marketplace.visualstudio.com/items?itemName=gaplo917.gapstylevs) is a phenominal colour theme overhaul.
  I recommend it, but honestly, I'm more evangelising it tbh 😉
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer)
  is being recommended instead of the [official rust extension](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)
  because the official rust extension can't handle macro expansion
  (and most large libraries like Tauri use macros, so macro expansion is kinda required for autocomplete)
- [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) is for debug support
