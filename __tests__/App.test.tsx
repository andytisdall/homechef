import { screen, render } from "../src/tests/test-utils";

import { AppContainer } from "../App";

test("not signed in", async () => {
  render(<AppContainer />);

  const header = screen.queryByText(/signed in as/i);

  expect(header).not.toBeOnTheScreen();
});
