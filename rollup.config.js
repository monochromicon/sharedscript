import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

export default {
	entry: 'client.js',
	dest: 'public/bundle.js',
	moduleName: 'sharedscript',
	format: 'iife',
	sourceMap: true,
	globals: {electron: 'null'},
	external: ['electron'],
	plugins: [
		resolve({
			browser: true,
			preferBuiltins: true,
			extensions: ['.js', '.json']
		}),
		commonjs(),
		globals(),
		builtins(),
		json()
	]
};
