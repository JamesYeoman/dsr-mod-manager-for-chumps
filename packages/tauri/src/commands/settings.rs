use tauri::command;

use crate::utils::mutex::use_mutex;
use crate::utils::types::AppState;

#[command]
pub fn save_settings(state: AppState<'_>) {
  println!("Saving settings!");
  use_mutex(&(state.game_location), |guard| {
    (*guard).current = guard.new.clone();
    (*guard).new = String::new();
    println!("Saved the game_location setting!");
  });
}

/// Basically `save_settings` but without the copy of the new values to current
#[command]
pub fn discard_settings(state: AppState<'_>) {
  println!("Discarding settings!");
  use_mutex(&(state.game_location), |guard| {
    (*guard).new = String::new();
    println!("Discarded the game_location setting");
  });
}
