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
            channel._assemblePackage = sinon.spy();
            channel._registration(channel.publicKey);
            /* Checking */
            channel.send(text);
            assert.isTrue(channel._assemblePackage.neverCalledWith(text));
        });

        it('Off Encryption', () => {
            var text = generatorString();
            var channel = simpleChannel();
            channel._assemblePackage = sinon.spy();
            /* Checking */
            channel.send(text);
            assert.isTrue(channel._assemblePackage.calledWith(text));
        });

        it('All the way', () => {
            var text = generatorString();
            var callback = sinon.spy();
            var channel = new Channel(null, null, callback, channelLoopback);
            /* Checking */
            channel.send(text);
            assert.isTrue(callback.alwaysCalledWith(channel, text));
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
                channel = new Channel(null, null, null, channelLoopback);
                channel._registration = sinon.spy();
            });

            it('Boolean', () => {
                /* False */
                channel.connect(false);
                var args = channel._registration.args.pop();
                assert.isNull(args[0]);
                /* True */
                channel.connect(true);
                args = channel._registration.args.pop();
                assert.isString(args[0]);
            });

            it('Null', () => {
                channel.connect(null);
                var args = channel._registration.args.pop();
                assert.isNull(args[0]);
            });

            it('Undefined', () => {
                channel.connect(undefined);
                var args = channel._registration.args.pop();
                assert.isNull(args[0]);
            });

            it('Number', () => {
                var number = generatorInteger();
                channel.connect(number);
                var args = channel._registration.args.pop();
                assert.isString(args[0]);
            });

            it('String', () => {
                var text = generatorString();
                channel.connect(text);
                var args = channel._registration.args.pop();
                assert.isString(args[0]);
            });

            it('Object', () => {
                channel.connect({});
                var args = channel._registration.args.pop();
                assert.isString(args[0]);
            });

            it('Function', () => {
                channel.connect(() => {});
                var args = channel._registration.args.pop();
                assert.isString(args[0]);
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