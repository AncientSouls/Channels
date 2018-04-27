"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createLocalTransport(channel1, channel2) {
    channel1.on('send', ({ channel }) => channel2.got(channel.get()));
    channel2.on('send', ({ channel }) => channel1.got(channel.get()));
}
exports.default = createLocalTransport;
//# sourceMappingURL=create-local-transport.js.map