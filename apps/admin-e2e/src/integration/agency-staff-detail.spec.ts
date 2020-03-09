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

  it('display a complete list of agency staff', () => {
    cy.wait('@agencies');
    cy.wait('@agencyStaff');
    cy.wait('@primaryAgents');
    cy.wait('@agentDetail');

    cy.contains(`${first_name} ${last_name}`);
  });
});
