import PSON from 'pson';
import uuid from 'uuid';

/**
 * @class Channel
 * @memberof module:ancient-channels
 */
export default class Channel {
    /**
     * @constructs Channel
     * @param {Function} onConnected - Callback after connection
     * @param {Function} onDisconnected - Callback after disconnection
     * @param {Function} gotPackage - Callback when receiving a packet
     * @param {Function} sendPackage - Callback package sending
     */
    constructor(onConnected, onDisconnected, gotPackage, sendPackage) {
        /**
         * @type {Function}
         * @description Callback after connection.
         */
        this.onConnected = onConnected;

        /**
         * @type {Function}
         * @description Callback after disconnection.
         */
        this.onDisconnected = onDisconnected;

        /**
         * @type {Function}
         * @description Callback when receiving a packet.
         */
        this.gotPackage = gotPackage;

        /**
         * @type {Function}
         * @description Callback package sending.
         */
        this.sendPackage = sendPackage;

        /**
         * @protected
         * @type {Object}
         * @description An instance of the serializer class.
         */
        this._serializer = this._createSerializer();

        /**
         * @protected
         * @type {String}
         * @description Channel identifier.
         */
        this.id = null;

        /**
         * @protected
         * @type {Boolean}
         * @description Connection status.
         */
        this.isConnected = false;
    }

    /**
     * @protected
     * @param {String} message - Message for the remote side
     * @description Send the connection package.
     */
    connect(message) {
        this.id = this._getIdentifier();
        var pkg = this._packData(message, 'SYN');
        this.sendPackage(this, pkg);
    }

    /**
     * @protected
     * @param {String} message - Message from the remote side
     * @description Change the status of the channel when connected.
     */
    connected(message) {
        this.isConnected = true;
        this.id = this._getIdentifier();
        if (this._isFunction(this.onConnected)) {
            this.onConnected(this, message);
        }
    }

    /**
     * @protected
     * @param {String} message - Message for the remote side
     * @description Send a shutdown packet.
     */
    disconnect(message) {
        var pkg = this._packData(message, 'RST');
        this.sendPackage(this, pkg);
    }

    /**
     * @protected
     * @param {String} message - Message from the remote side
     * @description Change the status of the channel when disconnected.
     */
    disconnected(message) {
        this.isConnected = false;
        if (this._isFunction(this.onDisconnected)) {
            this.onDisconnected(this, message);
        }
    }

    /**
     * @protected
     * @param {String} request - Submitted data
     * @description Process the submitted data.
     */
    got(request) {
        if (!this._isString(request)) {
            throw new TypeError('\'request\' is not a string');
        }

        var pkg = this._unpackData(request);

        if (pkg.type == 'RST') {
            this.disconnected(pkg.data);
        }
        else if (pkg.type == 'SYN') {
            this.connected(pkg.data);
        }
        else if (pkg.type == 'ACK') {
            this.gotPackage(this, pkg.data);
        }
    }

    /**
     * @protected
     * @param {*} data - Submitted data
     * @description Generates and sends the packet.
     */
    send(data) {
        var pkg = this._packData(data, 'ACK');
        this.sendPackage(this, pkg);
    }

    /**
     * @protected
     * @returns {Object} Serializer class
     * @description Creates an instance of the serializer class.
     */
    _createSerializer() {
        var serialization = new PSON.StaticPair();
        return serialization;
    }

    /**
     * @protected
     * @returns {String} Identifier
     * @description Generates an identifier.
     */
    _generationUUID() {
        return uuid.v4();
    }

    /**
     * @protected
     * @returns {String} Identifier
     * @description Create a new one or return an existing identifier.
     */
    _getIdentifier() {
        var identifier = this._isString(this.id) ? this.id : this._generationUUID();
        return identifier;
    }

    /**
     * @protected
     * @param {*} data - Transmitted data
     * @param {String} type - Type of package
     * @returns {String} Package for transfer
     * @description Compresses the data from the request.
     */
    _packData(data, type) {
        type = this._isString(type) ? type : 'ACK';
        return this._serialization({ type, data });
    }

    /**
     * @protected
     * @param {String} request - Submitted data
     * @returns {Object} Source package
     * @description Decompresses the data from the request.
     */
    _unpackData(request) {
        return this._deserialization(request);
    }

    /**
     * @protected
     * @param {*} data
     * @returns {String} Compressed string
     * @description Serializes the data.
     */
    _serialization(data) {
        var result = this._serializer.encode(data);
        return result.toString('hex');
    }

    /**
     * @protected
     * @param {String} data
     * @returns {*} Source data
     * @description Deserializes the data.
     */
    _deserialization(data) {
        var buffer = Buffer.from(data, 'hex');
        return this._serializer.decode(buffer);
    }

    /**
     * @protected
     * @param {String} value
     * @returns {Boolean} Result of checking
     * @description Checks the type of the variable.
     */
    _isFunction(value) {
        return typeof value === 'function';
    }

    /**
     * @protected
     * @param {String} value
     * @returns {Boolean} Result of checking
     * @description Checks the type of the variable.
     */
    _isString(value) {
        return typeof value === 'string';
    }
}
