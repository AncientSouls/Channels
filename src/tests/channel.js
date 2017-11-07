import { assert } from 'chai';
import crypto from 'crypto';
import sinon from 'sinon';

import { Channel } from '../lib/index';

function sendPackage(pkg) {
    this.got(pkg);
}

function generatorString() {
    return crypto.randomBytes(20).toString('hex');
}

export default function () {
    describe('Channel:', () => {
        describe('Connect / Disconnect:', () => {
            var channel = null;

            beforeEach(() => {
                channel = new Channel(sinon.spy(), sinon.spy(), null, sendPackage);
            });

            it('connected()', () => {
                channel.connected();

                assert.isTrue(channel.onConnected.calledWithExactly(channel));
                assert.isTrue(channel.isConnected);
                assert.isNotNull(channel.id);
            });

            it('disconnected()', () => {
                channel.connected();
                channel.disconnected();

                assert.isTrue(channel.onDisconnected.calledWithExactly(channel));
                assert.isFalse(channel.isConnected);
            });

            it('connect(true)', () => {
                channel.connected = sinon.spy();
                channel.connect(true);

                assert.isString(channel.sharedKey);
                assert.isTrue(channel.connected.called);
            });

            it('connect(false)', () => {
                channel.connected = sinon.spy();
                channel.connect(false);

                assert.isNull(channel.sharedKey);
                assert.isTrue(channel.connected.called);
            });

            it('disconnect()', () => {
                channel.disconnected = sinon.spy();
                channel.disconnect();

                assert.isFalse(channel.isConnected);
                assert.isTrue(channel.disconnected.called);
            });
        });

        describe('Sending / Receiving:', () => {
            var channel = null;
            var pkg = null;

            beforeEach(() => {
                channel = new Channel(null, null, sinon.spy(), sendPackage);
                pkg = generatorString();
            });

            it('Loopback', () => {
                channel.send(pkg);
                assert.isTrue(channel.gotPackage.calledWithExactly(channel, pkg));
            });

            it('Send encrypted', () => {
                var original = channel._assemblePackage;

                sinon.stub(channel, '_assemblePackage').callsFake(original);
                channel.connect(true);
                channel.send(pkg);

                assert.isTrue(channel._assemblePackage.neverCalledWith(pkg));
            });

            it('Send unencrypted', () => {
                var original = channel._assemblePackage;

                sinon.stub(channel, '_assemblePackage').callsFake(original);
                channel.connect(false);
                channel.send(pkg);

                assert.isTrue(channel._assemblePackage.calledWithExactly(pkg));
            });
        });
    });
}