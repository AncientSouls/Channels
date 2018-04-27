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
const delay = (t) => __awaiter(this, void 0, void 0, function* () { return new Promise(res => setTimeout(res, t)); });
function default_1() {
    describe('Channel:', () => {
        it(`connect / connected / send / get / got / disconnect / disconnected`, (done) => {
            const c1 = new channel_1.Channel();
            const c2 = new channel_1.Channel();
            const data = { num: 123 };
            const getter = () => data;
            c1.getter = c2.getter = getter;
            c1.on('send', ({ channel }) => c2.got(channel.get()));
            c2.on('send', ({ channel }) => __awaiter(this, void 0, void 0, function* () { return yield c1.got(yield channel.get()); }));
            c1.on('get', ({ channel, data }) => data.num += data.num);
            c2.once('got', ({ channel, data }) => {
                chai_1.assert.equal(data.num, 246);
                channel.send();
            });
            c1.once('got', ({ channel, data }) => {
                chai_1.assert.equal(data.num, 246);
                done();
            });
            c1.send();
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=channel.js.map