// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![request_with_proxy])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}


#[tauri::command]
fn request_with_proxy(url: &str) -> Result<String, String> {
  println!("{}",format!("proxy detected. {url}"));
  match reqwest::blocking::get(url.to_string()) {
    Ok(res) => Ok(res.text().unwrap()),
    Err(e) => Err(e.to_string()),
  }
}
