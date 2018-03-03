import { assert } from 'chai';
import * as sinon from 'sinon';

import {
  Channel,
} from '../lib/channel';

export default function () {
  describe('Channel:', () => {
    it(`connect / send / got / pack / unpack / disconnect`, () => {
      const c1 = new Channel();
      const c2 = new Channel();
      
      c1.on('send', ({ channel, pkg, msg }) => c2.got(msg));
      c2.on('send', ({ channel, pkg, msg }) => c1.got(msg));
      
      assert.isFalse(c1.isConnected);
      assert.isFalse(c2.isConnected);
      
      c1.connect();
      
      assert.isTrue(c1.isConnected);
      assert.isTrue(c2.isConnected);
      
      const c1Got = sinon.stub();
      c1.on('pack', ({ channel, pkg, msg }) => pkg.data += pkg.data);
      c2.on('got', ({ channel, pkg, msg }) => {
        c1Got();
        assert.equal(pkg.data, 246);
      });
      
      c1.send(123);
      assert.isTrue(c1Got.called);
      
      c2.disconnect();
      
      assert.isFalse(c1.isConnected);
      assert.isFalse(c2.isConnected);
    });
  });
}
