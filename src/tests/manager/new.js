import { assert } from 'chai';
import sinon from 'sinon';

import { Manager } from '../../lib/index';
import {
    channelLoopback,
    simpleManager,
    trueFunction
} from '../simpleFunctions';

export default function () {
    describe('new():', () => {
        it('Returned class', () => {
            var name = 'Channel';
            var manager = simpleManager();
            var channel = manager(trueFunction);
            assert.equal(channel.constructor.name, name);
        });

        it('onConnected()', () => {
            var callback = sinon.spy();
            var manager = new Manager(callback, null, null);
            var channel = manager.new(null);
            /* Checking */
            channel.onConnected();
            assert.isTrue(callback.calledWith(channel));
        });

        it('onDisconnected()', () => {
            var callback = sinon.spy();
            var manager = new Manager(null, callback, null);
            var channel = manager.new(null);
            /* Checking */
            channel.onDisconnected();
            assert.isTrue(callback.calledWith(channel));
        });

        it('sendPackage()', () => {
            var text = 'Together, or not at all';
            var callback = sinon.spy();
            var manager = simpleManager();
            var channel = manager.new(callback);
            /* Checking */
            channel.send(text);
            assert.isTrue(callback.calledWith(text));
        });

        it('gotPackage()', () => {
            var text = 'Have a fantastic life';
            var callback = sinon.spy();
            var manager = new Manager(null, null, callback);
            var channel = manager.new(channelLoopback);
            /* Checking */
            channel.send(text);
            assert.isTrue(callback.calledWith(channel, text));
        });
    });
}