'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'fs', 'source-map-support', './compile-warn-and-throw'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('fs'), require('source-map-support'), require('./compile-warn-and-throw'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.fs, global.sourceMapSupport, global.compileWarnAndThrow);
		global.register = mod.exports;
	}
})(this, function (exports, _fs, _sourceMapSupport, _compileWarnAndThrow2) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = register;

	var _compileWarnAndThrow3 = _interopRequireDefault(_compileWarnAndThrow2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const sourceMaps = new Map();

	function register(options) {
		compileOptions = options;

		require.extensions['.ms'] = (newModule, filename) => {
			const ms = (0, _fs.readFileSync)(filename, 'utf-8');
			const js = compileAndRegisterSourceMap(ms, filename);

			newModule._compile(js, filename);
		};
	}

	(0, _sourceMapSupport.install)({
		retrieveSourceMap(source) {
			const _ = sourceMaps.get(source);

			return _ === undefined ? (0, _sourceMapSupport.retrieveSourceMap)(source) : {
				url: null,
				map: _
			};
		}

	});
	let compileOptions = null;

	function compileAndRegisterSourceMap(msSrc, inFilePath) {
		var _compileWarnAndThrow = (0, _compileWarnAndThrow3.default)(msSrc, inFilePath, compileOptions);

		const code = _compileWarnAndThrow.code;
		const sourceMap = _compileWarnAndThrow.sourceMap;
		const fullInPath = (0, _fs.realpathSync)(inFilePath);
		sourceMaps.set(fullInPath, sourceMap);
		return code;
	}
});
//# sourceMappingURL=register.js.map