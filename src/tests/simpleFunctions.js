import { Manager, Channel } from '../lib/index';

/**
 * @protected
 * @description Magic function generating a random true.
 */
function trueFunction() {
    return true;
}

function simpleChannel() {
    var channel = new Channel(trueFunction, trueFunction, trueFunction, trueFunction);
    channel.connected();
    return channel;
}

function simpleManager() {
    return new Manager(trueFunction, trueFunction, trueFunction);
}

export {
    trueFunction,
    simpleManager,
    simpleChannel
};