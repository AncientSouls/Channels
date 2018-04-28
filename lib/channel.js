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
const node_1 = require("ancient-mixins/lib/node");
function mixin(superClass) {
    return class Channel extends superClass {
        constructor() {
            super(...arguments);
            this.getter = () => undefined;
        }
        got(data) {
            return __awaiter(this, void 0, void 0, function* () {
                const _data = yield data;
                this.emit('got', { data: _data, channel: this });
            });
        }
        ready() {
            this.isReading = true;
            this.emit('ready', { channel: this });
        }
        get() {
            return __awaiter(this, void 0, void 0, function* () {
                let data = undefined;
                if (this.isReading) {
                    data = yield this.getter();
                    this.isReading = false;
                }
                this.emit('get', { data, channel: this });
                return data;
            });
        }
    };
}
exports.mixin = mixin;
exports.MixedChannel = mixin(node_1.Node);
class Channel extends exports.MixedChannel {
}
exports.Channel = Channel;
//# sourceMappingURL=channel.js.map