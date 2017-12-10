import crypto from 'crypto';
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
         * @description Instances of the Cipher class.
         */
        this._cipher = null;

        /**
         * @protected
         * @type {Object}
         * @description Instances of the Decipher class.
         */
        this._decipher = null;

        /**
         * @protected
         * @type {Object}
         * @description An instance of ECDH class keys.
         */
        this._ecdh = this._generateBunchKeys();

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

        /**
         * @protected
         * @type {String}
         * @description Public key.
         */
        this.publicKey = this._generatePublicKey();

        /**
         * @protected
         * @type {String}
         * @description Authorization key.
         */
        this.sharedKey = null;
    }

    /**
     * @protected
     * @param {Boolean=} [authorization]
     * @description Connecting the channel.
     */
    connect(authorization = true) {
        authorization = !!authorization;

        var key = '';
        if (authorization) {
            key = this.publicKey;
        }

        var request = this._createPackage(key, 'SYN');
        this.sendPackage(this, request);
    }

    /**
     * @protected
     * @description Change the status of the channel when connected.
     */
    connected() {
        this.isConnected = true;
        this.id = this._generationUUID();
        if (this._isFunction(this.onConnected)) {
            this.onConnected(this);
        }
    }

    /**
     * @protected
     * @description Turn off the channel.
     */
    disconnect() {
        var request = this._createPackage('', 'RST');
        this.sendPackage(this, request);
        this.disconnected();
    }

    /**
     * @protected
     * @description Change the status of the channel when disconnected.
     */
    disconnected() {
        this.isConnected = false;
        if (this._isFunction(this.onDisconnected)) {
            this.onDisconnected(this);
        }
    }

    /**
     * @protected
     * @param {String} pkg - Received package
     * @description Processing incoming packets.
     */
    got(pkg) {
        if (!this._isString(pkg)) {
            throw new TypeError('\'pkg\' is not a string');
        }

        var type = pkg.slice(0, 3);
        var data = pkg.slice(3);

        /* Package end of communication */
        if (type == 'RST') {
            this.disconnected();
        }

        /* Authorization package */
        else if (type == 'SYN') {
            this._registration(data);
        }

        /* Package with data */
        else if (type == 'ACK') {
            data = this._decryption(data);
            data = this._deserialization(data);
            this.gotPackage(this, data);
        }
    }

    /**
     * @protected
     * @param {*} pkg - Submitted data
     * @description Generates and sends the packet.
     */
    send(data) {
        data = this._serialization(data);
        data = this._encryption(data);
        var pkg = this._createPackage(data);
        this.sendPackage(this, pkg);
    }

    /**
     * @protected
     * @param {String} sharedKey
     * @returns {String} Cipher class
     * @description Instances of the Cipher class are used to encrypt data.
     * https://nodejs.org/api/crypto.html#crypto_class_cipher
     */
    _createCipher(sharedKey) {
        return crypto.createCipher('aes192', sharedKey);
    }

    /**
     * @protected
     * @param {String} sharedKey
     * @returns {String} Decipher class
     * @description Instances of the Decipher class are used to decrypt data.
     * https://nodejs.org/api/crypto.html#crypto_class_decipher
     */
    _createDecipher(sharedKey) {
        return crypto.createDecipher('aes192', sharedKey);
    }

    /**
     * @protected
     * @param {String} data - Transmitted data
     * @param {String=} [type] - Type of package
     * @returns {String} Package for transfer
     * @description Generates the final packet for transmission.
     */
    _createPackage(data, type) {
        type = this._isString(type) ? type : 'ACK';
        return type.concat(data);
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
     * @param {String} data
     * @returns {String} Encrypted data
     * @description Encrypts the source data.
     */
    _encryption(data) {
        if (this._cipher && this.sharedKey) {
            data = this._cipher.update(data, 'utf8', 'hex');
            data += this._cipher.final('hex');
        }

        return data;
    }

    /**
     * @protected
     * @param {String} data
     * @returns {String} Source data
     * @description Decrypts the encrypted data.
     */
    _decryption(data) {
        if (this._decipher && this.sharedKey) {
            data = this._decipher.update(data, 'hex', 'utf8');
            data += this._decipher.final('utf8');
        }

        return data;
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
     * @returns {Object} ECDH instance
     * @description Utility for creating Elliptic Curve Diffie-Hellman (ECDH) key exchanges.
     * https://nodejs.org/api/crypto.html#crypto_class_diffiehellman
     */
    _generateBunchKeys() {
        return crypto.createECDH('secp256k1');
    }

    /**
     * @protected
     * @returns {String} Public key
     * @description Create a public key.
     */
    _generatePublicKey() {
        return this._ecdh.generateKeys('base64', 'compressed');
    }

    /**
     * @protected
     * @param {String} publicKey
     * @returns {String} Shared key
     * @description Create a shared key.
     */
    _generateSharedKey(publicKey) {
        return this._ecdh.computeSecret(publicKey, 'base64', 'base64');
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
     * @param {String} incomingKey
     * @description Register classes when connecting a channel.
     */
    _registration(incomingKey) {
        this.sharedKey = null;
        this._decipher = null;
        this._cipher = null;

        if (incomingKey) {
            this.sharedKey = this._generateSharedKey(incomingKey);
            this._decipher = this._createDecipher(this.sharedKey);
            this._cipher = this._createCipher(this.sharedKey);
        }

        this.connected();
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
