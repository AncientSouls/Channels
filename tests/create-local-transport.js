"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const channel_1 = require("../lib/channel");
const create_local_transport_1 = require("../lib/create-local-transport");
function default_1() {
    it('createLocalTransport()', (done) => {
        const data = { text: 'test' };
        const channel1 = new channel_1.Channel();
        channel1.emitter.on('got', ({ channel, pkg }) => {
            chai_1.assert.deepEqual(pkg.data, data);
            done();
        });
        const channel2 = new channel_1.Channel();
        channel2.emitter.on('got', ({ channel, pkg }) => {
            channel.send(data);
        });
        create_local_transport_1.default(channel1, channel2);
        channel1.send(data);
    });
}
exports.default = default_1;
//# sourceMappingURL=create-local-transport.js.map