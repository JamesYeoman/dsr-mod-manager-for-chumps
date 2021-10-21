import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import paths from '../paths'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

export const clean = new CleanWebpackPlugin()
export const forkTsChecker = new ForkTsCheckerWebpackPlugin({ async: false })
export const eslint = new ESLintPlugin({
  extensions: ['js', 'jsx', 'ts', 'tsx'],
})
export const htmlWebpack = new HtmlWebpackPlugin({
  template: paths.public + '/index.html',
  filename: 'index.html',
})
export const copyWebpack = new CopyWebpackPlugin({
  patterns: [
    {
      from: paths.src + '/assets',
      to: 'assets',
      globOptions: { ignore: ['*.DS_Store'] },
    },
  ],
})
