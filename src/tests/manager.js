import { assert } from 'chai';
import sinon from 'sinon';

import { Manager } from '../lib/index';
import { simpleManager } from './simpleFunctions';

import newTest from './manager/new';
import channelConnected from './manager/channelConnected';
import channelDisconnected from './manager/channelDisconnected';

export default function () {
    describe('Class Manager:', () => {
        describe('Adapter registration:', () => {
            it('onConnected()', () => {
                var callback = sinon.spy();
                var manager = new Manager(callback, null, null);
                manager.onConnected();
                assert.isTrue(callback.called);
            });

            it('onDisconnected()', () => {
                var callback = sinon.spy();
                var manager = new Manager(null, callback, null);
                manager.onDisconnected();
                assert.isTrue(callback.called);
            });

            it('gotPackage()', () => {
                var callback = sinon.spy();
                var manager = new Manager(null, null, callback);
                manager.gotPackage();
                assert.isTrue(callback.called);
            });
        });

        describe('Function check:', () => {
            it('_isString()', () => {
                var manager = simpleManager();
                assert.isFalse(manager._isString(false));
                assert.isFalse(manager._isString(true));
                assert.isFalse(manager._isString(null));
                assert.isFalse(manager._isString(undefined));
                assert.isFalse(manager._isString(1234567890));
                assert.isTrue(manager._isString('Being alive right now is all that counts'));
                assert.isFalse(manager._isString({}));
                assert.isFalse(manager._isString(() => {}));
            });

            channelConnected();
            channelDisconnected();
            newTest();
        });
    });
}