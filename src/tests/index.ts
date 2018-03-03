require('source-map-support').install();

import channel from './channel';
import channelsManager from './channels-manager';
import createLocalTransport from './create-local-transport';

describe('AncientSouls/Channels:', () => {
  channel();
  channelsManager();
  createLocalTransport();
});