macro_rules! dsrbmm_cmd_err_raw {
  ($msg:expr) => {
    CommandError::new($msg.to_string())
  };
}
