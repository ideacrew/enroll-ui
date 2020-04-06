module.exports = {
  name: 'user-store',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/user/store',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
