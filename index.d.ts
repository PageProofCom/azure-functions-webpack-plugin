import webpack from 'webpack';

export default class AzureFunctionsWebpackPlugin implements webpack.Plugin {
  apply(compiler: webpack.Compiler): void;
}
