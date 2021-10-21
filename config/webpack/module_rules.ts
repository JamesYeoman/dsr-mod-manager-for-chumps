import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'

const preset = (name: string) => '@babel/preset-' + name
export const transpile = {
  test: /\.[jt]sx?$/i,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: { presets: [preset('env'), preset('react'), preset('typescript')] },
  },
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      ident: 'postcss',
      plugins: [postcssImport, require('tailwindcss/nesting'), tailwindcss, autoprefixer],
    },
  },
}

export const css = {
  test: /\.(?:s?c)ss$/,
  use: ['style-loader', 'css-loader', postcssLoader],
}

export const resources = {
  test: /\.(?:ico|gif|png|jpe?g)$/i,
  type: 'asset/resource',
}
