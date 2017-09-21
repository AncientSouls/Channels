import { assert } from 'chai';
import sinon from 'sinon';

import { simpleManager, simpleChannel } from '../simpleFunctions';
import { Manager } from '../../lib/index';

export default function () {
    describe('onConnected():', () => {
        describe('Storage:', () => {
            it('Addition', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager.onConnected(channel);
                assert.deepEqual(channel, manager.channels[channel.id]);
            });

            it('Duplication', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager.onConnected(channel);
                manager.onConnected(channel);
                assert.deepEqual(channel, manager.channels[channel.id]);
                assert.lengthOf(Object.keys(manager.channels), 1);
            });

            it('Exception', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager.channels = null;
                assert.throw(() => manager.onConnected(channel));
            });
        });

        describe('onConnected():', () => {
            it('Function call', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(callback, null, null);
                manager.onConnected(channel);
                assert.isTrue(callback.called);
            });

            it('Parameter transfer', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(callback, null, null);
                manager.onConnected(channel);
                assert.isTrue(callback.calledWith(channel));
            });
        });
    });
}