const COMMANDS: &[&str] = &[
  "query",
  "create_node",
  "update_node",
  "delete_node",
  "delete_nodes",
  "delete_nodes_by_uri",
  "create_edge",
  "update_edge",
  "delete_edge",
  "delete_edges",
  "delete_edges_by_uri",
];

fn main() {
  tauri_plugin::Builder::new(COMMANDS)
    .global_api_script_path("./api-iife.js")
    .build();
}
