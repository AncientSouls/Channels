import { assert } from 'chai';

import {
    simpleChannel,
    generatorString,
    generatorInteger
} from '../simpleFunctions';

export default function () {
    describe('_assemblePackage() / _disassemblePackage():', () => {
        describe('Type received:', () => {
            it('Boolean', () => {
                var channel = simpleChannel();
                var result1 = channel._assemblePackage(null, true);
                var result2 = channel._assemblePackage(null, false);
                var request1 = channel._disassemblePackage(result1);
                var request2 = channel._disassemblePackage(result2);
                assert.equal(request1[0], 'data');
                assert.equal(request2[0], 'data');
            });

            it('Null', () => {
                var channel = simpleChannel();
                var result = channel._assemblePackage(null, null);
                var request = channel._disassemblePackage(result);
                assert.equal(request[0], 'data');
            });

            it('Undefined', () => {
                var channel = simpleChannel();
                var result = channel._assemblePackage(null, undefined);
                var request = channel._disassemblePackage(result);
                assert.equal(request[0], 'data');
            });

            it('Number', () => {
                var number = generatorInteger();
                var channel = simpleChannel();
                var result = channel._assemblePackage(null, number);
                var request = channel._disassemblePackage(result);
                assert.equal(request[0], 'data');
            });

            it('String', () => {
                var text = generatorString();
                var channel = simpleChannel();
                var result = channel._assemblePackage(null, text);
                var request = channel._disassemblePackage(result);
                assert.equal(request[0], text);
            });

            it('Object', () => {
                var channel = simpleChannel();
                var result = channel._assemblePackage(null, {});
                var request = channel._disassemblePackage(result);
                assert.equal(request[0], 'data');
            });

            it('Function', () => {
                var channel = simpleChannel();
                var result = channel._assemblePackage(null, () => {});
                var request = channel._disassemblePackage(result);
                assert.equal(request[0], 'data');
            });
        });

        describe('Information received:', () => {
            it('Boolean', () => {
                var channel = simpleChannel();
                var result1 = channel._assemblePackage(true, null);
                var result2 = channel._assemblePackage(false, null);
                var request1 = channel._disassemblePackage(result1);
                var request2 = channel._disassemblePackage(result2);
                assert.isTrue(request1[1]);
                assert.isFalse(request2[1]);
            });

            it('Null', () => {
                var channel = simpleChannel();
                var result = channel._assemblePackage(null, null);
                var request = channel._disassemblePackage(result);
                assert.isNull(request[1]);
            });

            it('Undefined', () => {
                var channel = simpleChannel();
                var result = channel._assemblePackage(undefined, null);
                var request = channel._disassemblePackage(result);
                assert.isNull(request[1]);
            });

            it('Number', () => {
                var number = generatorInteger();
                var channel = simpleChannel();
                var result = channel._assemblePackage(number, null);
                var request = channel._disassemblePackage(result);
                assert.equal(request[1], number);
            });

            it('String', () => {
                var text = generatorString();
                var channel = simpleChannel();
                var result = channel._assemblePackage(text, null);
                var request = channel._disassemblePackage(result);
                assert.equal(request[1], text);
            });

            it('Object', () => {
                var data = { text: generatorString() };
                var channel = simpleChannel();
                var result = channel._assemblePackage(data, null);
                var request = channel._disassemblePackage(result);
                assert.deepEqual(request[1], data);
            });

            it('Function', () => {
                var channel = simpleChannel();
                var result = channel._assemblePackage(() => {}, null);
                var request = channel._disassemblePackage(result);
                assert.isNull(request[1]);
            });
        });
    });
}