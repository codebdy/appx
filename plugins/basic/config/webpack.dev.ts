import baseConfig from './webpack.base'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
//import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpack from 'webpack'
import path from 'path'

export const PORT = 4000

const PLUGIN_NAME = "Debug"

class ServerInfoPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, (compilation) => {
      const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
      logger.info("本地服务地址：" + `http://127.0.0.1:${PORT}/`);
      logger.info("调试地址：" + `https://debug-apper.rxdrag.com/`);
    })
  }
}

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      chunks: chunk,
    })
  })
}

// for (const key in baseConfig.entry) {
//   if (Array.isArray(baseConfig.entry[key])) {
//     baseConfig.entry[key].push(
//       require.resolve('webpack/hot/dev-server'),
//       `${require.resolve('webpack-dev-server/client')}?http://localhost:${PORT}`
//     )
//   }
// }

export default {
  ...baseConfig,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
    new ServerInfoPlugin()
  ],
  devServer: {
    host: '127.0.0.1',
    compress: true,
    open: false,
    port: PORT,
  },

}
