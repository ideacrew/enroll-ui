module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        include: [
          require('path').join(__dirname, '..', 'admin/src'),
          require('path').join(__dirname, '../..', 'libs/theme/src'),
          require('path').join(__dirname, '../..', 'libs/api-interfaces/src'),
          require('path').join(
            __dirname,
            '../..',
            'libs/admin/agencies/data-access/src'
          ),
          require('path').join(
            __dirname,
            '../..',
            'libs/admin/agencies/feature/src'
          ),
          require('path').join(
            __dirname,
            '../..',
            'libs/admin/shared/view-models/src'
          ),
          require('path').join(__dirname, '../..', 'libs/admin/shell/src'),
          require('path').join(__dirname, '../..', 'libs/utils/testing/src'),
          require('path').join(
            __dirname,
            '../..',
            'libs/admin/shared/ui-components/src'
          ),
          require('path').join(__dirname, '../..', 'libs/auth/src'),
          require('path').join(
            __dirname,
            '../..',
            'libs/utils/data-transformation/src'
          ),
          require('path').join(
            __dirname,
            '../..',
            'libs/utils/form-validators/src'
          ),
          require('path').join(__dirname, '../..', 'libs/user/data-access/src'),
          require('path').join(__dirname, '../..', 'libs/user/store/src'),
          require('path').join(__dirname, '../..', 'libs/user/utils/src'),
          require('path').join(__dirname, '../..', 'libs/user/permissions/src'),
          require('path').join(
            __dirname,
            '../..',
            'libs/shared/notifications/toasts/src'
          ),
          require('path').join(
            __dirname,
            '../..',
            'libs/shared/google-analytics/src'
          ),
        ],
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /(ngfactory|ngstyle)\.js/,
        ],
      },
    ],
  },
};
