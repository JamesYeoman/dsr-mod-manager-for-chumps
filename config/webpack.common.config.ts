import { Configuration } from 'webpack'
import paths from './paths'
import { transpile, css, resources } from './webpack/module_rules'

const commonConfig: Partial<Configuration> = {
  entry: paths.src + '/index.tsx',
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: { rules: [transpile, css, resources] },
}

export default commonConfig
