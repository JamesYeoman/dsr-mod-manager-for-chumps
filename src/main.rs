use fltk::{app, prelude::*, window::Window};

mod components;
mod config;
mod tools;

fn main() {
    let app = app::App::default();
    app::background(148, 199, 210);

    let win_width = 1280;
    let win_height = 720;

    let mut wind = Window::default()
        .with_label("Hello from rust")
        .with_size(win_width, win_height)
        .center_screen();

    let mod_frame = components::mod_scroll_frame(win_width, win_height);
    mod_frame.end();

    wind.end();

    wind.show();
    app.run().unwrap();
}
