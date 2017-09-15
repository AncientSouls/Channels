import { assert } from 'chai';

import { Channel } from '../../lib/index';

/**
 * @protected
 * @description Magic function generating a random true.
 */
function trueFunction() { return true; }

/**
 * @protected
 * @description Running the done function.
 */
function doneFunction() {
    if (global.done) global.done();
    return true;
}

export default function () {
    describe('Basic functions:', () => {
        it('isString', () => {
            var channel = new Channel(null, null, null, null);
            /* Correct result */
            assert.isTrue(channel._isString('string'));
            /* Incorrect result */
            assert.isFalse(channel._isString(undefined));
            assert.isFalse(channel._isString(123456));
            assert.isFalse(channel._isString(true));
            assert.isFalse(channel._isString(null));
            assert.isFalse(channel._isString({}));
        });

        it('GenerationUUID', () => {
            var regexp = RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', 'i');
            var channel = new Channel(null, null, null, null);
            assert.isString(channel._generationUUID());
            assert.match(channel._generationUUID(), regexp);
        });

        it('HandlerError', () => {
            var error = Math.random().toString(36).substring(7);
            var channel = new Channel(null, null, null, null);
            assert.throws(() => channel._handlerError(error), error);
        });
    });

    describe('Connected:', () => {
        it('Change of status', () => {
            var channel = new Channel(trueFunction, null, null, null);
            channel.connected();
            assert.isTrue(channel.isConnected);
            assert.isString(channel.id);
        });

        it('Call the adapter', (done) => {
            global.done = done;
            var channel = new Channel(doneFunction, null, null, null);
            channel.connected();
        });
    });

    describe('Disconnected:', () => {
        it('Change of status', () => {
            var channel = new Channel(null, trueFunction, null, null);
            channel.disconnected();
            assert.isFalse(channel.isConnected);
        });

        it('Call the adapter', (done) => {
            global.done = done;
            var channel = new Channel(null, doneFunction, null, null);
            channel.disconnected();
        });
    });

    describe('Authorization:', () => {
        it('Public key', () => {
            var channel = new Channel(null, null, null, null);
            assert.isString(channel._authorization());
        });

        it('Class registration', () => {
            var channel = new Channel(null, null, null, null);
            channel._authorization();
            assert.isObject(channel._ecdh);
        });

        it('Save the class', () => {
            var channel = new Channel(null, null, null, null);
            channel._ecdh = true;
            assert.throws(() => channel._authorization());
        });
    });

    describe('Registration:', () => {
        it('Without a key', () => {
            var channel = new Channel(trueFunction, null, null, null);
            channel._registration(null);

            assert.isFalse(channel.onAuthorization);
            assert.isNull(channel.sharedKey);
            assert.isNull(channel._decipher);
            assert.isNull(channel._cipher);
        });

        it('With the key', () => {
            var channel = new Channel(trueFunction, null, null, null);
            var key = channel._authorization();
            channel._registration(key);

            assert.isTrue(channel.onAuthorization);
            assert.isString(channel.sharedKey);
            assert.isObject(channel._decipher);
            assert.isObject(channel._cipher);
        });

        it('Invalid key', () => {
            var key = 'Change alone is eternal, perpetual, immortal.';
            var channel = new Channel(trueFunction, null, null, null);
            assert.throws(() => channel._registration(key));
        });

        it('Call \'connected()\'', (done) => {
            var channel = new Channel(trueFunction, null, null, null);
            channel.connected = done;
            channel._registration(null);
        });
    });

    describe('Encryption / Decryption:', () => {
        it('Without a key', () => {
            var channel = new Channel(trueFunction, null, null, null);
            var data = 'Cogita et visa';
            channel._registration(null);

            assert.equal(channel._encryption(data), data);
            assert.equal(channel._decryption(data), data);
        });

        it('With the key', () => {
            var channel = new Channel(trueFunction, null, null, null);
            var key = channel._authorization();
            var data = 'De facto';
            channel._registration(key);

            var encrypted = channel._encryption(data);
            var decrypted = channel._decryption(encrypted);

            assert.notEqual(encrypted, data);
            assert.equal(decrypted, data);
        });
    });

    describe('Assemble / Disassemble Package:', () => {
        it('Without type', () => {
            var data = 'I\'am looking for a human.';
            var channel = new Channel(null, null, null, null);

            var assembledRequest = channel._assemblePackage(data, null);
            var disassembledRequest = channel._disassemblePackage(assembledRequest);

            /* Checking the return values */
            assert.isString(assembledRequest);
            assert.isArray(disassembledRequest);

            /* Checking array received request */
            assert.equal(disassembledRequest[0], 'data');
            assert.equal(disassembledRequest[1], data);
        });

        it('With the type', () => {
            var data = 'Hey, Teacher, leave those kids alone!';
            var channel = new Channel(null, null, null, null);
            var type = 'brick';

            var assembledRequest = channel._assemblePackage(data, type);
            var disassembledRequest = channel._disassemblePackage(assembledRequest);

            /* Checking the return values */
            assert.isString(assembledRequest);
            assert.isArray(disassembledRequest);

            /* Checking array received request */
            assert.equal(disassembledRequest[0], type);
            assert.equal(disassembledRequest[1], data);
        });
    });
}