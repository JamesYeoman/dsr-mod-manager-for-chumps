use fltk::{
    app,
    prelude::*,
    window::Window
};

mod components;

fn main() {
    let app = app::App::default();
    app::background(148, 199, 210);

    let win_width = 1280;
    let win_height = 720;

    let mut wind = Window::default().with_label("Hello from rust").with_size(win_width, win_height).center_screen();

    let mod_frame = components::mod_scroll_frame(win_width, win_height);
    mod_frame.end();

    wind.end();

    wind.show();
    app.run().unwrap();
}

#[cfg(test)]
mod tests {
    use std::fs;
    use std::io::Read;
    use bitcoin_hashes::{sha256, Hash};
    use std::process::Command;

    #[test]
    ///
    /// Test as a sanity check that I can merge mods in
    ///
    fn test_scratch() -> Result<(), String> {
        let workspace = "test-folder/workspace";
        let dcx = "menu_0.tpf.dcx";
        let destination = format!("{}/{}", workspace, dcx);
        let folder = format!("{}/{}", workspace, dcx.replace(".", "-"));

        println!("Creating the workspace folder");
        fs::create_dir(workspace).unwrap();
    
        println!("Copying the backup file to the workspace");
        fs::copy(format!("test-folder/backup/{}", dcx), destination.clone()).expect("couldn't copy the dcx file");
    
        println!("Running Yabber to extract the DCX file");
        Command::new("test-folder/tools/yabber/Yabber.exe").arg(destination.clone()).status().expect("yabber failed to execute");

        println!("Copying update file to the extracted DCX");
        fs::copy("test-folder/mods/tst-mod/Icon20.dds", format!("{}/{}", folder, "Icon20.dds")).expect("Couldn't copy the update file");

        println!("Running Yabber to repack the DCX file");
        Command::new("test-folder/tools/yabber/Yabber.exe").arg(folder).status().expect("yabber failed to execute");

        println!("Getting SHA256 of repacked DCX file");
        let mut repacked = fs::File::open(destination.clone()).expect("Could not get a file handle for repacked DCX file");
        let mut repacked_buffer = Vec::with_capacity(repacked.metadata().unwrap().len() as usize);
        repacked.read_to_end(&mut repacked_buffer).unwrap();
        let repacked_hash = sha256::Hash::hash(&repacked_buffer);
        println!("Hash for repacked file is {}", repacked_hash);

        println!("Getting SHA256 of backup DCX file");
        let mut backup = fs::File::open(format!("test-folder/backup/{}", dcx)).expect("Could not get a file handle for the backup DCX file");
        let mut backup_buffer = Vec::with_capacity(backup.metadata().unwrap().len() as usize);
        backup.read_to_end(&mut backup_buffer).unwrap();
        let backup_hash = sha256::Hash::hash(&backup_buffer);
        println!("Hash for backup file is {}", backup_hash);

        assert_ne!(repacked_hash, backup_hash);

        fs::remove_dir_all(workspace).expect("Could not clean up workspace folder");

        Ok(())
    }
}
