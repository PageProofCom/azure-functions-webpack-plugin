# @pageproof/azure-functions-webpack-plugin

This plugin makes it simple to create Azure Function Apps using webpack. It automatically emits files that can be easily deployed as an Azure Function App.

This plugin was inspired by [`funcpack`](https://github.com/Azure/azure-functions-pack) - which is no longer maintained.

## Requirements

This plugin requires a minimum of Node v6.4.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install @pageproof/azure-functions-webpack-plugin:

```
$ npm install --save-dev @pageproof/azure-functions-webpack-plugin
```

Then add the plugin to your webpack config. For example:

**webpack.config.js**

```js
const AzureFunctionsWebpackPlugin = require('@pageproof/azure-functions-webpack-plugin');

module.exports = {
  entry: './src',
  plugins: [
    new AzureFunctionsWebpackPlugin(),
  ],
};
```

Pay attention to the `entry` option; this option must point to a folder that contains your functions. Your functions can be located any number of levels deep (the plugin simply looks for `function.json` files) - this way you have full control over your folder structure.

The plugin will automatically copy across your function app's `host.json`, `proxies.json` and `extensions.csproj` files to the output directory. Make sure these files are placed within the same folder as your `webpack.config.js` file.

When you run webpack with the mode set to `development`, your `local.settings.json` file will also be copied to the output directory.

## Known problems

- Your functions are scanned when the plugin is initialized, so if you're running webpack in watch mode, you will need to remember to restart webpack every time you add a new function.

## Examples

You can take a look at the [`examples/`](./examples) folder for examples.

## Special thanks

This plugin could not have been made without the work of the people who maintain these amazing plugins;

- [copy-webpack-plugin](https://www.npmjs.com/package/copy-webpack-plugin)
- [virtual-module-webpack-plugin](https://www.npmjs.com/package/virtual-module-webpack-plugin)

## License

[MIT](./LICENSE)
