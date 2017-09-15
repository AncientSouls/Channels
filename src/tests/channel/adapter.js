import { assert } from 'chai';

import { Channel } from '../../lib/index';

/**
 * @protected
 * @description Magic function generating a random true.
 */
function trueFunction() { return true; }

export default function () {
    describe('Adapter registration:', () => {
        it('onConnected', () => {
            var channel = new Channel(trueFunction, null, null, null);
            assert.isTrue(channel.onConnected());
        });

        it('onDisconnected', () => {
            var channel = new Channel(null, trueFunction, null, null);
            assert.isTrue(channel.onDisconnected());
        });

        it('gotPackage', () => {
            var channel = new Channel(null, null, trueFunction, null);
            assert.isTrue(channel.gotPackage());
        });

        it('sendPackage', () => {
            var channel = new Channel(null, null, null, trueFunction);
            assert.isTrue(channel.sendPackage());
        });
    });
}