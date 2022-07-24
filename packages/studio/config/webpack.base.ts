import path from 'path'
//import fs from 'fs-extra'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
//import { getThemeVariables } from 'antd/dist/theme'

export default {
  mode: 'development',
  devtool: 'inline-source-map', // 嵌入到源文件中
  stats: {
    entrypoints: false,
    children: false,
  },
  entry: {
    playground: path.resolve(__dirname, '../src/index'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    //alias: getAlias(),
  },
  externals: {
    // '@formily/reactive': 'Formily.Reactive',
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
    antd: 'antd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: getThemeVariables({
              //   dark: true // 开启暗黑模式
              // }),
              javascriptEnabled: true,
              modules: true,
              modifyVars: {
                'root-entry-name': 'default'
              },
            },
          },
        ],
      },
      {
        test: /\.html?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
}
