import { assert } from 'chai';
import sinon from 'sinon';

import { Channel } from '../../lib/index';
import {
    simpleChannel,
    generatorString,
    generatorInteger
} from '../simpleFunctions';

export default function () {
    describe('handlerIncomingPacket():', () => {
        describe('Exceptions:', () => {
            var channel = simpleChannel();

            it('Boolean', () => {
                assert.throw(() => channel.handlerIncomingPacket(false));
                assert.throw(() => channel.handlerIncomingPacket(true));
            });

            it('Null', () => {
                assert.throw(() => channel.handlerIncomingPacket(null));
            });

            it('Undefined', () => {
                assert.throw(() => channel.handlerIncomingPacket(undefined));
            });

            it('Number', () => {
                var number = generatorInteger();
                assert.throw(() => channel.handlerIncomingPacket(number));
            });

            it('String', () => {
                var text = generatorString();
                assert.throw(() => channel.handlerIncomingPacket(text));
            });

            it('Object', () => {
                assert.throw(() => channel.handlerIncomingPacket({}));
            });

            it('Function', () => {
                assert.throw(() => channel.handlerIncomingPacket(() => {}));
            });
        });

        it('gotPackage()', () => {
            var text = generatorString();
            var callback = sinon.spy();
            var channel = new Channel(null, null, callback, null);
            var request = channel._assemblePackage(text, null);
            channel.handlerIncomingPacket(request);
            assert.isTrue(callback.alwaysCalledWith(text, channel));
        });

        it('_registration()', () => {
            var channel = simpleChannel();
            channel.sendPackage = channel.handlerIncomingPacket;
            channel._registration = sinon.spy();
            channel.connect(false);
            assert.isTrue(channel._registration.called);
        });

        it('disconnected()', () => {
            var channel = simpleChannel();
            channel.disconnected = sinon.spy();
            channel.disconnect();
            assert.isTrue(channel.disconnected.called);
        });

        it('_handlerError()', () => {
            var text = generatorString();
            var channel = simpleChannel();
            channel._handlerError = sinon.spy();
            var request = channel._assemblePackage(text, 'error');
            channel.handlerIncomingPacket(request);
            assert.isTrue(channel._handlerError.calledWith(text));
        });
    });
}