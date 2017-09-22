import { assert } from 'chai';
import sinon from 'sinon';

import {
    simpleChannel,
    generatorString
} from '../simpleFunctions';

export default function () {
    describe('_registration():', () => {
        it('Not a valid key', () => {
            var channel = simpleChannel();
            var key = generatorString();
            assert.throws(() => channel._registration(key));
        });

        it('A valid key', () => {
            var channel = simpleChannel();
            channel._registration(channel.publicKey);
            assert.isString(channel.sharedKey);
            assert.isObject(channel._decipher);
            assert.isObject(channel._cipher);
        });

        it('Unregister', () => {
            var channel = simpleChannel();
            channel._registration(channel.publicKey);
            channel._registration(null);
            assert.isNull(channel.sharedKey);
            assert.isNull(channel._decipher);
            assert.isNull(channel._cipher);
        });

        it('connected()', () => {
            var callback = sinon.spy();
            var channel = simpleChannel();
            channel.connected = callback;
            channel._registration(null);
            assert.isTrue(callback.called);
        });
    });
}