import { assert } from 'chai';
import sinon from 'sinon';

import { simpleChannel, generatorString, generatorInteger } from './simpleFunctions';
import { Channel } from '../lib/index';

import sendTest from './channel/send';
import encryption from './channel/encryption';
import registration from './channel/registration';
import assemblePackage from './channel/assemblePackage';
import handlerIncomingPacket from './channel/handlerIncomingPacket';

export default function () {
    describe('Class Channel:', () => {
        describe('Adapter registration:', () => {
            it('onConnected()', () => {
                var callback = sinon.spy();
                var channel = new Channel(callback, null, null, null);
                channel.onConnected();
                assert.isTrue(callback.called);
            });

            it('onDisconnected()', () => {
                var callback = sinon.spy();
                var channel = new Channel(null, callback, null, null);
                channel.onDisconnected();
                assert.isTrue(callback.called);
            });

            it('gotPackage()', () => {
                var callback = sinon.spy();
                var channel = new Channel(null, null, callback, null);
                channel.gotPackage();
                assert.isTrue(callback.called);
            });

            it('sendPackage()', () => {
                var callback = sinon.spy();
                var channel = new Channel(null, null, null, callback);
                channel.sendPackage();
                assert.isTrue(callback.called);
            });
        });

        describe('Function check:', () => {
            describe('connected():', () => {
                it('Change of status', () => {
                    var channel = simpleChannel();
                    assert.isTrue(channel.isConnected);
                    assert.isString(channel.id);
                });

                it('onConnected()', () => {
                    var callback = sinon.spy();
                    var channel = new Channel(callback, null, null, null);
                    channel.connected();
                    assert.isTrue(callback.calledWith(channel));
                });
            });

            describe('disconnected():', () => {
                it('Change of status', () => {
                    var channel = simpleChannel();
                    channel.disconnected();
                    assert.isFalse(channel.isConnected);
                });

                it('onDisconnected()', () => {
                    var callback = sinon.spy();
                    var channel = new Channel(null, callback, null, null);
                    channel.disconnected();
                    assert.isTrue(callback.calledWith(channel));
                });
            });

            /* Functions assigned */
            registration();
            encryption();
            assemblePackage();
            handlerIncomingPacket();
            sendTest();

            it('_isString()', () => {
                var channel = simpleChannel();
                assert.isFalse(channel._isString(false));
                assert.isFalse(channel._isString(true));
                assert.isFalse(channel._isString(null));
                assert.isFalse(channel._isString(undefined));
                assert.isFalse(channel._isString(generatorInteger()));
                assert.isTrue(channel._isString(generatorString()));
                assert.isFalse(channel._isString({}));
                assert.isFalse(channel._isString(() => {}));
            });

            it('_isFunction()', () => {
                var channel = simpleChannel();
                assert.isFalse(channel._isFunction(false));
                assert.isFalse(channel._isFunction(true));
                assert.isFalse(channel._isFunction(null));
                assert.isFalse(channel._isFunction(undefined));
                assert.isFalse(channel._isFunction(generatorInteger()));
                assert.isFalse(channel._isFunction(generatorString()));
                assert.isFalse(channel._isFunction({}));
                assert.isTrue(channel._isFunction(() => {}));
            });

            it('_generationUUID()', () => {
                var regexp = RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', 'i');
                var channel = simpleChannel();
                assert.isString(channel._generationUUID());
                assert.match(channel._generationUUID(), regexp);
            });

            it('_handlerError()', () => {
                var error = generatorString();
                var channel = simpleChannel();
                assert.throws(() => channel._handlerError(error), error);
            });
        });
    });
}