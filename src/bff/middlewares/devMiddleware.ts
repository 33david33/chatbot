import webpackDevMiddleware from 'webpack-dev-middleware';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import webpackConfig from '../../../webpack/webpack.config';

const bundler = webpack(webpackConfig({ env: 'dev' }));
const devMiddleware = [
  webpackDevMiddleware(bundler, {
    publicPath: '/frontend',
  }),
  webpackHotMiddleware(bundler),
];

export default devMiddleware;
