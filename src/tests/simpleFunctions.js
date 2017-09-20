import { Manager, Channel } from '../lib/index';
import crypto from 'crypto';

/**
 * @description Magic function generating a random true.
 */
function trueFunction() {
    return true;
}

/**
 * @description Generating a random string
 */
function generatorString() {
    return crypto.randomBytes(20).toString('hex');
}

/**
 * @description Create a transport loop for the channel
 */
function channelLoopback(data) {
    this.handlerIncomingPacket(data);
}

/**
 * @description Create the layout of the connected channel
 */
function simpleChannel() {
    var channel = new Channel(trueFunction, trueFunction, trueFunction, trueFunction);
    channel.connected();
    return channel;
}

/**
 * @description Create a layout for the channel manager
 */
function simpleManager() {
    return new Manager(trueFunction, trueFunction, trueFunction);
}

export {
    channelLoopback,
    generatorString,
    trueFunction,
    simpleManager,
    simpleChannel
};