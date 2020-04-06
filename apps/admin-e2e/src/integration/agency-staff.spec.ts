import * as faker from 'faker/locale/en_US';

import { mockAgencyWithStaff } from '@hbx/utils/testing';

import { getSearchBox, getStaffList } from '../support/agency-staff.po';
import { CurrentUser, HbxUser, HbxPermissions } from '@hbx/api-interfaces';

const user: HbxUser = {
  account_name: 'admin@dc.gov',
};

describe('Agency Staff', () => {
  const permissions: HbxPermissions = {
    view_agency_staff: true,
    manage_agency_staff: true,
  };

  const agencyProfileId = faker.random.uuid();
  const { agency, agencyStaff, primaryAgent } = mockAgencyWithStaff(
    agencyProfileId
  );

  beforeEach(() => {
    cy.server();
    cy.route('**/users/current', { ...user, ...permissions }).as('currentUser');
    cy.route('**/agencies', [agency]).as('agencies');
    cy.route('**/agencies/agency_staff', agencyStaff).as('agencyStaff');
    cy.route('**/agencies/primary_agency_staff', [primaryAgent]).as(
      'primaryAgents'
    );
    cy.visit('/agencies/agency-staff');
  });

  it('display a complete list of agency staff', () => {
    const numberOfPrimaryAgents = 1;
    const numberOfAgencyStaff = agencyStaff.length;
    const numberOfRealAgencyStaff = numberOfAgencyStaff - numberOfPrimaryAgents;

    cy.wait('@agencies');
    cy.wait('@agencyStaff');
    cy.wait('@primaryAgents');
    cy.get('hbx-staff-container').should(
      'have.length',
      numberOfRealAgencyStaff
    );
  });

  it('should return one result if an agent name is used for the search', () => {
    const [_primaryAgent, agencyStaffOne] = agencyStaff;
    getSearchBox().type(agencyStaffOne.first_name);
    getStaffList().should('have.length', 1);
    getSearchBox().clear();
    getStaffList().should('have.length', 5);
  });

  it('should show a helpful message if the search query returns no results', () => {
    getSearchBox().type('2345oi8uasdlfkjl23423');
    getStaffList().should('have.length', 0);
    cy.get('.no-results-container').should('exist');
  });

  it('should allow a staff role to be terminated', () => {
    cy.route('post', '**/terminate/**', {}).as('terminateRole');
    cy.get(
      '#staff-container-1 hbx-agency-association:first .association-state'
    ).contains('active');
    cy.get(
      '#staff-container-1 hbx-agency-association:first .state-and-action > .hbx-button'
    ).click();
    cy.get(
      '#staff-container-1 hbx-agency-association:first .state-and-action > .hbx-button.terminating'
    ).click();
    cy.wait('@terminateRole');
    cy.get(
      '#staff-container-1 hbx-agency-association:first .association-state'
    ).contains('terminated');
  });

  it('should revert a termination request if the server returns an error', () => {
    cy.route({
      method: 'post',
      url: '**/terminate/**',
      response: {},
      status: 500,
    }).as('terminateRole');

    cy.get(
      '#staff-container-1 hbx-agency-association:first .association-state'
    ).contains('active');
    cy.get(
      '#staff-container-1 hbx-agency-association:first .state-and-action > .hbx-button'
    ).click();
    cy.get(
      '#staff-container-1 hbx-agency-association:first .state-and-action > .hbx-button.terminating'
    ).click();
    cy.wait('@terminateRole');
    cy.get(
      '#staff-container-1 hbx-agency-association:first .association-state'
    ).contains('active');
  });

  it('should allow the user to cancel a termination request before confirmation', () => {
    cy.get(
      '#staff-container-1 hbx-agency-association:first .association-state'
    ).contains('active');
    cy.get(
      '#staff-container-1 hbx-agency-association:first .state-and-action > .hbx-button'
    ).click();
    cy.get(
      '#staff-container-1 hbx-agency-association:first .state-and-action > .hbx-button.text-only'
    ).click();
    cy.get(
      '#staff-container-1 hbx-agency-association:first .association-state'
    ).contains('active');
  });
});

describe('Agency Staff with delay', () => {
  const agencyProfileId = faker.random.uuid();
  const { agency, agencyStaff, primaryAgent } = mockAgencyWithStaff(
    agencyProfileId
  );

  const permissions: HbxPermissions = {
    view_agency_staff: true,
    manage_agency_staff: true,
  };

  beforeEach(() => {
    cy.server();
    cy.route('**/users/current', { ...user, ...permissions }).as('currentUser');
    cy.route({ url: '**/agencies', response: [agency], delay: 1000 }).as(
      'agencies'
    );
    cy.route('**/agencies/agency_staff', agencyStaff).as('agencyStaff');
    cy.route('**/agencies/primary_agency_staff', [primaryAgent]).as(
      'primaryAgents'
    );
    cy.visit('/agencies/agency-staff');
  });

  it('should show a loading indicator when the entities have not finished loading', () => {
    cy.get('hbx-agency-staff-skeleton').should('exist');
    cy.wait('@agencies');
    cy.get('hbx-agency-staff-skeleton').should('not.exist');
  });
});

describe('Agency Staff with a view-only user', () => {
  const agencyProfileId = faker.random.uuid();
  const { agency, agencyStaff, primaryAgent } = mockAgencyWithStaff(
    agencyProfileId
  );

  const permissions: HbxPermissions = {
    view_agency_staff: true,
    manage_agency_staff: false,
  };

  beforeEach(() => {
    cy.server();
    cy.route('**/users/current', { ...user, ...permissions }).as('currentUser');
    cy.route({ url: '**/agencies', response: [agency] }).as('agencies');
    cy.route('**/agencies/agency_staff', agencyStaff).as('agencyStaff');
    cy.route('**/agencies/primary_agency_staff', [primaryAgent]).as(
      'primaryAgents'
    );
    cy.visit('/agencies/agency-staff');
  });

  it('should not show the terminate button on staff roles that are active', () => {
    cy.wait('@agencies');
    cy.wait('@currentUser');

    cy.get('button.terminate-action').should('not.exist');
  });
});
