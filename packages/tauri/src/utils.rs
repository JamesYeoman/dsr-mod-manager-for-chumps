use crate::types::{CommandError, MaybeString, Response};
use std::path::PathBuf;
use std::sync::{Mutex, MutexGuard};

pub fn pathbuf_to_string(pathbuf: PathBuf) -> MaybeString {
  pathbuf.to_str().map(|st| String::from(st))
}

pub fn pathbuf_to_result(pathbuf: PathBuf) -> Response<String> {
  let maybe_str = pathbuf.to_str();

  maybe_str
    .ok_or(CommandError::raw_new("Invalid folder path"))
    .map(String::from)
}

pub fn use_mutex<T, F>(mutx: &Mutex<T>, f: F)
where
  F: FnMut(&mut MutexGuard<T>),
{
  use_mutex_ret(&mutx, f);
}

pub fn use_mutex_ret<T, F, R>(mutx: &Mutex<T>, mut f: F) -> R
where
  F: FnMut(&mut MutexGuard<T>) -> R,
{
  let mut guard = mutx.lock().unwrap();
  let ret_val = f(&mut guard);
  drop(guard);
  ret_val
}
