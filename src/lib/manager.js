/**
 * @class Manager
 * @memberof module:ancient-channels
 */
export default class ChannelsManager {
    /**
     * @constructs Manager
     * @param {Object} Channel - Constructor for the channel
     * @param {Function} onConnected - Callback when a channel is connected
     * @param {Function} onDisconnected - Callback when the channel is disconnected
     * @param {Function} gotPackage - Callback when information is received
     */
    constructor(Channel, onConnected, onDisconnected, gotPackage) {
        /**
         * @protected
         * @type {Object} channel - Connected channel
         * @description Function for the adapter.
         * Used by the channel when establishing a connection.
         */
        this.onConnected = (channel) => {
            this.channels[channel.id] = channel;
            onConnected(channel);
        };

        /**
         * @protected
         * @type {Object} channel - Broken channel
         * @description Function for the adapter.
         * Used by the channel when the connection is broken.
         */
        this.onDisconnected = (channel) => {
            delete this.channels[channel.id];
            onDisconnected(channel);
        };

        /**
         * @protected
         * @type {Function}
         * @description Callback when information is received
         */
        this.gotPackage = gotPackage;

        /**
         * @protected
         * @type {Object}
         * @description Constructor for the channel.
         */
        this.Channel = Channel;

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
     * @return {Object} Assembled channel class
     * @description Create a new channel
     */
    new(sendPackage) {
        return new this.Channel(this.onConnected, this.onDisconnected, this.gotPackage, sendPackage);
    }
}