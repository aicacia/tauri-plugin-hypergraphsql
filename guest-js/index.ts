import { invoke } from "@tauri-apps/api/core";

export type QueryKind = "node_edge" | "node" | "edge";

export type QueryField =
	| "node.id"
	| "node.uri"
	| "node.data"
	| "node.updated_at"
	| "node.created_at"
	| "edge.id"
	| "edge.from_node_id"
	| "edge.to_node_id"
	| "edge.uri"
	| "edge.data"
	| "edge.updated_at"
	| "edge.created_at"
	| "from_node.id"
	| "from_node.uri"
	| "from_node.data"
	| "from_node.updated_at"
	| "from_node.created_at"
	| "to_node.id"
	| "to_node.uri"
	| "to_node.data"
	| "to_node.updated_at"
	| "to_node.created_at";

type QueryExpr =
	| QueryValue
	| QueryField
	| QueryOp
	| { [datafield: string]: QueryExpr };
type QueryValue = null | boolean | string | number;

type QueryOp =
	| { eq: QueryExpr }
	| { neq: QueryExpr }
	| { gt: QueryExpr }
	| { lt: QueryExpr }
	| { gte: QueryExpr }
	| { lte: QueryExpr }
	| { like: QueryExpr }
	| { in: QueryExpr[] }
	| { and: QueryExpr[] }
	| { or: QueryExpr[] }
	| { not: QueryExpr };

export type Query = Partial<Record<QueryField, QueryExpr>>;

export type Edge<T = object> = {
	id: number;
	from_node_id: number;
	to_node_id: number;
	uri: string;
	data: T;
	updated_at: string;
	created_at: string;
};

export type Node<T = object> = {
	id: number;
	uri: string;
	data: T;
	updated_at: string;
	created_at: string;
};

export type NodeEdge<FN = object, TN = object, E = object> = {
	from_node: Node<FN>;
	to_node: Node<TN>;
	edge: Edge<E>;
};

export function query<FN = object, TN = object, E = object>(
	filename: string,
	kind: "node_edge",
	query: Query,
): Promise<NodeEdge<FN, TN, E>[]>;

export function query<N = object>(
	filename: string,
	kind: "node",
	query: Query,
): Promise<Node<N>[]>;

export function query<E = object>(
	filename: string,
	kind: "edge",
	query: Query,
): Promise<Edge<E>[]>;

export function query(
	filename: string,
	kind: unknown,
	query: Query,
): Promise<unknown[]> {
	return invoke("plugin:hypergraphsql|query", {
		filename,
		kind,
		query,
	});
}

export function createNode<T>(
	filename: string,
	uri: string,
	data: T,
): Promise<Node<T>[]> {
	return invoke("plugin:hypergraphsql|create_node", {
		filename,
		uri,
		data,
	});
}

export function createEdge<T>(
	filename: string,
	fromNodeId: number,
	toNodeId: number,
	uri: string,
	data?: T,
): Promise<Node<T>[]> {
	return invoke("plugin:hypergraphsql|create_edge", {
		filename,
		from_node_id: fromNodeId,
		to_node_id: toNodeId,
		uri,
		data,
	});
}
