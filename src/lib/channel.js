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
        var pkg = this._packData({ id: this.id, request: null, warning: message }, 'SYN');
        this.sendPackage(this, pkg);
    }

    /**
     * @protected
     * @param {Object} request - Data packet for authorization
     * @param {String} request.id - New channel id
     * @param {String} request.request - Public key of authorization
     * @param {String} request.warning - Information message
     * @description Change the status of the channel when connected.
     */
    connected(request) {
        request = request || {
            id: this._getIdentifier(),
            request: null,
            warning: 'Data is not received, random data is used.'
        };

        this.isConnected = true;
        this.id = request.id;

        if (this._isFunction(this.onConnected)) {
            this.onConnected(this, request.warning);
        }
    }

    /**
     * @protected
     * @param {String} message - Message for the remote side
     * @description Send a shutdown packet.
     */
    disconnect(message) {
        var pkg = this._packData({ id: this.id, request: null, warning: message }, 'RST');
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
            this.disconnected(pkg.data.warning);
        }
        else if (pkg.type == 'SYN') {
            this.connected(pkg.data);
        }
        else if (pkg.type == 'ACK') {
            this.gotPackage(this, {
                id: pkg.data.id,
                request: pkg.data.data,
                warning: pkg.data.warning
            });
        }
    }

    /**
     * @protected
     * @param {*} data - Submitted data
     * @description Generates and sends the packet.
     */
    send(data) {
        var pkg = this._packData({
            id: this.id,
            warning: null,
            data
        }, 'ACK');
        this.sendPackage(this, pkg);
    }

    /**
     * @protected
     * @returns {Object} Serializer class
     * @description Creates an instance of the serializer class.
     */
    _createSerializer() {
        return JSON;
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
        return this._serializer.stringify(data);
    }

    /**
     * @protected
     * @param {String} data
     * @returns {*} Source data
     * @description Deserializes the data.
     */
    _deserialization(data) {
        return this._serializer.parse(data);
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
