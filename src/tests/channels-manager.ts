import { assert } from 'chai';

import {
  ChannelsManager,
} from '../lib/channels-manager';

export default function () {
  describe('ChannelsManager:', () => {
    it('connected() / disconnected()', () => {
      const manager = new ChannelsManager();
      manager.list.on('connected', ({ channel }) => {
        assert.equal(manager.list.nodes[channel.id], channel);
        assert.isTrue(channel.isConnected);
      });
      manager.list.on('disconnected', ({ channel }) => {
        assert.equal(manager.list.nodes[channel.id], channel);
      });

      const channel = new manager.Node();
      manager.add(channel);

      channel.on('send', ({ channel, msg }) => channel.got(msg));
      channel.connect();
      
      assert.isTrue(channel.isConnected);
      
      channel.disconnect();
      
      assert.isFalse(channel.isConnected);
    });
  });
}
