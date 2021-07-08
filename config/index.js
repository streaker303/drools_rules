'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
		// host: '192.168.124.10', // can be overwritten by process.env.HOST
		// host: '192.168.91.214', // can be overwritten by process.env.HOST
    port: 8093, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
		proxyTable: {
			'/api': {
				//target: 'http://dnscn.zicp.vip/', //需要代理的地址
				target: 'http://10.11.102.45:20198/', //需要代理的地址
				// target: 'http://192.168.91.64:8081/', //周威本地
				//target: 'http://192.168.39.13:8080/', //需要代理的地址
				changeOrigin: true,
				pathRewrite: {
					'^/api': '' //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
				},
			},
			'/imgServer': {
				 //target: 'http://192.168.91.218:8081/', //需要代理的地址
				target: 'http://10.11.102.15:7699/', //需要代理的地址
			    changeOrigin: true,
			    pathRewrite: {
			        '^/imgServer': '' //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
			    },
			},
             '/base': {
				 // target: ' http://10.11.102.15:19180/', //需要代理的地址
				target: 'http://10.11.102.44:20018/', //需要代理的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/base': '' //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
                },
            },

            // '/attect': {
            //   target: 'http://10.11.102.44:20088/', //需要代理的地址
            //   changeOrigin: true,
            //   ws: true,
            //   secure: false,
            //   pathRewrite: {
            //     '^/attect': '' //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
            //   },
            // },
		},


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
