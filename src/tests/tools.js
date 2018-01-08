import { assert } from 'chai';
import { randomBytes } from 'crypto';

import { Channel, createLocalTransport } from '../lib/index';

export default function () {
    describe('Tools:', () => {
        it('connectLocalTransport() / createLocalTransport()', (done) => {
            var data = { text: randomBytes(20).toString('hex') };

            var channel_1 = new Channel(
                function onConnected(channel) {},
                function onDisconnected(channel) {},
                function gotPackage(channel, pkg) {
                    assert.deepEqual(pkg, data);
                    done();
                },
                function sendPackage(channel, data) {}
            );

            var channel_2 = new Channel(
                function onConnected(channel) {},
                function onDisconnected(channel) {},
                function gotPackage(channel, pkg) {
                    channel.send(data);
                },
                function sendPackage(channel, data) {}
            );

            createLocalTransport(channel_1, channel_2);
            channel_1.send(data);
        });
    });
}
