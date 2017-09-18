/**
 * @class Manager
 * @memberof module:ancient-channels
 */
export default class Manager {
    /**
     * @constructs Manager
     * @param {Function} onConnected - Callback when a channel is connected
     * @param {Function} onDisconnected - Callback when the channel is disconnected
     * @param {Function} gotPackage - Callback when information is received
     */
    constructor(onConnected, onDisconnected, gotPackage) {
        /**
         * @type {Function}
         * @description Callback when a channel is connected
         */
        this.onConnected = onConnected;

        /**
         * @type {Function}
         * @description Callback when the channel is disconnected
         */
        this.onDisconnected = onDisconnected;

        /**
         * @type {Function}
         * @description Callback when information is received
         */
        this.gotPackage = gotPackage;

        /**
         * @protected
         * @type {Object}
         * @description Channel storage
         */
        this.channels = {};
    }

    /**
     * @protected
     * @param {Function} sendPackage - Function of sending data on transport
     * @description Create a new channel
     */
    new(sendPackage) {}

    /**
     * @protected
     * @param {Object} channel - Connected channel
     * @description Function for the adapter.
     * Used by the channel when establishing a connection.
     */
    channelConnected(channel) {}

    /**
     * @protected
     * @param {Object} channel - Broken channel
     * @description Function for the adapter.
     * Used by the channel when the connection is broken.
     */
    channelDisconnected(channel) {}

    /**
     * @protected
     * @param {String} data - Information received
     * @param {Object} channel - Channel class
     * @description Function for the adapter.
     * Used by the channel when receiving information.
     */
    channelGotPackage(data, channel) {}
}