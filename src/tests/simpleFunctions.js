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
 * @description Generates a random number up to 65536
 */
function generatorInteger() {
    var rand = 1 + Math.random() * (65536 + 1 - 1);
    return Math.floor(rand);
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
    generatorInteger,
    trueFunction,
    simpleManager,
    simpleChannel
};