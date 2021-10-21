import paths from './paths'
import { Configuration } from 'webpack'
import { htmlWebpack, copyWebpack, forkTsChecker } from './webpack/plugins'
import commonConfig from './webpack.common.config'

const config: Configuration = {
  ...commonConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  output: { publicPath: '/' },
  plugins: [htmlWebpack, copyWebpack, forkTsChecker],
}

export const devServer = {
  static: paths.build,
  historyApiFallback: true,
  port: 8080,
  open: true,
  hot: true,
}

export default config
