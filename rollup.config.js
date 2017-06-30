import gitVersion from 'rollup-plugin-git-version';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

export default {
	entry: 'public/client.js',
	dest: 'public/bundle.js',
	moduleName: 'sharedscript',
	format: 'iife',
	sourceMap: true,
	plugins: [
		resolve({jsnext: true, main: true, browser: true}),
		commonjs(),
		json({exclude: 'package.json'}),
		gitVersion({include: 'package.json'}),
		globals(),
		builtins()
	]
};
