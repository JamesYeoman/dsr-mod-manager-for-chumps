use crate::utils::mocks;
use crate::utils::mutex::use_mutex_ret;
use crate::utils::types;

use tauri::command;
use types::{AppState, CommandError, FileInfo, ModData, Response};

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

#[command]
pub async fn get_file_list(argument: String) -> Response<Vec<FileInfo>> {
  // Until the actual filesystem code is integrated, this will always return mock data
  Ok(mocks::file_info(argument.as_str()))
}
