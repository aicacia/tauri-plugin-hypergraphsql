import { readFileSync } from "fs";
import { dirname, join } from "path";
import { cwd } from "process";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const input = "guest-js/index.ts",
	external = [/^@tauri-apps\/api/];

// eslint-disable-next-line security/detect-non-literal-fs-filename
const pkg = JSON.parse(readFileSync(join(cwd(), "package.json"), "utf8"));

const pluginJsName = pkg.name
	.replace("tauri-plugin-", "")
	.replace(/-./g, (x) => x[1].toUpperCase());
const iifeVarName = `__TAURI_PLUGIN_${pkg.name
	.replace("tauri-plugin-", "")
	.replace("-", (x) => "_")
	.toUpperCase()}__`;

export default [
	{
		input,
		output: [
			{
				file: pkg.exports.import,
				format: "esm",
			},
			{
				file: pkg.exports.require,
				format: "cjs",
			},
		],
		plugins: [
			typescript({
				declaration: true,
				declarationDir: dirname(pkg.exports.import),
			}),
		],
		external: [
			...external,
			...Object.keys(pkg.dependencies || {}),
			...Object.keys(pkg.peerDependencies || {}),
		],
		onwarn: (warning) => {
			throw Object.assign(new Error(), warning);
		},
	},
	{
		input,
		output: {
			format: "iife",
			name: iifeVarName,
			// IIFE is in the format `var ${iifeVarName} = (() => {})()`
			// we check if __TAURI__ exists and inject the API object
			banner: "if ('__TAURI__' in window) {",
			// the last `}` closes the if in the banner
			footer: `Object.defineProperty(window.__TAURI__, '${pluginJsName}', { value: ${iifeVarName} }) }`,
			file: pkg.exports.iffe,
		},
		// and var is not guaranteed to assign to the global `window` object so we make sure to assign it
		plugins: [typescript(), terser(), nodeResolve()],
		onwarn: (warning) => {
			throw Object.assign(new Error(), warning);
		},
	},
];
