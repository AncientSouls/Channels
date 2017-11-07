import { assert } from 'chai';
import crypto from 'crypto';
import sinon from 'sinon';

import { Channel, ChannelsManager } from '../lib/index';

function sendPackage(pkg) {
    this.got(pkg);
}

function generatorString() {
    return crypto.randomBytes(20).toString('hex');
}

export default function () {
    describe('Manager:', () => {
        /* Spies */
        var onDisconnected = null;
        var onConnected = null;

        /* Manager */
        var channelsManager = null;
        var channel = null;

        /* Usefulness */
        var pkg = null;

        beforeEach(() => {
            /* Creation of spies */
            onConnected = sinon.spy();
            onDisconnected = sinon.spy();

            /* Creating a manager */
            channelsManager = new ChannelsManager(Channel, onConnected, onDisconnected, sinon.spy());
            channel = channelsManager.new(sendPackage);

            /* Other usefulness */
            pkg = generatorString();
        });

        it('gotPackage()', () => {
            channel.send(pkg);

            assert.isTrue(channel.gotPackage.calledWith(channel, pkg));
            assert.isTrue(channelsManager.gotPackage.calledWithExactly(channel, pkg));
        });

        it('onConnected()', () => {
            channel.connect(true);

            assert.hasAnyKeys(channelsManager.channels, channel.id);
            assert.isTrue(onConnected.calledWithExactly(channel));
        });

        it('onDisconnected()', () => {
            channel.connect(true);
            channel.disconnect();

            assert.doesNotHaveAnyKeys(channelsManager.channels, channel.id);
            assert.isTrue(onDisconnected.calledWithExactly(channel));
        });
    });
}