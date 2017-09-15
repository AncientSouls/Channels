import { assert } from 'chai';

import { Channel } from '../../lib/index';

/**
 * @protected
 * @description Running the done function.
 */
function doneFunction() {
    if (global.done) global.done();
    return true;
}

/**
 * @protected
 * @description Sends a request to the handler.
 */
function loopback(request) {
    this.handlerIncomingPacket(request);
}

export default function () {
    describe('Handler Incoming Packet:', () => {
        it('Incorrect package', () => {
            var channel = new Channel();
            assert.throws(() => channel.handlerIncomingPacket(undefined));
            assert.throws(() => channel.handlerIncomingPacket(123456));
            assert.throws(() => channel.handlerIncomingPacket(true));
            assert.throws(() => channel.handlerIncomingPacket(null));
            assert.throws(() => channel.handlerIncomingPacket({}));
        });

        it('Establishing a connection', (done) => {
            var channel = new Channel(null, null, null, loopback);
            var request = channel._assemblePackage(null, 'connect');
            channel.connected = done;

            channel.handlerIncomingPacket(request);
        });

        it('Break the connection', (done) => {
            var channel = new Channel(null, null, null, loopback);
            var request = channel._assemblePackage(null, 'close');
            channel.disconnected = done;

            channel.handlerIncomingPacket(request);
        });

        it('Package with data', (done) => {
            var channel = new Channel(null, null, doneFunction, null);
            var request = channel._assemblePackage(null, 'data');
            global.done = done;

            channel.handlerIncomingPacket(request);
        });

        it('Package with an error', (done) => {
            var channel = new Channel(null, null, null, null);
            var request = channel._assemblePackage(null, 'error');
            channel._handlerError = doneFunction;
            global.done = done;

            channel.handlerIncomingPacket(request);
        });
    });
}