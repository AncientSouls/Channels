import { assert } from 'chai';
import sinon from 'sinon';

import { Manager } from '../../lib/index';
import {
    simpleManager,
    simpleChannel,
    generatorString,
    generatorInteger
} from '../simpleFunctions';

export default function () {
    describe('_channelDisconnected():', () => {
        describe('Argument:', () => {
            it('Channel', () => {
                var manager = simpleManager();
                var channel = simpleChannel();
                assert.doesNotThrow(() => manager._channelDisconnected(channel));
            });

            describe('Exceptions:', () => {
                it('Boolean', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelDisconnected(false));
                    assert.throws(() => manager._channelDisconnected(true));
                });

                it('Null', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelDisconnected(null));
                });

                it('Undefined', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelDisconnected(undefined));
                });

                it('Number', () => {
                    var number = generatorInteger();
                    var manager = simpleManager();
                    assert.throws(() => manager._channelDisconnected(number));
                });

                it('String', () => {
                    var text = generatorString();
                    var manager = simpleManager();
                    assert.throws(() => manager._channelDisconnected(text));
                });

                it('Object', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelDisconnected({}));
                });

                it('Function', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelDisconnected(() => {}));
                });
            });
        });

        describe('Storage:', () => {
            it('Removal', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                /* Storage */
                manager._channelConnected(channel);
                var storage = manager.channels;
                /* Checking */
                manager._channelDisconnected(channel);
                assert.notEqual(storage, manager.channels);
                assert.lengthOf(manager.channels, 0);
            });

            it('No duplicate', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                /* Storage */
                var storage = { text: generatorString() };
                manager.channels = storage;
                /* Checking */
                manager._channelDisconnected(channel);
                assert.equal(storage, manager.channels);
                assert.lengthOf(manager.channels, 1);
            });

            it('Exception', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager.channels = null;
                assert.doesNotThrow(() => manager._channelDisconnected(channel));
            });
        });


        describe('onDisconnected():', () => {
            it('Function call', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(null, callback, null);
                manager._channelDisconnected(channel);
                assert.isTrue(callback.called);
            });

            it('Parameter transfer', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(null, callback, null);
                manager._channelDisconnected(channel);
                assert.isTrue(callback.calledWith(channel));
            });
        });
    });
}