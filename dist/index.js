import { invoke } from '@tauri-apps/api/core';

function query(filename, kind, query) {
    return invoke("plugin:hypergraphsql|query", {
        filename,
        kind,
        query,
    });
}
function createNode(filename, uri, data) {
    return invoke("plugin:hypergraphsql|create_node", {
        filename,
        uri,
        data,
    });
}
function createEdge(filename, fromNodeId, toNodeId, uri, data) {
    return invoke("plugin:hypergraphsql|create_edge", {
        filename,
        from_node_id: fromNodeId,
        to_node_id: toNodeId,
        uri,
        data,
    });
}

export { createEdge, createNode, query };
