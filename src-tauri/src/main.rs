// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use log::*;

use simplelog::*;

fn main() {
  CombinedLogger::init(
    vec![
      TermLogger::new(LevelFilter::Info, Config::default(), TerminalMode::Mixed, ColorChoice::Auto),
    ]
  ).unwrap();

  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![request_with_proxy])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}


#[tauri::command]
fn request_with_proxy(url: &str,is_xml:Option<bool>) -> Result<String, String> {
  info!("{}",format!("proxy requested. url: {url}"));

  let client = reqwest::blocking::Client::new();
  let mut request_builder = client.get(url);

  if is_xml.unwrap_or(false) == true {
    request_builder = request_builder.header("X-Requested-With", "XMLHttpRequest");
  }

  match request_builder.send() {
    Ok(res) => Ok(res.text().unwrap()),
    Err(e) => {
      info!("{}",format!("proxy error: {e}"));
      Err(e.to_string())
    },
  }
}
