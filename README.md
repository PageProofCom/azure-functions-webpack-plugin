# @pageproof/azure-functions-webpack-plugin

A super simple webpack plugin for Azure Functions.

This plugin makes it quick to create an Azure Function App that uses webpack to compile your dependencies.

This plugin is heavily inspired by [`Azure/azure-functions-pack`](https://github.com/Azure/azure-functions-pack) (which is no longer maintained).

## Installation

Install the plugin as a dev dependency using npm;

```
$ npm i --save-dev @pageproof/azure-functions-webpack-plugin
```

## Setup

There are a few things to note about this plugin;

- Currently the plugin takes no options. Just add the plugin to your webpack config file, and everything is handled for you.
- Your webpack entrypoint (`config.entry`) needs to point to a directory. The plugin will take care of creating an actual file as your entrypoint, but it uses the directory as an indication of where your functions live.
- Your `host.json`, `proxies.json`, and `extensions.csproj` files should live within your project root.
- Make sure to set the webpack `mode` option (eg. `webpack --mode production`). When set to `development` your `local.settings.json` file is also included in the output.
- The location of your functions are totally up to you. But functions are still identified as a directory with a `function.json` file and an `index.js` (or `index.ts` if you're using TypeScript) file.

Because this is just a plugin, you still have full control over your webpack config file. Use Babel, TypeScript, or whatever other crazy loaders and plugins you like.

### Known problems

- Your functions are scanned when the plugin is initialized, so if you're running webpack in watch mode, you will need to remember to restart webpack every time you add a new function.

## Example

The most basic example of this plugin requires little to no effort. Simply create a `webpack.config.js` file and add the plugin.

The default webpack configuration assumes a `src/` directory to hold all your code. And emits the output to `dist/`. If you are happy with these defaults, then this is all your `webpack.config.js` needs to look like;

```js
const AzureFunctionsWebpackPlugin = require('@pageproof/azure-functions-webpack-plugin');

module.exports = {
  plugins: [
    new AzureFunctionsWebpackPlugin(),
  ],
};
```

You can take a look at the [`examples/`](./examples) folder for more examples.

## License

MIT
