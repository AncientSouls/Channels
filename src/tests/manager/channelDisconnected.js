import { assert } from 'chai';
import sinon from 'sinon';

import { simpleManager, simpleChannel } from '../simpleFunctions';
import { Manager } from '../../lib/index';

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
                    var manager = simpleManager();
                    assert.throws(() => manager._channelDisconnected(1234567890));
                });

                it('String', () => {
                    var manager = simpleManager();
                    var text = 'Silence Will Fall';
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
                var storage = { text: 'We\'re in a library!' };
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
                var spy = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(null, spy, null);
                manager._channelDisconnected(channel);
                assert.isTrue(spy.called);
            });

            it('Parameter transfer', () => {
                var spy = sinon.spy();
                var channel = simpleChannel();
                var manager = new Manager(null, spy, null);
                manager._channelDisconnected(channel);
                assert.isTrue(spy.calledWith(channel));
            });
        });
    });
}