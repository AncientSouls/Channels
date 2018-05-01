import { assert } from 'chai';

import {
  Channel,
} from '../lib/channel';

import createLocalTransport from '../lib/create-local-transport';

export default function () {
  describe('Channel:', () => {
    it(`connect / connected / ready / get / got / disconnect / disconnected`, (done) => {
      const c1 = new Channel();
      const c2 = new Channel();

      const data = { num: 123 };
      
      const getter = () => data;
      c1.getter = c2.getter = getter;
      
      createLocalTransport(c1, c2);

      c1.on('get', ({ channel, data }) => data.num += data.num);
      c2.once('got', ({ channel, data }) => {
        assert.equal(data.num, 246);
        channel.ready();
      });

      c1.once('got', ({ channel, data }) => {
        assert.equal(data.num, 246);
        done();
      });

      c1.ready();
    });
    it(`Docs example`, async () => {
      const ch = new Channel();
      const data = { num: 123 };
      ch.getter = () => data;
      ch.on('get', ({ channel, data }) => data ? data.num += data.num : null);
      
      assert.equal(await ch.get(), undefined); // undefined
      ch.ready();
      assert.deepEqual(await ch.get(), { num: 246 }); // 246
    });
  });
}
