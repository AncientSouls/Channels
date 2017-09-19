import { Manager, Channel } from '../lib/index';

/**
 * @description Magic function generating a random true.
 */
function trueFunction() {
    return true;
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
    trueFunction,
    simpleManager,
    simpleChannel
};