import type { TauriError } from './interfaces';

export const isTauriContext = '__TAURI_IPC__' in window;

export const isTauriError = (obj: any): obj is TauriError => {
  if (!('message' in obj)) {
    return false;
  }

  return typeof obj['message'] === 'string';
};

export const wrapTauriErr = (obj: unknown) => {
  if (isTauriError(obj)) {
    return new Error(obj.message);
  }

  return new Error(`The following unknown object was caught: ${JSON.stringify(obj)}`);
};

export const tauriErrHandler = (e: unknown) => {
  const err = wrapTauriErr(e);
  console.error({ err });
  alert(`${err}`);
};
