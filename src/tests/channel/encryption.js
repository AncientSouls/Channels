import { assert } from 'chai';

import {
    simpleChannel,
    generatorString,
    generatorInteger
} from '../simpleFunctions';

export default function () {
    describe('_encryption():', () => {
        describe('Exceptions:', () => {
            var channel = null;

            beforeEach(() => {
                channel = simpleChannel();
                channel._registration(channel.publicKey);
            });

            it('Boolean', () => {
                assert.throw(() => channel._encryption(false));
                assert.throw(() => channel._encryption(true));
            });

            it('Null', () => {
                assert.throw(() => channel._encryption(null));
            });

            it('Undefined', () => {
                assert.throw(() => channel._encryption(undefined));
            });

            it('Number', () => {
                var number = generatorInteger();
                assert.throw(() => channel._encryption(number));
            });

            it('String', () => {
                var text = generatorString();
                assert.doesNotThrow(() => channel._encryption(text));
            });

            it('Object', () => {
                assert.throw(() => channel._encryption({}));
            });

            it('Function', () => {
                assert.throw(() => channel._encryption(() => {}));
            });
        });

        it('Missing key', () => {
            var text = generatorString();
            var channel = simpleChannel();
            assert.equal(channel._encryption(text), text);
        });

        it('Encryption', () => {
            var text = generatorString();
            var channel = simpleChannel();
            channel._registration(channel.publicKey);
            assert.notEqual(channel._encryption(text), text);
        });
    });

    describe('_decryption():', () => {
        describe('Exceptions:', () => {
            var channel = null;

            beforeEach(() => {
                channel = simpleChannel();
                channel._registration(channel.publicKey);
            });

            it('Boolean', () => {
                assert.throw(() => channel._decryption(false));
                assert.throw(() => channel._decryption(true));
            });

            it('Null', () => {
                assert.throw(() => channel._decryption(null));
            });

            it('Undefined', () => {
                assert.throw(() => channel._decryption(undefined));
            });

            it('Number', () => {
                var number = generatorInteger();
                assert.throw(() => channel._decryption(number));
            });

            it('String', () => {
                var text = generatorString();
                assert.throw(() => channel._decryption(text));
            });

            it('Object', () => {
                assert.throw(() => channel._decryption({}));
            });

            it('Function', () => {
                assert.throw(() => channel._decryption(() => {}));
            });
        });

        it('Missing key', () => {
            var text = generatorString();
            var channel = simpleChannel();
            assert.equal(channel._decryption(text), text);
        });

        it('Decryption', () => {
            var text = generatorString();
            var channel = simpleChannel();
            channel._registration(channel.publicKey);
            /* Encryption */
            var encrypted = channel._encryption(text);
            var decrypted = channel._decryption(encrypted);
            assert.notEqual(encrypted, text);
            assert.equal(decrypted, text);
        });
    });
}