use crate::utils::funcs::{option_to_result, pathbuf_to_string};
use crate::utils::mutex::{use_mutex, use_mutex_ret};
use crate::utils::types::{AppState, CommandError, PathSetting, Response};

use std::sync::mpsc::{channel, Receiver};
use std::{path::PathBuf, sync::Mutex};
use tauri::{api::dialog::FileDialogBuilder, command};

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
