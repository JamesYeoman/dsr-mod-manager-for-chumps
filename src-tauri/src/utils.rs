use crate::types::MaybeString;
use std::path::PathBuf;

pub fn pathbuf_to_string(pathbuf: PathBuf) -> MaybeString {
  pathbuf.to_str().map(|st| String::from(st))
}
