module.exports = {
  name: 'shared-notifications-toasts',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/notifications/toasts',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
