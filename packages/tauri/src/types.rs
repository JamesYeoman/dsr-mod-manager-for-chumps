use serde::Serialize;
use std::sync::Mutex;
use tauri::State;

#[derive(Debug, Clone, Serialize)]
pub struct CommandError {
  pub message: String,
}

impl CommandError {
  pub fn new(message: String) -> Self {
    Self {
      message: message.clone(),
    }
  }
}

impl std::fmt::Display for CommandError {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    write!(f, "{}", self.message)
  }
}

impl std::error::Error for CommandError {}

#[derive(Debug, Default, Clone)]
pub struct PathSetting {
  pub current: String,
  pub new: String,
}

#[derive(Debug, Default)]
pub struct TauriState {
  pub game_location: Mutex<PathSetting>,
  pub mods_location: Mutex<PathSetting>,
  pub mod_list: Vec<ModData>,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Default)]
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
pub type Response<T> = Result<T, CommandError>;
