#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[macro_use]
mod macros;

mod commands;
mod utils;

use std::sync::Mutex;

use tauri::{generate_context, generate_handler};

use crate::commands::dialogs::request_game_location;
use crate::commands::mod_data::{get_file_list, get_mod_list};
use crate::commands::settings::{discard_settings, save_settings};
use crate::utils::types::TauriState;

fn main() {
  //todo: create persistence for settings
  tauri::Builder::default()
    .manage(TauriState {
      mod_list: Vec::new(),
      game_location: Default::default(),
      mods_location: Mutex::default(),
    })
    .invoke_handler(generate_handler![
      discard_settings,
      get_file_list,
      get_mod_list,
      request_game_location,
      save_settings,
    ])
    .run(generate_context!())
    .expect("error while running tauri application");
}
