import { assert } from 'chai';
import sinon from 'sinon';

import {
    simpleChannel,
    generatorString
} from '../simpleFunctions';

export default function () {
    describe('_authorization():', () => {
        it('Class registration', () => {
            var channel = simpleChannel();
            channel._authorization();
            assert.isObject(channel._ecdh);
        });

        it('Class re-registration', () => {
            var channel = simpleChannel();
            channel._ecdh = generatorString();
            assert.throws(() => channel._authorization());
        });

        it('Getting the key', () => {
            var channel = simpleChannel();
            var key = channel._authorization();
            assert.isString(key);
        });
    });

    describe('_registration():', () => {
        it('A valid key', () => {
            var channel = simpleChannel();
            var key = channel._authorization();
            assert.doesNotThrow(() => channel._registration(key));
        });

        it('Not a valid key', () => {
            var channel = simpleChannel();
            var key = generatorString();
            assert.throws(() => channel._registration(key));
        });

        it('Key registration', () => {
            var channel = simpleChannel();
            var key = channel._authorization();
            channel._registration(key);
            assert.isString(channel.sharedKey);
            assert.isObject(channel._decipher);
            assert.isObject(channel._cipher);
        });

        it('Unregister', () => {
            var channel = simpleChannel();
            var key = channel._authorization();
            channel._registration(key);
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