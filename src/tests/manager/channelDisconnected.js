import { assert } from 'chai';
import sinon from 'sinon';

import { Manager } from '../../lib/index';
import {
    simpleManager,
    simpleChannel,
    generatorString
} from '../simpleFunctions';

export default function () {
    describe('onDisconnected():', () => {
        describe('Storage:', () => {
            it('Removal', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager.onConnected(channel);
                manager.onDisconnected(channel);
                assert.lengthOf(Object.keys(manager.channels), 0);
            });

            it('No duplicate', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                var storage = { text: generatorString() };
                manager.channels = storage;
                manager.onDisconnected(channel);
                assert.deepEqual(storage, manager.channels);
                assert.lengthOf(Object.keys(manager.channels), 1);
            });

            it('Exception', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager.channels = null;
                assert.throw(() => manager.onDisconnected(channel));
            });
        });


        describe('onDisconnected():', () => {
            it('Function call', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(null, callback, null);
                manager.onDisconnected(channel);
                assert.isTrue(callback.called);
            });

            it('Parameter transfer', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(null, callback, null);
                manager.onDisconnected(channel);
                assert.isTrue(callback.calledWith(channel));
            });
        });
    });
}