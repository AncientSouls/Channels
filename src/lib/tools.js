/**
 * @param {Object} channel_1 - Channel for activation
 * @param {Object} channel_2 - Channel for activation
 * @description Connects two channels connected by local transport.
 */
function connectLocalTransport(channel_1, channel_2) {
    channel_1.connected();
    channel_2.connected();
}

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
}

export {
    connectLocalTransport,
    createLocalTransport
};