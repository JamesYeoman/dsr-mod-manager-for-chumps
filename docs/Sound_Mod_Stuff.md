# Sound Mod Stuff

While sound mods aren't currently supported, this is where I'm collating information regarding them.

Extracting FSBs requires [the program found at this link](http://aluigi.altervista.org/papers.htm#:~:text=files%20extractor%20for%20the%20fsb%20(fmod%20sample%20bank)%20archives%20used%20by%20the%20fmod%20library).
The link uses a text anchor, so if you use firefox or safari, you'll need [this extension](https://github.com/GoogleChromeLabs/link-to-text-fragment).

Repacking FSBs will require [DSSI](https://www.nexusmods.com/darksouls/mods/1193?tab=description). I'll need to determine if I can actually use the cli to insert a mp3 file into an existing FSB. That would allow me to bypass the need to extract.

DSSI requires the `fev` and `itl` files to be in the same directory as the `fsb`. If they're not around, the GUI will crash when trying to open the FSB.
