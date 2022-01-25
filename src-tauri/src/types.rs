use std::sync::Mutex;
use tauri::State;

#[derive(Debug)]
pub struct TauriState {
  pub game_location: Mutex<MaybeString>,
  pub mods_location: Mutex<MaybeString>,
  pub mod_list: Vec<ModData>,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ModData {
  pub id: String,
  pub content: String,
}

impl ModData {
  pub fn new(id: &str, content: &str) -> ModData {
    ModData {
      id: id.to_string(),
      content: content.to_string(),
    }
  }
}

pub type MaybeString = Option<String>;
pub type AppState<'a> = State<'a, TauriState>;
pub type Response<T> = Result<T, String>;
