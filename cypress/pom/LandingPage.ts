export default class LandingPage {
  visit() {
    cy.visit("/");
  }

  getStartButton() {
    return cy.get("button").contains("Start");
  }
}
