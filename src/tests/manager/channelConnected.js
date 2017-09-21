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
    describe('_channelConnected():', () => {
        describe('Argument:', () => {
            it('Channel', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                assert.doesNotThrow(() => manager._channelConnected(channel));
            });

            describe('Exceptions:', () => {
                it('Boolean', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelConnected(false));
                    assert.throws(() => manager._channelConnected(true));
                });

                it('Null', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelConnected(null));
                });

                it('Undefined', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelConnected(undefined));
                });

                it('Number', () => {
                    var number = generatorInteger();
                    var manager = simpleManager();
                    assert.throws(() => manager._channelConnected(number));
                });

                it('String', () => {
                    var text = generatorString();
                    var manager = simpleManager();
                    assert.throws(() => manager._channelConnected(text));
                });

                it('Object', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelConnected({}));
                });

                it('Function', () => {
                    var manager = simpleManager();
                    assert.throws(() => manager._channelConnected(() => {}));
                });
            });
        });

        describe('Storage:', () => {
            it('Addition', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager._channelConnected(channel);
                assert.equal(channel.id, manager.channels[channel.id]);
            });

            it('Duplication', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager._channelConnected(channel);
                manager._channelConnected(channel);
                assert.equal(channel, manager.channels[channel.id]);
                assert.lengthOf(manager.channels, 1);
            });

            it('Exception', () => {
                var channel = simpleChannel();
                var manager = simpleManager();
                manager.channels = null;
                assert.doesNotThrow(() => manager._channelConnected(channel));
            });
        });

        describe('onConnected():', () => {
            it('Function call', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(callback, null, null);
                manager._channelConnected(channel);
                assert.isTrue(callback.called);
            });

            it('Parameter transfer', () => {
                var callback = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(callback, null, null);
                manager._channelConnected(channel);
                assert.isTrue(callback.calledWith(channel));
            });
        });
    });
}