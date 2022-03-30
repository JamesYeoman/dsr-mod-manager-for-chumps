use crate::types::{FileInfo, ModData};

pub fn mod_list() -> Vec<ModData> {
  vec![
    ModData::new("mod-item-1", "Tauri Mod 1"),
    ModData::new("mod-item-2", "Tauri Mod 2"),
    ModData::new("mod-item-3", "Tauri Mod 3"),
    ModData::new("mod-item-4", "Tauri Mod 4"),
    ModData::new("mod-item-5", "Tauri Mod 5"),
  ]
}

pub fn file_info(id: &str) -> Vec<FileInfo> {
  match id {
    "mod-item-1" => vec![
      FileInfo::new("Model/chr/c0000/hkxx64", "mock_file_01.hkx"),
      FileInfo::new("Model/chr/c0000/hkxx64", "mock_file_02.hkx"),
      FileInfo::new("Model/chr/c0000/hkxx64", "mock_file_03.hkx"),
      FileInfo::new("Model/chr/c0000/taeNew/x64", "a00.tae"),
      FileInfo::new("Model/chr/c0000/taeNew/x64", "a01.tae"),
    ],
    "mod-item-2" => vec![FileInfo::new("foo", "bar"), FileInfo::new("foo", "baz")],
    "mod-item-3" => vec![FileInfo::new("a/b", "c"), FileInfo::new("a/ab", "abc")],
    "mod-item-4" => vec![
      FileInfo::new("I/like", "Pizza"),
      FileInfo::new("I/like", "Fish+Chips"),
      FileInfo::new("I/like", "Chocolate"),
    ],
    "mod-item-5" => vec![
      FileInfo::new("a/a/a", "a"),
      FileInfo::new("a/a/a", "b"),
      FileInfo::new("a/a/b", "a"),
      FileInfo::new("a/a/b", "b"),
      FileInfo::new("a/b/a", "a"),
      FileInfo::new("a/b/a", "b"),
      FileInfo::new("a/b/b", "a"),
      FileInfo::new("a/b/b", "b"),
      FileInfo::new("b/a/a", "a"),
      FileInfo::new("b/a/a", "b"),
      FileInfo::new("b/a/b", "a"),
      FileInfo::new("b/a/b", "b"),
      FileInfo::new("b/b/a", "a"),
      FileInfo::new("b/b/a", "b"),
      FileInfo::new("b/b/b", "a"),
      FileInfo::new("b/b/b", "b"),
    ],
    _ => vec![],
  }
}
