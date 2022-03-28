use crate::mocks;
use crate::types::{self, CommandError, ModData, PathSetting};
use crate::utils::{pathbuf_to_string, use_mutex, use_mutex_ret};
use std::{path::PathBuf, sync::mpsc::channel};
use tauri::{api::dialog::FileDialogBuilder, command};
use types::{AppState, Response};

fn get_latest_setting(s: PathSetting) -> Option<String> {
  if !s.new.is_empty() {
    return Some(s.new.clone());
  } else {
    if !s.current.is_empty() {
      return Some(s.current.clone());
    }
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
    let err = CommandError::new(format!(
      "No mods found in {}",
      location.current.clone().as_str()
    ));
    return Err(err.clone());
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

  let maybe_received = receiver.recv();
  if maybe_received.is_err() {
    return Err(CommandError::raw_new("No folder selected"));
  }

  let foo = maybe_received.unwrap();
  let maybe_str = pathbuf_to_string(foo);
  if maybe_str.is_none() {
    return Err(CommandError::raw_new("Invalid folder path"));
  }

  let selection_str = maybe_str.unwrap();

  use_mutex(&(state.game_location), |loc| {
    (*loc).new = selection_str.clone();
  });

  Ok(selection_str)
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
