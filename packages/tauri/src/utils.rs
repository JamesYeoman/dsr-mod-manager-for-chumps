use crate::types::{CommandError, MaybeString};
use std::path::PathBuf;
use std::sync::{Mutex, MutexGuard};

pub fn pathbuf_to_string(pathbuf: PathBuf) -> MaybeString {
  pathbuf.to_str().map(|st| String::from(st))
}

pub type ResultGenerator<T> = Box<dyn Fn(Option<T>) -> Result<T, CommandError>>;

pub fn option_to_result<T>(err: CommandError) -> ResultGenerator<T> {
  Box::new(move |param: Option<T>| param.ok_or(err.clone()))
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
