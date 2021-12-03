#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[derive(serde::Serialize)]
struct UiModListData {
  content: String,
  selected: bool,
}

#[tauri::command]
fn get_mod_list() -> Result<Vec<UiModListData>, String> {
  let result: Vec<UiModListData> = vec![
    UiModListData { content: "This is an item".into(), selected: false},
    UiModListData { content: "This is another item".into(), selected: false},
    UiModListData { content: "This is a third item".into(), selected: false},
    UiModListData { content: "This is a fourth item".into(), selected: false},
    UiModListData { content: "This is a fifth item".into(), selected: false},
    UiModListData { content: "This is a sixth item".into(), selected: true},
    UiModListData { content: "This is a seventh item".into(), selected: false},
    UiModListData { content: "This is an eighth item".into(), selected: false},
    UiModListData { content: "This is a ninth item".into(), selected: false}
  ];

  Ok(result)
}

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![get_mod_list])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
