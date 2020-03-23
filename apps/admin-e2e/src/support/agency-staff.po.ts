export const getSearchBox = () => cy.get('#global-search');
export const getStaffList = () => cy.get('hbx-staff-container');
export const getFirstAssociation = () =>
  cy.get('hbx-staff-container:first hbx-agency-association');
