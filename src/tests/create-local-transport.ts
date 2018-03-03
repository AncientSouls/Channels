import { assert } from 'chai';

import {
  Channel,
} from '../lib/channel';
import createLocalTransport from '../lib/create-local-transport';

export default function () {
  it('createLocalTransport()', (done) => {
    const data = { text: 'test' };

    const channel1 = new Channel();
    channel1.emitter.on('got', ({ channel, pkg }) => {
      assert.deepEqual(pkg.data, data);
      done();
    });

    const channel2 = new Channel();
    channel2.emitter.on('got', ({ channel, pkg }) => {
      channel.send(data);
    });

    createLocalTransport(channel1, channel2);
    channel1.send(data);
  });
}
