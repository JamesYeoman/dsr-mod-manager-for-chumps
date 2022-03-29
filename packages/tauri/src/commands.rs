use crate::mocks;
use crate::types::{self, CommandError, ModData, PathSetting};
use crate::utils::{option_to_result, pathbuf_to_string, use_mutex, use_mutex_ret};
use std::sync::mpsc::Receiver;
use std::sync::Mutex;
use std::{path::PathBuf, sync::mpsc::channel};
use tauri::{api::dialog::FileDialogBuilder, command};
use types::{AppState, Response};

fn handle_folder(r: Receiver<PathBuf>, p: &Mutex<PathSetting>) -> Response<String> {
  r.recv()
    .map_err(|_| dsrbmm_cmd_err_raw!("No folder selected"))
    .map(pathbuf_to_string)
    .and_then(option_to_result(dsrbmm_cmd_err_raw!("Invalid folder path")))
    .and_then(|selection_str| {
      use_mutex(p, |loc| {
        (*loc).new = selection_str.clone();
      });

      Ok(selection_str)
    })
}

fn get_latest_setting(s: PathSetting) -> Option<String> {
  if !s.new.is_empty() {
    return Some(s.new.clone());
  }

  if !s.current.is_empty() {
    return Some(s.current.clone());
  }

  None
}

#[command]
pub fn get_mod_list(state: AppState<'_>) -> Response<Vec<ModData>> {
  let location = use_mutex_ret(&(state.mods_location), |lock| lock.clone());

  if location.current.is_empty() {
    return Ok(mocks::mod_list());
  }

  let mod_list = state.mod_list.clone();
  if mod_list.is_empty() {
    let err_msg = format!("No mods found in {}", location.current.clone().as_str());
    return Err(CommandError::new(err_msg.clone()));
  }

  Ok(mod_list)
}

//TODO: Create a command like this but for the mods location
#[command]
pub async fn request_game_location(state: AppState<'_>) -> Response<String> {
  let builder = use_mutex_ret(&(state.game_location), |starting_location| {
    let path_setting = get_latest_setting(starting_location.clone());
    let mut fdb = FileDialogBuilder::new();
    if path_setting.is_some() {
      fdb = FileDialogBuilder::new().set_directory(path_setting.unwrap());
    }

    fdb
  });

  let (sender, receiver) = channel::<PathBuf>();
  builder.pick_folder(move |path| {
    if path.is_some() {
      sender.send(path.unwrap()).unwrap()
    } else {
      drop(sender)
    }
  });

  handle_folder(receiver, &(state.game_location))
}

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
