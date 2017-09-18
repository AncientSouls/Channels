import { assert } from 'chai';
import sinon from 'sinon';

import { Manager, Channel } from '../../lib/index';

/**
 * @protected
 * @description Magic function generating a random true.
 */
function trueFunction() { return true; }

export default function () {
    describe('channelConnected():', () => {
        describe('Argument:', () => {
            it('Channel', () => {
                /* Create a channel */
                var channel = new Channel(trueFunction, null, null, null);
                channel.connected();
                /* Creating a manager */
                var manager = new Manager(trueFunction, null, null);
                /* Checking */
                assert.doesNotThrow(() => manager.channelConnected(channel));
            });

            describe('Exceptions:', () => {
                it('Boolean', () => {
                    var manager = new Manager(trueFunction, null, null);
                    assert.throws(() => manager.channelConnected(false));
                    assert.throws(() => manager.channelConnected(true));
                });

                it('Null', () => {
                    var manager = new Manager(trueFunction, null, null);
                    assert.throws(() => manager.channelConnected(null));
                });

                it('Undefined', () => {
                    var manager = new Manager(trueFunction, null, null);
                    assert.throws(() => manager.channelConnected(undefined));
                });

                it('Number', () => {
                    var manager = new Manager(trueFunction, null, null);
                    assert.throws(() => manager.channelConnected(1234567890));
                });

                it('String', () => {
                    var text = 'Trust Your Doctor';
                    var manager = new Manager(trueFunction, null, null);
                    assert.throws(() => manager.channelConnected(text));
                });

                it('Object', () => {
                    var manager = new Manager(trueFunction, null, null);
                    assert.throws(() => manager.channelConnected({}));
                });

                it('Function', () => {
                    var manager = new Manager(trueFunction, null, null);
                    assert.throws(() => manager.channelConnected(() => {}));
                });
            });
        });

        describe('Storage:', () => {
            it('Addition', () => {
                /* Create a channel */
                var channel = new Channel(trueFunction, null, null, null);
                channel.connected();
                /* Creating a manager */
                var manager = new Manager(trueFunction, null, null);
                manager.channelConnected(channel);
                /* Checking */
                assert.equal(channel.id, manager.channels[channel.id]);
            });

            it('Duplication', () => {
                var fake = { test: 'A change is going to come...' };
                /* Create a channel */
                var channel = new Channel(trueFunction, null, null, null);
                channel.connected();
                /* Creating a manager */
                var manager = new Manager(trueFunction, null, null);
                manager.channels[channel.id] = fake;
                manager.channelConnected(channel);
                /* Checking */
                assert.notEqual(fake, manager.channels[channel.id]);
                assert.lengthOf(manager.channels, 1);
            });

            it('Exception', () => {
                /* Create a channel */
                var channel = new Channel(trueFunction, null, null, null);
                channel.connected();
                /* Creating a manager */
                var manager = new Manager(trueFunction, null, null);
                manager.channels = null;
                /* Checking */
                assert.throws(() => manager.channelConnected(channel));
            });
        });

        describe('onConnected():', () => {
            it('Function call', () => {
                /* Create a channel */
                var channel = new Channel(trueFunction, null, null, null);
                channel.connected();
                /* Creating a manager */
                var spy = sinon.spy();
                var manager = new Manager(spy, null, null);
                manager.channelConnected(channel);
                /* Checking */
                assert.isTrue(spy.called);
            });

            it('Parameter transfer', () => {
                /* Create a channel */
                var channel = new Channel(trueFunction, null, null, null);
                channel.connected();
                /* Creating a manager */
                var spy = sinon.spy();
                var manager = new Manager(spy, null, null);
                manager.channelConnected(channel);
                /* Checking */
                assert.isTrue(spy.calledWith(channel));
            });
        });
    });
}