import { assert } from 'chai';
import sinon from 'sinon';

import { Manager } from '../../lib/index';
import {
    channelLoopback,
    simpleManager,
    trueFunction,
    generatorString
} from '../simpleFunctions';

export default function () {
    describe('new():', () => {
        it('Returned class', () => {
            var name = 'Channel';
            var manager = simpleManager();
            var channel = manager.new(trueFunction);
            assert.equal(channel.constructor.name, name);
        });

        it('onConnected()', () => {
            var callback = sinon.spy();
            var manager = new Manager(callback, null, null);
            var channel = manager.new(null);
            channel.onConnected(channel);
            assert.isTrue(callback.calledWith(channel));
        });

        it('onDisconnected()', () => {
            var callback = sinon.spy();
            var manager = new Manager(null, callback, null);
            var channel = manager.new(null);
            channel.onDisconnected(channel);
            assert.isTrue(callback.calledWith(channel));
        });

        it('sendPackage()', () => {
            var text = generatorString();
            var callback = sinon.spy();
            var manager = simpleManager();
            var channel = manager.new(callback);
            channel.send(text);
            assert.isTrue(callback.called);
        });

        it('gotPackage()', () => {
            var text = generatorString();
            var callback = sinon.spy();
            var manager = new Manager(null, null, callback);
            var channel = manager.new(channelLoopback);
            channel.send(text);
            assert.isTrue(callback.alwaysCalledWith(channel, text));
        });
    });
}