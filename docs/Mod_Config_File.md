# Mod Config File

TOML will be useful, considering the app will be written in rust

## Mod Example
Example based on [Better Rolling](https://www.nexusmods.com/darksoulsremastered/mods/193?tab=description)

Archive chosen for example to inject to: `chr/c0000.anibnd.dcx`

I don't know what files are actually modified, so I'll just use a subset
 - The current limit of mod packers is individual files.
 - Individual files will still need mod patches, but there will be considerably less, as unrelated files within DCX archives won't conflict

Need to enable overriding entire folders, or just single files.

If there's a lot of files to override, it'll be easier to specify a subdirectory that contains them all.

Having the individual files lets simple mods specify the one or two file overrides instead of having to create an unnecessary subdirectory. 

```toml
[[folder.chr.c0000_anibnd_dcx]]
path = "Model/chr/c0000/hkxx64"

[[file.chr.c0000_anibnd_dcx]]
path = "Model/chr/c0000/taeNew/x64/a00.tae"
```

By using Table Arrays, multiple folders can override the same archive.

In anticipation of support for additional tools, there should be a prefix on the array table IDs.

```toml
[[yabber.folder.chr.c0000_anibnd_dcx]]
#...
```

The full snippet for Better Rolling would therefore be as follows
```toml
[[yabber.folder.chr.c0000_anibnd_dcx]]
path = "Model/chr/c0000/hkxx64"

[[yabber.folder.chr.c0000_anibnd_dcx]]
path = "Model/chr/c0000/taeNew/x64"
```

As for Metadata, I see the following as the important information
 - Mod Name
 - Mod Version
 - Author
 - Mod URL
 - Github URL (optional)
 - Description (Multiline Literals are recommended)

For these bits of metadata, here's a snippet
```toml
[metadata]
name = "Better Rolling"
version = "x.y.z"
author = "Hocter"
description = '''
This mod aims to improve rollin in DSR to make it slighlty more in line with later entries into the series. Its incredibly difficult to maintain a fast-roll in DS1 without the use of Havel's Ring ad the FAP Ring which I find limits build variety and creativity...'''

[metadata.url]
mod = "https://www.nexusmods.com/darksoulsremastered/mods/193"
# source = <link to source>
```

Any file in the mod folder that _isn't_ specified in the `mod.toml` file will be ignored. Feel free to use this behaviour to bundle documentation, screenshots, and other niceties.
