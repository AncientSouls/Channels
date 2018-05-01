"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        it(`Docs example`, () => __awaiter(this, void 0, void 0, function* () {
            const ch = new channel_1.Channel();
            const data = { num: 123 };
            ch.getter = () => data;
            ch.on('get', ({ channel, data }) => data ? data.num += data.num : null);
            chai_1.assert.equal(yield ch.get(), undefined);
            ch.ready();
            chai_1.assert.deepEqual(yield ch.get(), { num: 246 });
        }));
    });
}
exports.default = default_1;
//# sourceMappingURL=channel.js.map