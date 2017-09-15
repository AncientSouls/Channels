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
 * @description Saves the result to the global namespace
 */
function gotPackage(request) {
    global.request = request;
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

    describe('Send Package:', () => {
        it('Incorrect package', () => {
            var channel = new Channel(null, null, null, null);
            assert.throws(() => channel.send(undefined));
            assert.throws(() => channel.send(123456));
            assert.throws(() => channel.send(true));
            assert.throws(() => channel.send(null));
            assert.throws(() => channel.send({}));
        });

        it('Call cycle', (done) => {
            var channel = new Channel(null, null, doneFunction, loopback);
            var data = 'Laughing man';
            global.done = done;
            channel.send(data);
        });

        it('Formation of the package', () => {
            var channel = new Channel(null, null, gotPackage, loopback);
            var data = 'Work earns Salvation';
            channel.send(data);
            assert.equal(global.request, data);
        });
    });

    describe('Connect:', () => {
        it('Authorization', () => {
            var channel = new Channel(null, null, null, gotPackage);
            channel.connect(true);

            var request = channel._disassemblePackage(global.request);
            assert.isString(request[1]);
        });

        it('No authorization', () => {
            var channel = new Channel(null, null, null, gotPackage);
            channel.connect(false);

            var request = channel._disassemblePackage(global.request);
            assert.isNull(request[1]);
        });
    });

    describe('Disconnect:', () => {
        it('Call \'disconnected()\'', (done) => {
            var channel = new Channel(null, null, null, gotPackage);
            channel.disconnected = done;
            channel.disconnect();
        });

        it('Package', () => {
            var channel = new Channel(null, null, null, gotPackage);
            channel.onDisconnected = () => {};
            channel.disconnect();

            var request = channel._disassemblePackage(global.request);
            assert.equal(request[0], 'close');
        });
    });
}