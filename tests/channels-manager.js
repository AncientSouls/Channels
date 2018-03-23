"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const channels_manager_1 = require("../lib/channels-manager");
function default_1() {
    describe('ChannelsManager:', () => {
        it('connected() / disconnected()', () => {
            const manager = new channels_manager_1.ChannelsManager();
            manager.list.on('connected', ({ channel }) => {
                chai_1.assert.equal(manager.list.nodes[channel.id], channel);
                chai_1.assert.isTrue(channel.isConnected);
            });
            manager.list.on('disconnected', ({ channel }) => {
                chai_1.assert.equal(manager.list.nodes[channel.id], channel);
            });
            const channel = new manager.Node();
            manager.add(channel);
            channel.on('send', ({ channel, msg }) => channel.got(msg));
            channel.connect();
            chai_1.assert.isTrue(channel.isConnected);
            channel.disconnect();
            chai_1.assert.isFalse(channel.isConnected);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=channels-manager.js.map