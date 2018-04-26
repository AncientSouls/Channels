require('source-map-support').install();

import channel from './channel';
import createLocalTransport from './create-local-transport';

describe('AncientSouls/Channels:', () => {
  channel();
  createLocalTransport();
});
