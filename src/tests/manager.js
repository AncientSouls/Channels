import { assert } from 'chai';
import sinon from 'sinon';

import { Manager } from '../lib/index';
import { simpleChannel, simpleManager } from './simpleFunctions';

import newTest from './manager/new';
import channelConnected from './manager/channelConnected';
import channelDisconnected from './manager/channelDisconnected';

export default function () {
    describe('Class Manager:', () => {
        describe('Adapter registration:', () => {
            it('onConnected()', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(callback, null, null);
                manager.onConnected(channel);
                assert.isTrue(callback.called);
            });

            it('onDisconnected()', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(null, callback, null);
                manager.onDisconnected(channel);
                assert.isTrue(callback.called);
            });

            it('gotPackage()', () => {
                var callback = sinon.spy();
                var manager = new Manager(null, null, callback);
                manager.gotPackage(null, null);
                assert.isTrue(callback.called);
            });
        });

        describe('Function check:', () => {
            channelConnected();
            channelDisconnected();
            newTest();
        });
    });
}