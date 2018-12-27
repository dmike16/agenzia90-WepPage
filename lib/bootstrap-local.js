const ts = require('typescript');
const fs = require('fs');

// Ts format host
const formatHost =  {
    /**
     * @return {string} current direcory
     */
    getCurrentDirectory() {
      return ts.sys.getCurrentDirectory();
    },
    /**
     * @param {string} fileName
     * @return {string} canonical filename
     */
    getCanonicalFileName(fileName) {
      return fileName;
    },
    /**
     * @return {string} newLine char
     */
    getNewLine() {
      return ts.sys.newLine;
    },
    /**
     * Log Diagnostric
     * @param {*} diagnostic
     */
    logDiagnostic(diagnostic) {
      const message = ts.formatDiagnostic(diagnostic, this);
      console.info(message);
    }
}

// Ts compiler options
const tsCompilerOption = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ESNext,
    outDir: "./dist",
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    inlineSourceMap: true,
    inlineSources: false,
    noImplicitAny: true,
    alwaysStrict: true,
    declaration: true,
    lib: [
      "es2017"
    ],
    types: [
      "node"
    ]
}

// Mock require ts ext
const oldRequireTs = require.extensions['.ts'];
require.extensions['.ts'] = function (module, filename) {
    if (filename.match(/node_modules/)) {
        if (oldRequireTs) return oldRequireTs(module, filename);
        return module._compile(fs.readFileSync(filename, 'utf-8'), filename);
    }
    const source = fs.readFileSync(filename, 'utf-8');
    try {
        let result = ts.transpileModule(source, { compilerOptions: tsCompilerOption, fileName: filename });
        if (result.diagnostics.length > 0) {
            result.diagnostics.forEach((dia) => formatHost.logDiagnostic(dia));
            throw new Error('Error in ts compilation');
        }
        return module._compile(result.outputText, filename);
    } catch (error) {
        console.error(`Error in script ${filename}`);
        console.error(error.stack);
        throw error;
    }
};

// Mock default module name lookup to a handle local module
const Module = require('module');
const oldResolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent) {
    if (Module.builtinModules.includes(request)) {
        return oldResolveFilename.call(this, request, parent);
    } else {
        let resolved = null;
        try {
            resolved = oldResolveFilename.call(this, request, parent);
        } catch (e) {
            throw e;
        }

        if (resolved.match(/[\\\/]node_modules[\\\/]/)) {
            return resolved;
        } else if (request.endsWith('.json')) {
            return resolved;
        } else {
            const maybeTs = resolved.replace('.json', '.ts');
            if (fs.existsSync(maybeTs)) return maybeTs;
            return resolved;
        }
    }
};