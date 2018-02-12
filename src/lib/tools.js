/**
 * @param {Object} channel_1 - Channel for synchronization
 * @param {Object} channel_2 - Channel for synchronization
 * @description Creates local transport between two channels.
 */
function createLocalTransport(channel_1, channel_2) {
    channel_1.sendPackage = function (channel, pkg) {
        channel_2.got(pkg);
    };

    channel_2.sendPackage = function (channel, pkg) {
        channel_1.got(pkg);
    };

    channel_1.connect();
    channel_2.connect();
}

export {
    createLocalTransport
};
