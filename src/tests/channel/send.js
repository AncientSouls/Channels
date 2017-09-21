import { assert } from 'chai';
import sinon from 'sinon';

import { Channel } from '../../lib/index';
import {
    simpleChannel,
    generatorString,
    generatorInteger,
    channelLoopback
} from '../simpleFunctions';

export default function () {
    describe('send():', () => {
        describe('Exceptions:', () => {
            var channel = simpleChannel();

            it('Boolean', () => {
                assert.throw(() => channel.send(false));
                assert.throw(() => channel.send(true));
            });

            it('Null', () => {
                assert.throw(() => channel.send(null));
            });

            it('Undefined', () => {
                assert.throw(() => channel.send(undefined));
            });

            it('Number', () => {
                var number = generatorInteger();
                assert.throw(() => channel.send(number));
            });

            it('String', () => {
                var text = generatorString();
                assert.doesNotThrow(() => channel.send(text));
            });

            it('Object', () => {
                assert.throw(() => channel.send({}));
            });

            it('Function', () => {
                assert.throw(() => channel.send(() => {}));
            });
        });

        it('On Encryption', () => {
            var text = generatorString();
            var channel = simpleChannel();
            var key = channel._authorization();
            channel._assemblePackage = sinon.spy();
            channel._registration(key);
            channel.send(text);
            assert.isTrue(channel._assemblePackage.neverCalledWith(text));
        });

        it('Off Encryption', () => {
            var text = generatorString();
            var channel = simpleChannel();
            channel._assemblePackage = sinon.spy();
            channel.send(text);
            assert.isTrue(channel._assemblePackage.calledWith(text));
        });

        it('All the way', () => {
            var text = generatorString();
            var callback = sinon.spy();
            var channel = new Channel(null, null, callback, channelLoopback);
            channel.send(text);
            assert.isTrue(callback.calledWith(text));
        });
    });

    describe('disconnect():', () => {
        it('Change of status', () => {
            var channel = simpleChannel();
            channel.disconnected = sinon.spy();
            channel.disconnect();
            assert.isTrue(channel.disconnected.called);
        });

        it('Sending a package', () => {
            var channel = new Channel(null, null, null, channelLoopback);
            channel.disconnected = sinon.spy();
            channel.disconnect();
            assert.isTrue(channel.disconnected.calledTwice);
        });
    });

    describe('connect():', () => {
        describe('Exceptions:', () => {
            var channel = null;

            beforeEach(() => {
                channel = simpleChannel();
                channel._authorization = sinon.spy();
            });

            it('Boolean', () => {
                channel.connect(false);
                assert.isFalse(channel._authorization.called);
                channel.connect(true);
                assert.isTrue(channel._authorization.called);
            });

            it('Null', () => {
                channel.connect(null);
                assert.isFalse(channel._authorization.called);
            });

            it('Undefined', () => {
                channel.connect(undefined);
                assert.isFalse(channel._authorization.called);
            });

            it('Number', () => {
                var number = generatorInteger();
                channel.connect(number);
                assert.isTrue(channel._authorization.called);
            });

            it('String', () => {
                var text = generatorString();
                channel.connect(text);
                assert.isTrue(channel._authorization.called);
            });

            it('Object', () => {
                channel.connect({});
                assert.isTrue(channel._authorization.called);
            });

            it('Function', () => {
                channel.connect(() => {});
                assert.isTrue(channel._authorization.called);
            });
        });

        it('Key', () => {
            var channel = new Channel(null, null, null, channelLoopback);
            channel._registration = sinon.spy();
            channel.connect(true);
            assert.isString(channel._registration.args[0][0]);
        });

        it('No key', () => {
            var channel = new Channel(null, null, null, channelLoopback);
            channel._registration = sinon.spy();
            channel.connect(false);
            assert.isNull(channel._registration.args[0][0]);
        });
    });
}