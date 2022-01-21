#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::{
  borrow::Borrow,
  path::PathBuf,
  sync,
  sync::mpsc::{channel, Receiver, Sender},
};
use tauri::api::dialog::FileDialogBuilder;
use tauri::{generate_context, generate_handler, State};

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct UiModListData {
  id: &'static str,
  content: &'static str,
}

type MaybePath = Option<PathBuf>;
type AppState = State<'_, TauriState>;

#[derive(Debug)]
pub struct TauriState {
  game_location: MaybePath,
  mods_location: MaybePath,
  mod_list: Vec<UiModListData>,
}

const MOCK_DATA: [UiModListData; 9] = [
  UiModListData {
    id: "mod-item-1",
    content: "This is an item",
  },
  UiModListData {
    id: "mod-item-2",
    content: "This is another item",
  },
  UiModListData {
    id: "mod-item-3",
    content: "This is a third item",
  },
  UiModListData {
    id: "mod-item-4",
    content: "This is a fourth item",
  },
  UiModListData {
    id: "mod-item-5",
    content: "This is a fifth item",
  },
  UiModListData {
    id: "mod-item-6",
    content: "This is a sixth item",
  },
  UiModListData {
    id: "mod-item-7",
    content: "This is a seventh item",
  },
  UiModListData {
    id: "mod-item-8",
    content: "This is an eighth item",
  },
  UiModListData {
    id: "mod-item-9",
    content: "This is a ninth item",
  },
];

#[tauri::command]
fn get_mod_list(state: State<'_, TauriState>) -> Result<Vec<UiModListData>, &str> {
  let TauriState {
    mods_location,
    game_location,
    mod_list,
  } = state;

  if game_location.is_none() || mods_location.is_none() {
    // Return dummy data
    return Ok(MOCK_DATA.clone().to_vec());
  }

  let mod_list = mod_list.clone();

  (!mod_list.is_empty())
    .then(|| mod_list)
    .ok_or("No mods found in " + mods_location.unwrap().clone().into())
}

#[tauri::command]
async fn request_game_location(argument: Option<&str>, state: AppState) -> Result<&str, &str> {
  let builder = FileDialogBuilder::new();

  if argument.is_some() {
    builder.set_directory(argument.unwrap()) // argument will be the old value that the frontend has
  }

  let (sender, receiver): (Sender<MaybePath>, Receiver<MaybePath>) = channel();
  builder.pick_folder(move |path| sender.send(path.into()).unwrap());

  let selected_path = receiver.recv().unwrap();
  if selected_path.is_none() {
    return Err("No folder selected");
  }

  state.game_location = selected_path.clone();

  selected_path
    .map(move |path| path.to_str().unwrap())
    .ok_or("Could not convert path to string")
}

fn main() {
  tauri::Builder::default()
    .manage(TauriState {
      mod_list: Vec::new(),
      game_location: Option::None,
      mods_location: Option::None,
    })
    .invoke_handler(generate_handler![get_mod_list])
    .run(generate_context!())
    .expect("error while running tauri application");
}
