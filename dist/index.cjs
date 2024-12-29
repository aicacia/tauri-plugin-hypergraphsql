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
function createEdge(filename, fromNodeId, toNodeId, uri, data) {
    return core.invoke("plugin:hypergraphsql|create_edge", {
        filename,
        from_node_id: fromNodeId,
        to_node_id: toNodeId,
        uri,
        data,
    });
}

exports.createEdge = createEdge;
exports.createNode = createNode;
exports.query = query;
