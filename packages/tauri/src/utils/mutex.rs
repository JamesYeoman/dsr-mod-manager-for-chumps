use std::sync::{Mutex, MutexGuard};

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
