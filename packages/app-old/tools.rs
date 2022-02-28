use std::path::PathBuf;
use std::process::Command;

struct Tools {
    yabber_folder: PathBuf,
}

impl Tools {
    fn new(yabber_folder: PathBuf) -> Tools {
        Tools { yabber_folder }
    }

    pub fn yabber(self, arg: PathBuf) {
        let yabber_path: PathBuf = self.yabber_folder.join("Yabber.exe");
        Command::new(yabber_path)
            .arg(arg)
            .status()
            .expect("Command failed to execute");
    }
}

#[cfg(test)]
mod tests {
    use crate::tools::Tools;
    use sha256::digest_file;
    use std::fs;
    use std::path::{Path, PathBuf};

    ///
    /// Test as a sanity check that I can merge mods in
    ///
    #[test]
    fn sanity_check() -> Result<(), String> {
        let root: &Path = Path::new("test-folder");
        let dcx: &str = "menu_0.tpf.dcx";
        let workspace: PathBuf = root.join("workspace");
        let update_file: PathBuf = root.join("mods").join("tst-mod").join("Icon20.dds");

        let backup_dcx: PathBuf = root.join("backup").join(dcx);
        let folder: PathBuf = workspace.join(dcx.replace(".", "-"));
        let tools = Tools::new(root.join("tools").join("yabber"));

        println!("Copying the backup file to the workspace");
        if workspace.exists() {
            fs::remove_dir_all(&workspace).expect("Unable to clean up old workspace");
        }

        fs::create_dir(&workspace).expect("Unable to create workspace");
        fs::copy(&backup_dcx, workspace.join(dcx)).expect("couldn't copy the DCX file");

        println!("Patching the copied DCX file");
        tools.yabber(workspace.join(dcx));
        fs::copy(&update_file, folder.join("Icon20.dds")).expect("Couldn't copy the update file");
        tools.yabber(folder);

        println!("Getting SHA256 of both DCX files");
        let repacked_hash: String =
            digest_file(workspace.join(dcx)).expect("Unable to get file handle");
        let backup_hash: String = digest_file(&backup_dcx).expect("Unable to get file handle");

        println!("Ensuring they're different from each other");
        assert_ne!(repacked_hash, backup_hash);

        fs::remove_dir_all(&workspace).expect("Could not clean up workspace folder");

        Ok(())
    }
}
