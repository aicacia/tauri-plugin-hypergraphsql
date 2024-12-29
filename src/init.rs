use super::commands;

pub fn init<R>() -> tauri::plugin::TauriPlugin<R>
where
  R: tauri::Runtime,
{
  tauri::plugin::Builder::<R>::new("hypergraphsql")
    .invoke_handler(tauri::generate_handler![
      commands::query,
      commands::create_node,
      commands::update_node,
      commands::delete_node,
      commands::delete_nodes,
      commands::delete_nodes_by_uri,
      commands::create_edge,
      commands::update_edge,
      commands::delete_edge,
      commands::delete_edges,
      commands::delete_edges_by_uri,
    ])
    .build()
}
