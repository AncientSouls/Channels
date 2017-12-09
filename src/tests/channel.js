import { assert } from 'chai';
import crypto from 'crypto';

import { Channel } from '../lib/index';

export default function () {
    describe('Channel:', () => {
        describe('Connect / Disconnect:', () => {
            it('connect(true) / connected', (done) => {
                var channel = new Channel(
                    function onConnected(channel) {
                        assert.isTrue(channel.isConnected);
                        assert.isString(channel.sharedKey);
                        done();
                    },
                    function onDisconnected(channel) {},
                    function gotPackage(channel, data) {},
                    function sendPackage(channel, pkg) {
                        channel.got(pkg);
                    }
                );

                channel.connect(true);
            });

            it('connect(false) / connected', (done) => {
                var channel = new Channel(
                    function onConnected(channel) {
                        assert.isTrue(channel.isConnected);
                        assert.isNull(channel.sharedKey);
                        done();
                    },
                    function onDisconnected(channel) {},
                    function gotPackage(channel, data) {},
                    function sendPackage(channel, pkg) {
                        channel.got(pkg);
                    }
                );

                channel.connect(false);
            });

            it('disconnect() / disconnected', (done) => {
                var channel = new Channel(
                    function onConnected(channel) {},
                    function onDisconnected(channel) {
                        assert.isFalse(channel.isConnected);
                        done();
                    },
                    function gotPackage(channel, data) {},
                    function sendPackage(channel, pkg) {}
                );

                channel.disconnect();
            });
        });

        describe('Sending / Receiving:', () => {
            it('Send encrypted', (done) => {
                var pkg = {
                    text: crypto.randomBytes(20).toString('hex')
                };

                /* First channel */
                var channel_1 = new Channel(
                    function onConnected(channel) {},
                    function onDisconnected(channel) {},
                    function gotPackage(channel, data) {
                        assert.deepEqual(pkg, data);
                        done();
                    },
                    function sendPackage(channel, pkg) {
                        channel_2.got(pkg);
                    }
                );

                /* Second channel */
                var channel_2 = new Channel(
                    function onConnected(channel) {
                        channel.connect(true);
                    },
                    function onDisconnected(channel) {},
                    function gotPackage(channel, data) {
                        channel.send(data);
                    },
                    function sendPackage(channel, pkg) {
                        channel_1.got(pkg);
                    }
                );

                /* Coordinate the channels */
                channel_1.connect(true);

                /* Data transfer */
                channel_1.send(pkg);
            });

            it('Send unencrypted', (done) => {
                var pkg = {
                    text: crypto.randomBytes(20).toString('hex')
                };

                /* First channel */
                var channel_1 = new Channel(
                    function onConnected(channel) {},
                    function onDisconnected(channel) {},
                    function gotPackage(channel, data) {
                        assert.deepEqual(pkg, data);
                        done();
                    },
                    function sendPackage(channel, pkg) {
                        channel_2.got(pkg);
                    }
                );

                /* Second channel */
                var channel_2 = new Channel(
                    function onConnected(channel) {
                        channel.connect(false);
                    },
                    function onDisconnected(channel) {},
                    function gotPackage(channel, data) {
                        channel.send(data);
                    },
                    function sendPackage(channel, pkg) {
                        channel_1.got(pkg);
                    }
                );

                /* Coordinate the channels */
                channel_1.connect(false);

                /* Data transfer */
                channel_1.send(pkg);
            });
        });
    });
}