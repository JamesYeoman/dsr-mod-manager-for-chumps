use crate::utils::types::{CommandError, MaybeString, ResultGenerator};

use std::path::PathBuf;

pub fn pathbuf_to_string(pathbuf: PathBuf) -> MaybeString {
  pathbuf.to_str().map(|st| String::from(st))
}

pub fn option_to_result<T>(err: CommandError) -> ResultGenerator<T> {
  Box::new(move |param: Option<T>| param.ok_or(err.clone()))
}
