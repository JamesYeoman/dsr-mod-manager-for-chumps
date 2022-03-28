use crate::types::ModData;

pub fn mod_list() -> Vec<ModData> {
  vec![
    ModData::new("mod-item-1", "This is an item"),
    ModData::new("mod-item-2", "This is another item"),
    ModData::new("mod-item-3", "This is a third item"),
    ModData::new("mod-item-4", "This is a fourth item"),
    ModData::new("mod-item-5", "This is a fifth item"),
    ModData::new("mod-item-6", "This is a sixth item"),
    ModData::new("mod-item-7", "This is a seventh item"),
    ModData::new("mod-item-8", "This is an eighth item"),
    ModData::new("mod-item-9", "This is a ninth item"),
  ]
}
