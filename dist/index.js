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
function updateNode(filename, nodeId, data) {
    return invoke("plugin:hypergraphsql|update_node", {
        filename,
        node_id: nodeId,
        data,
    });
}
function deleteNode(filename, nodeId) {
    return invoke("plugin:hypergraphsql|delete_node", {
        filename,
        node_id: nodeId,
    });
}
function deleteNodes(filename, nodeIds) {
    return invoke("plugin:hypergraphsql|delete_nodes", {
        filename,
        node_ids: nodeIds,
    });
}
function deleteNodesByURI(filename, uri) {
    return invoke("plugin:hypergraphsql|delete_nodes_by_uri", {
        filename,
        uri,
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
function updateEdge(filename, edgeId, data) {
    return invoke("plugin:hypergraphsql|update_edge", {
        filename,
        node_id: edgeId,
        data,
    });
}
function deleteEdge(filename, edgeId) {
    return invoke("plugin:hypergraphsql|delete_edge", {
        filename,
        edge_id: edgeId,
    });
}
function deleteEdges(filename, edgeIds) {
    return invoke("plugin:hypergraphsql|delete_edges", {
        filename,
        edge_ids: edgeIds,
    });
}
function deleteEdgesByURI(filename, uri) {
    return invoke("plugin:hypergraphsql|delete_edges_by_uri", {
        filename,
        uri,
    });
}

export { createEdge, createNode, deleteEdge, deleteEdges, deleteEdgesByURI, deleteNode, deleteNodes, deleteNodesByURI, query, updateEdge, updateNode };
