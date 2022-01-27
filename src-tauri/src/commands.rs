use crate::types::{self, ModData};
use crate::utils::pathbuf_to_string;
use std::{path::PathBuf, sync::mpsc::channel};
use tauri::{api::dialog::FileDialogBuilder, command};
use types::{AppState, Response};

#[command]
pub fn get_mod_list(state: AppState<'_>) -> Response<Vec<types::ModData>> {
  let location = state.mods_location.lock().unwrap();
  if location.is_none() {
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
    return Err(format!("No mods found in {}", location.clone().unwrap()));
  }

  Ok(mod_list)
}

//TODO: Create a command like this but for the mods location
#[command]
pub async fn request_game_location(state: AppState<'_>) -> Response<String> {
  let mut builder = FileDialogBuilder::new();
  let old_location = state.game_location.lock().unwrap();

  if old_location.is_some() {
    builder = builder.set_directory(old_location.clone().unwrap()); // argument will be the old value that the frontend has
  }

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
    return Err("No folder selected".to_string());
  }

  let selection_str = pathbuf_to_string(maybe_received.unwrap());
  if selection_str.is_some() {
    return Err("Invalid folder path".to_string());
  }

  *state.game_location.lock().unwrap() = selection_str.clone();
  Ok(selection_str.unwrap())
}
