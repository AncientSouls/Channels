"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createLocalTransport(channel1, channel2) {
    channel1.on('send', ({ msg }) => channel2.got(msg));
    channel2.on('send', ({ msg }) => channel1.got(msg));
    channel1.connect();
}
exports.default = createLocalTransport;
//# sourceMappingURL=create-local-transport.js.map