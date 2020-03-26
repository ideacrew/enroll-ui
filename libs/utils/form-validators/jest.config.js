module.exports = {
  name: 'utils-form-validators',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/utils/form-validators',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
