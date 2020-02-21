module.exports = {
  name: 'admin-agencies-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/admin/agencies/data-access',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
