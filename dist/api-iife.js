if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_HYPERGRAPHSQL__ = (function (r) {
		"use strict";
		return (
			"function" == typeof SuppressedError && SuppressedError,
			(r.query = function (r) {
				return (async function (r, _ = {}, e) {
					return window.__TAURI_INTERNALS__.invoke(r, _, e);
				})("plugin:hypergraphsql|query", { query: r });
			}),
			r
		);
	})({});
	Object.defineProperty(window.__TAURI__, "hypergraphsql", {
		value: __TAURI_PLUGIN_HYPERGRAPHSQL__,
	});
}
