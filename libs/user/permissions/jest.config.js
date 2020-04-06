module.exports = {
  name: 'user-permissions',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/user/permissions',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
