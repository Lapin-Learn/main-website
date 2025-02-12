import LandingPage from "../pom/LandingPage";

describe("Landing Page", () => {
  const page = new LandingPage();

  beforeEach(() => {
    page.visit();
  });

  it("should have a start button", () => {
    page.getStartButton().should("exist");
  });
});
