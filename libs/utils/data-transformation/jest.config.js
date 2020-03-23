module.exports = {
  name: 'utils-data-transformation',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/utils/data-transformation',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
