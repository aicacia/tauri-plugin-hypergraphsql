if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_HYPERGRAPHSQL__ = (function (e) {
		"use strict";
		async function r(e, r = {}, n) {
			return window.__TAURI_INTERNALS__.invoke(e, r, n);
		}
		return (
			"function" == typeof SuppressedError && SuppressedError,
			(e.createEdge = function (e, n, _, i, t) {
				return r("plugin:hypergraphsql|create_edge", {
					filename: e,
					from_node_id: n,
					to_node_id: _,
					uri: i,
					data: t,
				});
			}),
			(e.createNode = function (e, n, _) {
				return r("plugin:hypergraphsql|create_node", {
					filename: e,
					uri: n,
					data: _,
				});
			}),
			(e.query = function (e, n, _) {
				return r("plugin:hypergraphsql|query", {
					filename: e,
					kind: n,
					query: _,
				});
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "hypergraphsql", {
		value: __TAURI_PLUGIN_HYPERGRAPHSQL__,
	});
}
