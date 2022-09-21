import baseConfig from './webpack.base'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  ...baseConfig,
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  optimization: {
    minimize: true,
  },
}
