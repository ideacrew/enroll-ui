module.exports = {
  name: 'shared-google-analytics',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/google-analytics',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
