"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("ancient-mixins/lib/node");
var PackageType;
(function (PackageType) {
    PackageType[PackageType["Disconnect"] = 1] = "Disconnect";
    PackageType[PackageType["Connect"] = 2] = "Connect";
    PackageType[PackageType["Package"] = 3] = "Package";
})(PackageType || (PackageType = {}));
exports.PackageType = PackageType;
function mixin(superClass) {
    return class Channel extends superClass {
        constructor() {
            super(...arguments);
            this.isConnected = false;
        }
        connect(data) {
            const { pkg, msg } = this.pack({
                data,
                channel: { type: PackageType.Connect },
            });
            this.emit('connect', { pkg, msg, channel: this });
            this.emit('send', { pkg, msg, channel: this });
        }
        connected(pkg, msg) {
            this.isConnected = true;
            this.emit('connected', { pkg, msg, channel: this });
        }
        disconnect(data) {
            const { pkg, msg } = this.pack({
                data,
                channel: { type: PackageType.Disconnect },
            });
            this.emit('disconnect', { pkg, msg, channel: this });
            this.emit('send', { pkg, msg, channel: this });
        }
        disconnected(pkg, msg) {
            this.isConnected = false;
            this.emit('disconnected', { pkg, msg, channel: this });
        }
        gotPkg(pkg, msg) {
            if (pkg.channel.type === PackageType.Disconnect) {
                const isConnected = this.isConnected;
                this.disconnected(pkg, msg);
                if (isConnected)
                    this.disconnect();
            }
            else if (pkg.channel.type === PackageType.Connect) {
                const isConnected = this.isConnected;
                this.connected(pkg, msg);
                if (!isConnected)
                    this.connect();
            }
            else if (pkg.channel.type === PackageType.Package) {
                this.emit('got', { pkg, msg, channel: this });
            }
        }
        got(msg) {
            const { pkg } = this.unpack(msg);
            this.gotPkg(pkg, msg);
        }
        send(data) {
            const { pkg, msg } = this.pack({
                data,
                channel: { type: PackageType.Package },
            });
            this.sendMsg(pkg, msg);
        }
        sendMsg(pkg, msg) {
            this.emit('send', { pkg, msg, channel: this });
        }
        pack(pkg) {
            this.emit('pack', { pkg, channel: this });
            const msg = this.serialize(pkg);
            return { pkg, msg };
        }
        unpack(msg) {
            const pkg = this.deserialize(msg);
            this.emit('unpack', { pkg, channel: this });
            return { pkg, msg };
        }
        serialize(pkg) {
            const msg = JSON.stringify(pkg);
            return msg;
        }
        deserialize(msg) {
            const pkg = JSON.parse(msg);
            return pkg;
        }
    };
}
exports.default = mixin;
exports.mixin = mixin;
const MixedChannel = mixin(node_1.Node);
exports.MixedChannel = MixedChannel;
class Channel extends MixedChannel {
}
exports.Channel = Channel;
//# sourceMappingURL=channel.js.map