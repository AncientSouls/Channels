import crypto from 'crypto';
import lodash from 'lodash';
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
     */
    constructor(onConnected, onDisconnected, gotPackage) {
        /* Checking the argument onConnected */
        if (!lodash.isFunction(onConnected)) {
            throw new Error('Variable \'onConnected\' is not a function.');
        }

        /* Checking the argument onDisconnected */
        if (!lodash.isFunction(onDisconnected)) {
            throw new Error('Variable \'onDisconnected\' is not a function.');
        }

        /* Checking the argument gotPackage */
        if (!lodash.isFunction(gotPackage)) {
            throw new Error('Variable \'gotPackage\' is not a function.');
        }

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
         * @protected
         * @type {Boolean}
         * @description Connection status
         */
        this.isConnected = false;

        /**
         * @protected
         * @type {Boolean}
         * @description Requirement authorization
         */
        this.isAuthorization = true;

        /**
         * @protected
         * @type {String}
         * @description Channel identifier
         */
        this.channelid = null;

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
        if (!lodash.isString(request)) {
            throw new Error('');
        }

        request = JSON.parse(request);

        /* Package with data */
        if (request[0] == 'data') {
            request[1] = this._decryption(request[1]);
            this.gotPackage(request[1]);
        }

        /* Package end of communication */
        else if (request[0] == 'close') {
            this.disconnected();
        }

        /* Authorization package */
        else if (request[0] == 'connection') {
            this._registration(request[1]);
        }

        /* Exceptions in the work */
        else {
            throw new Error(request[1]);
        }
    }

    /**
     * @param {String} request - Request for processing
     * @description Processing outgoing packets
     */
    handlerOutgoingPacket(request) {
        if (!lodash.isString(request)) {
            throw new Error('');
        }

        this.handlerIncomingPacket(request);
    }

    /**
     * @protected
     * @param {String}
     * @description
     */
    sendPackage(data) {
        if (!lodash.isString(data)) {
            throw new Error('');
        }

        data = this._encryption(data);
        var request = this._formationPackage(data);
        this.handlerOutgoingPacket(request);
    }

    /**
     * @protected
     * @description Changes the status of the channel
     */
    connected() {
        this.isConnected = true;
        this.channelid = this._generationUUID();
        this.onConnected(this.channelid);
    }

    /**
     * @protected
     * @description Changes the status of the channel
     */
    disconnected() {
        this.isConnected = false;
        this.onDisconnected(this.channelid);
    }

    /**
     * @protected
     * @description Sends the authorization package
     */
    connection() {
        var key = null;

        if (this.isAuthorization) {
            key = this._authorization();
        }

        var request = this._formationPackage(key, 'connection');
        this.handlerOutgoingPacket(request);
    }

    /**
     * @protected
     * @description Sending a disconnect packet.
     * Also performs the closure of the communication channel.
     */
    disconnection() {
        var request = this._formationPackage(null, 'close');
        this.handlerOutgoingPacket(request);
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
        if (!lodash.isString(incomingKey)) {
            this.isAuthorization = false;
            this.sharedKey = null;
            this._decipher = null;
            this._cipher = null;
        }

        /* The key has been transferred */
        else {
            this.sharedKey = this._ecdh.computeSecret(incomingKey, 'base64');
            this._decipher = crypto.createDecipher('aes192', this.sharedKey);
            this._cipher = crypto.createCipher('aes192', this.sharedKey);
            this.isAuthorization = true;
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
    _formationPackage(data, type) {
        data = this._encryption(data);
        type = type || 'data';
        var request = [type, data];
        return JSON.stringify(request);
    }

    /**
     * @protected
     * @param {String} data - Source data
     * @returns {String} Encrypted data
     * @description Encrypts the source data
     */
    _encryption(data) {
        if (this._cipher) {
            return this._cipher.update(data, 'utf8', 'hex');
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
        if (this._decipher) {
            return this._decipher.update(data, 'hex', 'utf8');
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
}