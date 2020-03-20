import * as faker from 'faker/locale/en_US';

import {
  mockAgencyWithStaff,
  mockOneFullAgencyStaff,
} from '@hbx/utils/testing';

describe('Agency Staff', () => {
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

  it('display a detailed view of the agent', () => {
    cy.wait('@agencies');
    cy.wait('@agencyStaff');
    cy.wait('@primaryAgents');
    cy.wait('@agentDetail');

    cy.contains(`${first_name} ${last_name}`);
  });

  it('should allow for termination of staff role', () => {
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

  it('should revert change on api fail', () => {
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
    ).should('exist');
  });
});
