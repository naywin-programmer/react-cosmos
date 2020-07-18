import { waitFor } from '@testing-library/dom';
import { loadPlugins, resetPlugins } from 'react-plugin';
import { mockRendererReady } from '../../testHelpers';
import {
  mockRouter,
  mockNotifications,
} from '../../../../testHelpers/pluginMocks';

beforeEach(() => jest.isolateModules(() => require('../..')));

afterEach(resetPlugins);

function registerTestPlugins() {
  mockRouter({
    getSelectedFixtureId: () => null,
  });
}

it('notifies renderer connection', async () => {
  registerTestPlugins();
  const { pushTimedNotification } = mockNotifications();

  loadPlugins();
  mockRendererReady('mockRendererId1', {});

  await waitFor(() =>
    expect(pushTimedNotification).toBeCalledWith(expect.any(Object), {
      id: 'renderer-connect-mockRendererId1',
      type: 'info',
      title: 'Renderer connected',
      info: 'Your fixtures are ready to use.',
    })
  );
});
