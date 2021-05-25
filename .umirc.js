// ref: https://umijs.org/config/
export default {
  publicPath: './',

  treeShaking: true,
  history: 'hash',
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/home', component: '../pages/home' },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'umi',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  theme: {
    'primary-color': '#1DA57A',
  },
};
