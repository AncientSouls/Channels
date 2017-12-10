import { assert } from 'chai';

import { Channel, ChannelsManager } from '../lib/index';

export default function () {
    describe('Manager:', () => {
        it('Channel connected', (done) => {
            var channelsManager = new ChannelsManager(
                Channel,
                function onConnected(channel) {
                    assert.equal(channelsManager.channels[channel.id], channel);
                    done();
                },
                function onDisconnected(channel) {},
                function gotPackage(channel, data) {}
            );

            var channel = channelsManager.new(
                function sendPackage(channel, pkg) {
                    channel.got(pkg);
                }
            );

            channel.connect(true);
        });

        it('Channel disconnected', (done) => {
            var channelsManager = new ChannelsManager(
                Channel,
                function onConnected(channel) {},
                function onDisconnected(channel) {
                    assert.isEmpty(channelsManager.channels);
                    done();
                },
                function gotPackage(channel, data) {}
            );

            var channel = channelsManager.new(
                function sendPackage(channel, pkg) {
                    channel.got(pkg);
                }
            );

            /* Synchronization of channels */
            channel.connect(true);

            /* Disable the channel */
            channel.disconnected();
        });
    });
}