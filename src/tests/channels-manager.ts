import 'mocha';
import { assert } from 'chai';

import {
  ChannelsManager,
} from '../lib/channels-manager';

export default function () {
  describe('ChannelsManager:', () => {
    it('connected() / disconnected()', () => {
      const manager = new ChannelsManager();
      manager.on('connected', ({ channel }) => {
        assert.equal(manager.nodes[channel.id], channel);
        assert.isTrue(channel.isConnected);
      });
      manager.on('disconnected', ({ channel }) => {
        assert.equal(manager.nodes[channel.id], channel);
      });

      const channel = manager.create();
      channel.on('send', ({ channel, msg }) => channel.got(msg));
      channel.connect();
      
      assert.isTrue(channel.isConnected);
      
      channel.disconnect();
      
      assert.isFalse(channel.isConnected);
    });
  });
}
