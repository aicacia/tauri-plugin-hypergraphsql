use std::{sync::RwLock, time::Duration};

use expiringmap::ExpiringMap;
use lazy_static::lazy_static;

lazy_static! {
  static ref SQLITE_POOLS: RwLock<ExpiringMap<String, sqlx::SqlitePool>> =
    RwLock::new(ExpiringMap::new());
}

pub async fn get_or_create(filename: String) -> Result<sqlx::SqlitePool, String> {
  let pool: sqlx::SqlitePool;
  'pool: {
    match SQLITE_POOLS.read() {
      Ok(pools) => {
        if let Some(p) = pools.get(&filename) {
          pool = p.clone();
          break 'pool;
        }
      }
      Err(e) => return Err(e.to_string()),
    };
    pool = match hypergraphsql::create(&filename, true).await {
      Ok(p) => p,
      Err(e) => return Err(e.to_string()),
    };
    match SQLITE_POOLS.write() {
      Ok(mut pools) => {
        pools.insert(filename, pool.clone(), Duration::from_secs(60 * 5));
      }
      Err(e) => return Err(e.to_string()),
    };
  };
  Ok(pool)
}
