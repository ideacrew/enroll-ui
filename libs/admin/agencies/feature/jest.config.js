module.exports = {
  name: 'admin-agencies-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/admin/agencies/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
