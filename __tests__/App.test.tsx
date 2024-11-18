import {screen, render} from '../src/tests/test-utils';

import {AppContainer} from '../App';

test('App Renders', async () => {
  render(<AppContainer />);

  const header = await screen.findByText(/home chef app/i);

  expect(header).toBeOnTheScreen();
});
