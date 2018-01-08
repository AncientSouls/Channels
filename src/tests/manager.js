import { assert } from 'chai';

import { Channel, ChannelsManager } from '../lib/index';

export default function () {
    describe('Manager:', () => {
        it('onConnected()', (done) => {
            var channelsManager = new ChannelsManager(Channel,
                function onConnected(channel, message) {
                    assert.equal(channelsManager.channels[channel.id], channel);
                    done();
                },
                function onDisconnected(channel, message) {},
                function gotPackage(channel, pkg) {}
            );

            var channel = channelsManager.new(
                function sendPackage(channel, data) {
                    channel.got(data);
                }
            );

            channel.connect();
        });

        it('onDisconnected()', (done) => {
            var channelsManager = new ChannelsManager(Channel,
                function onConnected(channel, message) {
                    channel.disconnect();
                },
                function onDisconnected(channel, message) {
                    assert.isEmpty(channelsManager.channels);
                    done();
                },
                function gotPackage(channel, pkg) {}
            );

            var channel = channelsManager.new(
                function sendPackage(channel, data) {
                    channel.got(data);
                }
            );

            channel.connect();
        });
    });
}
