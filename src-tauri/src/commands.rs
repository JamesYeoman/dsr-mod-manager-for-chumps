use crate::types::{self, CommandError, ModData, PathSetting};
use crate::utils::pathbuf_to_string;
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
pub fn get_mod_list(state: AppState<'_>) -> Response<Vec<types::ModData>> {
  let lock = state.mods_location.lock().unwrap();
  let location = lock.clone();
  drop(lock);

  if location.current.is_empty() {
    return Ok(vec![
      ModData::new("mod-item-1", "This is an item"),
      ModData::new("mod-item-2", "This is another item"),
      ModData::new("mod-item-3", "This is a third item"),
      ModData::new("mod-item-4", "This is a fourth item"),
      ModData::new("mod-item-5", "This is a fifth item"),
      ModData::new("mod-item-6", "This is a sixth item"),
      ModData::new("mod-item-7", "This is a seventh item"),
      ModData::new("mod-item-8", "This is an eighth item"),
      ModData::new("mod-item-9", "This is a ninth item"),
    ]);
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
  let mut builder = FileDialogBuilder::new();
  let starting_location = state.game_location.lock().unwrap();
  let path_setting = get_latest_setting(starting_location.clone());
  if path_setting.is_some() {
    builder = builder.set_directory(path_setting.unwrap())
  }
  drop(starting_location);

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

  let mut loc = state.game_location.lock().unwrap();
  loc.set_new(selection_str.clone());
  drop(loc);

  Ok(selection_str)
}

#[command]
pub fn save_settings(state: AppState<'_>) {
  println!("Saving settings!");
  let mut loc = state.game_location.lock().unwrap();
  (*loc).current = loc.new.clone();
  (*loc).new = String::new();
  println!("Saved the game_location setting!");
  drop(loc);
}

/// Basically `save_settings` but without the copy of the new values to current
#[command]
pub fn discard_settings(state: AppState<'_>) {
  println!("Discarding settings!");
  let mut loc = state.game_location.lock().unwrap();
  (*loc).new = String::new();
  println!("Discarded the game_location setting");
  drop(loc);
}
