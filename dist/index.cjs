'use strict';

var core = require('@tauri-apps/api/core');

function query(filename, kind, query) {
    return core.invoke("plugin:hypergraphsql|query", {
        filename,
        kind,
        query,
    });
}
function createNode(filename, uri, data) {
    return core.invoke("plugin:hypergraphsql|create_node", {
        filename,
        uri,
        data,
    });
}
function updateNode(filename, nodeId, data) {
    return core.invoke("plugin:hypergraphsql|update_node", {
        filename,
        node_id: nodeId,
        data,
    });
}
function deleteNode(filename, nodeId) {
    return core.invoke("plugin:hypergraphsql|delete_node", {
        filename,
        node_id: nodeId,
    });
}
function deleteNodes(filename, nodeIds) {
    return core.invoke("plugin:hypergraphsql|delete_nodes", {
        filename,
        node_ids: nodeIds,
    });
}
function deleteNodesByURI(filename, uri) {
    return core.invoke("plugin:hypergraphsql|delete_nodes_by_uri", {
        filename,
        uri,
    });
}
function createEdge(filename, fromNodeId, toNodeId, uri, data) {
    return core.invoke("plugin:hypergraphsql|create_edge", {
        filename,
        from_node_id: fromNodeId,
        to_node_id: toNodeId,
        uri,
        data,
    });
}
function updateEdge(filename, edgeId, data) {
    return core.invoke("plugin:hypergraphsql|update_edge", {
        filename,
        node_id: edgeId,
        data,
    });
}
function deleteEdge(filename, edgeId) {
    return core.invoke("plugin:hypergraphsql|delete_edge", {
        filename,
        edge_id: edgeId,
    });
}
function deleteEdges(filename, edgeIds) {
    return core.invoke("plugin:hypergraphsql|delete_edges", {
        filename,
        edge_ids: edgeIds,
    });
}
function deleteEdgesByURI(filename, uri) {
    return core.invoke("plugin:hypergraphsql|delete_edges_by_uri", {
        filename,
        uri,
    });
}

exports.createEdge = createEdge;
exports.createNode = createNode;
exports.deleteEdge = deleteEdge;
exports.deleteEdges = deleteEdges;
exports.deleteEdgesByURI = deleteEdgesByURI;
exports.deleteNode = deleteNode;
exports.deleteNodes = deleteNodes;
exports.deleteNodesByURI = deleteNodesByURI;
exports.query = query;
exports.updateEdge = updateEdge;
exports.updateNode = updateNode;
