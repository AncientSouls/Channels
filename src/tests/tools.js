import { assert } from 'chai';
import crypto from 'crypto';

import {
    Channel,
    connectLocalTransport,
    createLocalTransport
} from '../lib/index';

export default function () {
    describe('Tools:', () => {
        it('connectLocalTransport() / createLocalTransport()', (done) => {
            var pkg = { text: crypto.randomBytes(20).toString('hex') };

            var channel_1 = new Channel(
                function onConnected(channel) {},
                function onDisconnected(channel) {},
                function gotPackage(channel, data) {
                    assert.deepEqual(data, pkg);
                    done();
                },
                function sendPackage(channel, data) {}
            );

            var channel_2 = new Channel(
                function onConnected(channel) {},
                function onDisconnected(channel) {},
                function gotPackage(channel, data) {
                    channel.send(data);
                },
                function sendPackage(channel, data) {}
            );

            createLocalTransport(channel_1, channel_2);
            connectLocalTransport(channel_1, channel_2);
            channel_1.send(pkg);
        });
    });
}