// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{params, Connection, Result};

#[tauri::command]
fn add_haircut(barber: String, price: f64) -> Result<()> {
    let conn = Connection::open("haircuts.db")?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS haircuts (
                  id INTEGER PRIMARY KEY,
                  barber TEXT NOT NULL,
                  price REAL NOT NULL,
                  date TEXT NOT NULL
                  )",
        [],
    )?;
    let date = chrono::Local::now().to_rfc3339();
    conn.execute(
        "INSERT INTO haircuts (barber, price, date) VALUES (?1, ?2, ?3)",
        params![barber, price, date],
    )?;
    Ok(())
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![add_haircut])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
