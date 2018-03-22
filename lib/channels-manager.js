"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("ancient-mixins/lib/manager");
const channel_1 = require("./channel");
function mixin(superClass) {
    return class ChannelsManager extends superClass {
        constructor() {
            super(...arguments);
            this.Node = channel_1.Channel;
        }
    };
}
exports.default = mixin;
exports.mixin = mixin;
const MixedChannelsManager = mixin(manager_1.Manager);
exports.MixedChannelsManager = MixedChannelsManager;
class ChannelsManager extends MixedChannelsManager {
}
exports.ChannelsManager = ChannelsManager;
//# sourceMappingURL=channels-manager.js.map