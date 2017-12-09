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
         * @type {Object}
         * @description Bunch of keys
         */
        this._ecdh = this._generateBunchKeys();

        /**
         * @protected
         * @type {Object}
         * @description Instances of the Cipher class
         */
        this._cipher = null;

        /**
         * @protected
         * @type {Object}
         * @description Instances of the Decipher class
         */
        this._decipher = null;

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
         * @type {String}
         * @description Public key
         */
        this.publicKey = this._generatePublicKey();
    }

    /**
     * @protected
     * @param {String} request - Request for processing
     * @description Processing incoming packets
     */
    got(request) {
        if (!this._isString(request)) {
            throw new TypeError('\'request\' is not a string');
        }

        var type = request.slice(0, 3);
        var data = request.slice(3);

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
            this.gotPackage(this, data);
        }
    }

    /**
     * @protected
     * @param {String} Submitted data
     * @description Generates and sends the packet
     */
    send(data) {
        if (!this._isString(data)) {
            throw new TypeError('\'data\' is not a string');
        }

        data = this._encryption(data);
        var request = this._createPackage(data);
        this.sendPackage(this, request);
    }

    /**
     * @protected
     * @description Changes the status of the channel
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
     * @description Changes the status of the channel
     */
    disconnected() {
        this.isConnected = false;
        if (this._isFunction(this.onDisconnected)) {
            this.onDisconnected(this);
        }
    }

    /**
     * @protected
     * @param {Boolean=} [authorization] - Switch authorization
     * @description Sends the authorization package
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
     * @description Sending a disconnect packet.
     * Also performs the closure of the communication channel.
     */
    disconnect() {
        var request = this._createPackage('', 'RST');
        this.sendPackage(this, request);
        this.disconnected();
    }

    /**
     * @protected
     * @returns {Object} Bunch of keys
     * @description Utility for creating Elliptic Curve Diffie-Hellman (ECDH) key exchanges.
     * https://nodejs.org/api/crypto.html#crypto_class_diffiehellman
     */
    _generateBunchKeys() {
        return crypto.createECDH('secp256k1');
    }

    /**
     * @protected
     * @returns {String} Public Key
     * @description Public Key Generator
     */
    _generatePublicKey() {
        return this._ecdh.generateKeys('base64', 'compressed');
    }

    /**
     * @protected
     * @param {String} publicKey
     * @returns {String} Shared Key
     * @description Shared Key Generator
     */
    _generateSharedKey(publicKey) {
        return this._ecdh.computeSecret(publicKey, 'base64', 'base64');
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
     * @param {String} incomingKey
     * @description Coordinates authorization data
     */
    _registration(incomingKey) {
        /* The key was not transferred */
        if (!incomingKey) {
            this.sharedKey = null;
            this._decipher = null;
            this._cipher = null;
        }

        /* The key has been transferred */
        else {
            this.sharedKey = this._generateSharedKey(incomingKey);
            this._decipher = this._createDecipher(this.sharedKey);
            this._cipher = this._createCipher(this.sharedKey);
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
    _createPackage(data, type) {
        type = this._isString(type) ? type : 'ACK';
        return type.concat(data);
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
     * @protected
     * @param {String} value - The variable to check
     * @returns {Boolean} Result of checking
     * @description Checks the type of the variable
     */
    _isString(value) {
        return typeof value === 'string';
    }

    /**
     * @protected
     * @param {String} value - The variable to check
     * @returns {Boolean} Result of checking
     * @description Checks the type of the variable
     */
    _isFunction(value) {
        return typeof value === 'function';
    }
}