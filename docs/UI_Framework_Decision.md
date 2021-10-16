# Design Decision for UI Framework
After digging around, I've decided that Rust will be a better fit than Kotlin, purely because the UI libraries for Kotlin are mostly lackluster (Jetbrains Compose looks promising, but it's not mature enough yet for me to commit to using it).

The JVM in general is a bad idea for a mod manager that will need to be running in the background in order to listen for DSR exiting in order to restore the vanilla files.

Besides, I doubt people will be willing to adopt a mod manager that runs on the JVM.

## Outcome + Rationale
I've decided on [FLTK-RS](https://github.com/fltk-rs/fltk-rs)
 - it's currently in active development
 - is [explicitly cross-platform](https://github.com/fltk-rs/fltk-rs#dependencies)
 - is [lightweight](https://github.com/fltk-rs/fltk-rs#:~:text=Speed.%20Fast%20to%20install%2C%20fast%20to%20build%2C%20fast%20at%20startup%20and%20fast%20at%20runtime.) (both in terms of performance and executable size)
 - appears to be very stable (this is based on the fact that there are very few open issues, many closed issues, and the major version number isn't 0).
 