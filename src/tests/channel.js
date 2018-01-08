import { assert } from 'chai';
import { randomBytes } from 'crypto';

import { Channel } from '../lib/index';

export default function () {
    describe('Channel:', () => {
        it('connect() / connected()', (done) => {
            var channel = new Channel(
                function onConnected(channel) {
                    assert.isTrue(channel.isConnected);
                    assert.isString(channel.id);
                    done();
                },
                function onDisconnected(channel, message) {},
                function gotPackage(channel, pkg) {},
                function sendPackage(channel, data) {
                    channel.got(data);
                }
            );

            channel.connect();
        });

        it('disconnect() / disconnected()', (done) => {
            var channel = new Channel(
                function onConnected(channel) {
                    channel.disconnect();
                },
                function onDisconnected(channel, message) {
                    assert.isFalse(channel.isConnected);
                    assert.isString(channel.id);
                    done();
                },
                function gotPackage(channel, pkg) {},
                function sendPackage(channel, data) {
                    channel.got(data);
                }
            );

            channel.connect();
        });

        it('send() / got()', (done) => {
            var data = { text: randomBytes(20).toString('hex') };

            var channel_1 = new Channel(
                function onConnected(channel) {
                    channel.send(data);
                },
                function onDisconnected(channel, message) {},
                function gotPackage(channel, pkg) {
                    assert.deepEqual(pkg, data);
                    done();
                },
                function sendPackage(channel, data) {
                    channel_2.got(data);
                }
            );

            var channel_2 = new Channel(
                function onConnected(channel) {
                    channel.connect();
                },
                function onDisconnected(channel, message) {},
                function gotPackage(channel, pkg) {
                    channel.send(pkg);
                },
                function sendPackage(channel, data) {
                    channel_1.got(data);
                }
            );

            channel_1.connect();
        });
    });
}
