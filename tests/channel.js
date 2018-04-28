"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const channel_1 = require("../lib/channel");
const create_local_transport_1 = require("../lib/create-local-transport");
function default_1() {
    describe('Channel:', () => {
        it(`connect / connected / ready / get / got / disconnect / disconnected`, (done) => {
            const c1 = new channel_1.Channel();
            const c2 = new channel_1.Channel();
            const data = { num: 123 };
            const getter = () => data;
            c1.getter = c2.getter = getter;
            create_local_transport_1.default(c1, c2);
            c1.on('get', ({ channel, data }) => data.num += data.num);
            c2.once('got', ({ channel, data }) => {
                chai_1.assert.equal(data.num, 246);
                channel.ready();
            });
            c1.once('got', ({ channel, data }) => {
                chai_1.assert.equal(data.num, 246);
                done();
            });
            c1.ready();
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=channel.js.map