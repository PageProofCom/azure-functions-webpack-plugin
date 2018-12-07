const path = require('path');
const find = require('find');
const VirtualModuleWebpackPlugin = require('virtual-module-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const FUNCTION_JSON = 'function.json';

class AzureFunctionsWebpackPlugin {
  apply(compiler) {
    const { options } = compiler;
    const root = path.resolve(compiler.context, options.entry);
    const mainFile = options.output.filename === '[name].js'
      ? 'main.js'
      : options.output.filename;
    const functionJsons = find.fileSync(FUNCTION_JSON, root);
    const functions = functionJsons.map((jsonPath) => {
      const functionPath = path.dirname(jsonPath);
      const functionName = path.basename(functionPath);
      return {
        name: functionName,
        path: functionPath,
      };
    });
    const copyPlugin = new CopyWebpackPlugin(functions.map((func) => {
      return {
        from: path.resolve(func.path, FUNCTION_JSON),
        to: path.join(func.name, FUNCTION_JSON),
        transform: (content) => {
          const parsed = JSON.parse(content.toString());
          Object.assign(parsed, {
            _originalEntryPoint: false,
            _originalScriptFile: 'index.js',
            scriptFile: '../' + mainFile,
            entryPoint: func.name,
          });
          return JSON.stringify(parsed, null, 2);
        },
      };
    }));
    copyPlugin.apply(compiler);
    const entryPlugin = new VirtualModuleWebpackPlugin({
      moduleName: path.join(options.entry, 'index.js'),
      contents: `
        module.exports = {
          ${functions.map((func) => (`
            ${JSON.stringify(func.name)}: (function () {
              var f = require("${func.path}");
              return f.default || f;
            })(),
          `)).join('\n')}
        };
      `,
    });
    entryPlugin.apply(compiler);
  }
}

module.exports = AzureFunctionsWebpackPlugin;
