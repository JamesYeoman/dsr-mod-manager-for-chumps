#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[derive(serde::Serialize)]

struct UiModListData {
  id: &'static str,
  content: &'static str,
}

#[tauri::command]
fn get_mod_list() -> Result<Vec<UiModListData>, String> {
  let result: Vec<UiModListData> = vec![
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

  Ok(result)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_mod_list])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
