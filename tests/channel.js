"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const channel_1 = require("../lib/channel");
function default_1() {
    describe('Channel:', () => {
        it(`connect / send / got / pack / unpack / disconnect`, () => {
            const c1 = new channel_1.Channel();
            const c2 = new channel_1.Channel();
            let c1Got = false;
            c1.on('send', ({ channel, pkg, msg }) => c2.got(msg));
            c2.on('send', ({ channel, pkg, msg }) => c1.got(msg));
            chai_1.assert.isFalse(c1.isConnected);
            chai_1.assert.isFalse(c2.isConnected);
            c1.connect();
            chai_1.assert.isTrue(c1.isConnected);
            chai_1.assert.isTrue(c2.isConnected);
            c1.on('pack', ({ channel, pkg, msg }) => pkg.data += pkg.data);
            c2.on('got', ({ channel, pkg, msg }) => {
                c1Got = true;
                chai_1.assert.equal(pkg.data, 246);
            });
            c1.send(123);
            chai_1.assert.isTrue(c1Got);
            c2.disconnect();
            chai_1.assert.isFalse(c1.isConnected);
            chai_1.assert.isFalse(c2.isConnected);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=channel.js.map