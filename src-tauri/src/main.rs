#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod commands;
mod types;
mod utils;

use crate::commands::{get_mod_list, request_game_location};
use std::sync::Mutex;
use tauri::{generate_context, generate_handler};
use types::TauriState;

fn main() {
  //todo: create persistence for settings
  tauri::Builder::default()
    .manage(TauriState {
      mod_list: Vec::new(),
      game_location: Mutex::default(),
      mods_location: Mutex::default(),
    })
    .invoke_handler(generate_handler![get_mod_list, request_game_location])
    .run(generate_context!())
    .expect("error while running tauri application");
}
