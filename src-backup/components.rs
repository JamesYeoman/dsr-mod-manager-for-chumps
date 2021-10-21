use fltk::{enums::FrameType, group::Scroll, prelude::*};

struct ModScrollFrame {}

pub fn mod_scroll_frame(win_width: i32, win_height: i32) -> Scroll {
    let mut mod_frame = Scroll::new(5, 5, (win_width / 2) - 10, win_height - 10, "");
    mod_frame.set_frame(FrameType::EngravedFrame);

    mod_frame
}
