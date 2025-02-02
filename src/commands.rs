use serde::{Deserialize, Serialize};

use super::pool::get_or_create;

#[derive(Serialize, Deserialize)]
pub enum QueryKind {
  #[serde(rename = "node_edge")]
  NodeEdge,
  #[serde(rename = "node")]
  Node,
  #[serde(rename = "edge")]
  Edge,
}

#[tauri::command]
pub async fn query(
  filename: String,
  kind: QueryKind,
  query: hypergraphsql::Query,
) -> Result<serde_json::Value, String> {
  let pool = get_or_create(filename).await?;
  let result = match kind {
    QueryKind::NodeEdge => match query
      .node_edges::<serde_json::Value, serde_json::Value, serde_json::Value>(&pool)
      .await
    {
      Ok(rows) => serde_json::to_value(&rows),
      Err(e) => return Err(e.to_string()),
    },
    QueryKind::Node => match query.nodes::<serde_json::Value>(&pool).await {
      Ok(rows) => serde_json::to_value(&rows),
      Err(e) => return Err(e.to_string()),
    },
    QueryKind::Edge => match query.edges::<serde_json::Value>(&pool).await {
      Ok(rows) => serde_json::to_value(&rows),
      Err(e) => return Err(e.to_string()),
    },
  };
  match result {
    Ok(json) => Ok(json),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn create_node(
  filename: String,
  uri: String,
  data: serde_json::Value,
) -> Result<serde_json::Value, String> {
  let pool = get_or_create(filename).await?;
  let node = match hypergraphsql::create_node(&pool, &uri, data).await {
    Ok(node) => node,
    Err(e) => return Err(e.to_string()),
  };
  match serde_json::to_value(&node) {
    Ok(json) => Ok(json),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn update_node(
  filename: String,
  node_id: i64,
  data: serde_json::Value,
) -> Result<serde_json::Value, String> {
  let pool = get_or_create(filename).await?;
  let node = match hypergraphsql::update_node(&pool, node_id, data).await {
    Ok(node) => node,
    Err(e) => return Err(e.to_string()),
  };
  match serde_json::to_value(&node) {
    Ok(json) => Ok(json),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn delete_node(filename: String, node_id: i64) -> Result<bool, String> {
  let pool = get_or_create(filename).await?;
  match hypergraphsql::delete_node::<serde_json::Value>(&pool, node_id).await {
    Ok(Some(_)) => Ok(true),
    Ok(None) => Ok(false),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn delete_nodes(filename: String, node_ids: Vec<i64>) -> Result<bool, String> {
  let pool = get_or_create(filename).await?;
  match hypergraphsql::delete_nodes::<serde_json::Value>(&pool, node_ids.as_slice()).await {
    Ok(nodes) => Ok(!nodes.is_empty()),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn delete_nodes_by_uri(filename: String, uri: String) -> Result<bool, String> {
  let pool = get_or_create(filename).await?;
  match hypergraphsql::delete_nodes_by_uri::<serde_json::Value>(&pool, &uri).await {
    Ok(nodes) => Ok(!nodes.is_empty()),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn create_edge(
  filename: String,
  from_node_id: i64,
  to_node_id: i64,
  uri: String,
  data: Option<serde_json::Value>,
) -> Result<serde_json::Value, String> {
  let pool = get_or_create(filename).await?;
  let node =
    match hypergraphsql::create_edge_with_ids(&pool, from_node_id, to_node_id, &uri, data).await {
      Ok(node) => node,
      Err(e) => return Err(e.to_string()),
    };
  match serde_json::to_value(&node) {
    Ok(json) => Ok(json),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn update_edge(
  filename: String,
  edge_id: i64,
  data: Option<serde_json::Value>,
) -> Result<serde_json::Value, String> {
  let pool = get_or_create(filename).await?;
  let node = match hypergraphsql::update_edge(&pool, edge_id, data).await {
    Ok(node) => node,
    Err(e) => return Err(e.to_string()),
  };
  match serde_json::to_value(&node) {
    Ok(json) => Ok(json),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn delete_edge(filename: String, edge_id: i64) -> Result<bool, String> {
  let pool = get_or_create(filename).await?;
  match hypergraphsql::delete_edge::<serde_json::Value>(&pool, edge_id).await {
    Ok(Some(_)) => Ok(true),
    Ok(None) => Ok(false),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn delete_edges(filename: String, edge_ids: Vec<i64>) -> Result<bool, String> {
  let pool = get_or_create(filename).await?;
  match hypergraphsql::delete_edges::<serde_json::Value>(&pool, edge_ids.as_slice()).await {
    Ok(edges) => Ok(!edges.is_empty()),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
pub async fn delete_edges_by_uri(filename: String, uri: String) -> Result<bool, String> {
  let pool = get_or_create(filename).await?;
  match hypergraphsql::delete_edges_by_uri::<serde_json::Value>(&pool, &uri).await {
    Ok(edges) => Ok(!edges.is_empty()),
    Err(e) => Err(e.to_string()),
  }
}
