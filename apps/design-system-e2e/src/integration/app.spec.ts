import { getGreeting } from '../support/app.po';

describe('design-system', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.contains('hbx-heading-xl');
  });
});
