import paths from './paths'
import { Configuration } from 'webpack'
import { clean, copyWebpack, forkTsChecker, htmlWebpack, eslint } from './webpack/plugins'
import commonConfig from './webpack.common.config'

const config: Configuration = {
  ...commonConfig,
  mode: 'production',
  output: {
    path: paths.build,
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  plugins: [clean, copyWebpack, htmlWebpack, forkTsChecker, eslint],
}

export default config
