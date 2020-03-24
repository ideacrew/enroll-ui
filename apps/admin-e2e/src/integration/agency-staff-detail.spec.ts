import * as faker from 'faker/locale/en_US';

import {
  mockAgencyWithStaff,
  mockOneFullAgencyStaff,
} from '@hbx/utils/testing';

describe('Agency Staff Detail Page', () => {
  const agencyProfileId = faker.random.uuid();
  const { agency, agencyStaff, primaryAgent } = mockAgencyWithStaff(
    agencyProfileId
  );

  const [primAgent, agent] = agencyStaff;

  const agentWithDetail = mockOneFullAgencyStaff(agent);
  const { first_name, last_name, _id } = agentWithDetail;

  beforeEach(() => {
    cy.server();
    cy.route('**/agencies', [agency]).as('agencies');
    cy.route('**/agencies/agency_staff', agencyStaff).as('agencyStaff');
    cy.route('**/agencies/primary_agency_staff', [primaryAgent]).as(
      'primaryAgents'
    );

    cy.route(`**/agencies/agency_staff/${_id}`, agentWithDetail).as(
      'agentDetail'
    );
    cy.visit(`/agencies/agency-staff/${_id}`);
  });

  xit('display a detailed view of the agent', () => {
    cy.wait('@agencies');
    cy.wait('@agencyStaff');
    cy.wait('@primaryAgents');
    cy.wait('@agentDetail');

    cy.contains(`${first_name} ${last_name}`);
  });

  xit('should allow for termination of staff role', () => {
    cy.route('post', '**/terminate/**', {}).as('terminateRole');

    cy.get(
      'hbx-agency-association:first .state-and-action > .hbx-button'
    ).click();

    cy.get(
      'hbx-agency-association:first .state-and-action > .hbx-button.terminating'
    ).click();

    cy.wait('@terminateRole');

    cy.get('hbx-agency-association:first .association-state').contains(
      'terminated'
    );

    cy.get('.change-history .status-changes').contains('terminated');
  });

  xit('should revert change on api fail', () => {
    cy.route({
      method: 'post',
      url: '**/terminate/**',
      response: {},
      status: 500,
    }).as('terminateRole');

    cy.get(
      'hbx-agency-association:first .state-and-action > .hbx-button'
    ).click();

    cy.get(
      'hbx-agency-association:first .state-and-action > .hbx-button.terminating'
    ).click();

    cy.wait('@terminateRole');

    cy.get(
      '.change-history .status-changes .association-state.terminated'
    ).should('not.exist');
  });

  xit('should allow for changing demographic information', () => {
    cy.route('PATCH', `**/${_id}`, { status: 'success' }).as(
      'changeDemographics'
    );

    cy.get('#edit-demographics-button').click();
    cy.get('#save-demographics-button').should('be.disabled');
    cy.get('#first-name').clear().type('Ted');
    cy.get('#last-name').clear().type('Crisp');
    cy.get('#dob-month').clear().type('10');
    cy.get('#dob-day').clear().type('9');
    cy.get('#dob-year').clear().type('1981');
    cy.get('#save-demographics-button').click();
    cy.wait('@changeDemographics');
    cy.get('#staff-name-heading').contains('Ted Crisp');
    cy.get('#staff-date-of-birth').contains('Oct 9, 1981');
  });

  it('should revert change when api fails', () => {
    cy.route({
      method: 'PATCH',
      url: `**/${_id}`,
      response: { status: 'success' },
      status: 409,
    }).as('changeDemographics');

    cy.get('#edit-demographics-button').click();
    cy.get('#first-name').clear().type('Ted');
    cy.get('#save-demographics-button').click();
    cy.wait('@changeDemographics');
    cy.get('#staff-name-heading').contains(`${first_name} ${last_name}`);
  });
});
