module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '码途',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css',
    '@/assets/css/main.css',
    '@/assets/css/revise.css',
    '@/assets/css/response.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/iview',
    {src:'@/plugins/CryptoEncode',ssr:true},
    {src:'@/plugins/iview-editor',ssr:false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    prefix:"/devApi",
    proxy: true,
    timeout: 60*1000,
    // credentials : true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    vendor:['Qs','js-cookie']
  },
  /**
   ** 代理
   */
  proxy: {
    // // 设置代理
    "/devApi": {
      // 服务器地址
      target: "http://localhost:8888",
      changeOrigin: true,
      pathRewrite: {
        "^/devApi": ""
      }
    }
  }
}
