import crypto from 'crypto';
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
         * @description Callback after connection
         */
        this.onConnected = onConnected;

        /**
         * @type {Function}
         * @description Callback after disconnection
         */
        this.onDisconnected = onDisconnected;

        /**
         * @type {Function}
         * @description Callback when receiving a packet
         */
        this.gotPackage = gotPackage;

        /**
         * @type {Function}
         * @description Callback package sending
         */
        this.sendPackage = sendPackage;

        /**
         * @protected
         * @type {Boolean}
         * @description Connection status
         */
        this.isConnected = false;

        /**
         * @protected
         * @type {String}
         * @description Channel identifier
         */
        this.id = null;

        /**
         * @protected
         * @type {String}
         * @description Authorization key
         */
        this.sharedKey = null;

        /**
         * @protected
         * @type {Object}
         * @description Utility for creating Elliptic Curve Diffie-Hellman (ECDH) key exchanges.
         * https://nodejs.org/api/crypto.html#crypto_class_diffiehellman
         */
        this._ecdh = null;

        /**
         * @protected
         * @type {Object}
         * @description Instances of the Cipher class are used to encrypt data.
         * https://nodejs.org/api/crypto.html#crypto_class_cipher
         */
        this._cipher = null;

        /**
         * @protected
         * @type {Object}
         * @description Instances of the Decipher class are used to decrypt data.
         * https://nodejs.org/api/crypto.html#crypto_class_decipher
         */
        this._decipher = null;
    }

    /**
     * @protected
     * @param {String} request - Request for processing
     * @description Processing incoming packets
     */
    handlerIncomingPacket(request) {
        if (!this._isString(request)) {
            throw new Error('');
        }

        request = this._disassemblePackage(request);

        /* Package with data */
        if (request[0] == 'data') {
            request[1] = this._decryption(request[1]);
            this.gotPackage(request[1], this);
        }

        /* Package end of communication */
        else if (request[0] == 'close') {
            this.disconnected();
        }

        /* Authorization package */
        else if (request[0] == 'connect') {
            this._registration(request[1]);
        }

        /* Exceptions in the work */
        else {
            this._handlerError(request[1]);
        }
    }

    /**
     * @protected
     * @param {String} Submitted data
     * @description Generates and sends the packet
     */
    send(data) {
        if (!this._isString(data)) {
            throw new Error('');
        }

        data = this._encryption(data);
        var request = this._assemblePackage(data);
        this.sendPackage(request);
    }

    /**
     * @protected
     * @description Changes the status of the channel
     */
    connected() {
        this.isConnected = true;
        this.id = this._generationUUID();
        this.onConnected(this);
    }

    /**
     * @protected
     * @description Changes the status of the channel
     */
    disconnected() {
        this.isConnected = false;
        this.onDisconnected(this);
    }

    /**
     * @protected
     * @param {Boolean=} [authorization] - Switch authorization
     * @description Sends the authorization package
     */
    connect(authorization) {
        authorization = !!authorization;

        var key = null;
        if (authorization) {
            key = this._authorization();
        }

        var request = this._assemblePackage(key, 'connect');
        this.sendPackage(request);
    }

    /**
     * @protected
     * @description Sending a disconnect packet.
     * Also performs the closure of the communication channel.
     */
    disconnect() {
        var request = this._assemblePackage(null, 'close');
        this.sendPackage(request);
        this.disconnected();
    }

    /**
     * @protected
     * @returns {String} Public key
     * @description Run the authorization process.
     * Generates keys and returns the public key.
     */
    _authorization() {
        if (!this._ecdh) {
            this._ecdh = crypto.createECDH('secp256k1');
        }

        return this._ecdh.generateKeys('base64', 'compressed');
    }

    /**
     * @protected
     * @param {String} incomingKey
     * @description Coordinates authorization data
     */
    _registration(incomingKey) {
        /* The key was not transferred */
        if (!this._isString(incomingKey)) {
            this.sharedKey = null;
            this._decipher = null;
            this._cipher = null;
        }

        /* The key has been transferred */
        else {
            this.sharedKey = this._ecdh.computeSecret(incomingKey, 'base64', 'base64');
            this._decipher = crypto.createDecipher('aes192', this.sharedKey);
            this._cipher = crypto.createCipher('aes192', this.sharedKey);
        }

        /* Complete the connection setup */
        this.connected();
    }

    /**
     * @protected
     * @param {String} data - Transmitted data
     * @param {String=} [type] - Type of package
     * @returns {String} The final package
     * @description Generates the final packet for transmission
     */
    _assemblePackage(data, type) {
        data = this._encryption(data);
        type = this._isString(type) ? type : 'data';
        var request = [type, data];
        return JSON.stringify(request);
    }

    /**
     * @protected
     * @param {String} request - Received request
     * @returns {Array} The final package
     * @description Parses the request, it returns the final package
     */
    _disassemblePackage(request) {
        return JSON.parse(request);
    }

    /**
     * @protected
     * @param {String} data - Source data
     * @returns {String} Encrypted data
     * @description Encrypts the source data
     */
    _encryption(data) {
        if (this._cipher && this.sharedKey) {
            var encrypted = this._cipher.update(data, 'utf8', 'hex');
            return encrypted += this._cipher.final('hex');
        }
        return data;
    }

    /**
     * @protected
     * @param {String} data - Encrypted data
     * @returns {String} Source data
     * @description Decrypts the encrypted data
     */
    _decryption(data) {
        if (this._decipher && this.sharedKey) {
            var decrypted = this._decipher.update(data, 'hex', 'utf8');
            return decrypted += this._decipher.final('utf8');
        }
        return data;
    }

    /**
     * @protected
     * @returns {String} UUID
     * @description Generates an identifier
     */
    _generationUUID() {
        return uuid.v4();
    }

    /**
     * @param {String} error - Error text
     * @description The error handler
     */
    _handlerError(error) {
        throw new Error(error);
    }

    /**
     * @protected
     * @param {String} value - The variable to check
     * @returns {Boolean} Result of checking
     * @description Checks the type of the variable
     */
    _isString(value) {
        return typeof value === 'string';
    }
}