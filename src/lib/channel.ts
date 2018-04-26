import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  Node,
  INode,
  INodeEventsList,
} from 'ancient-mixins/lib/node';

export type TChannel = IChannel<IChannelEventsList>;

export enum PackageType {
  Disconnect = 1,
  Connect = 2,
  Package = 3,
}

export interface IPkgSectionChannel {
  type: PackageType;
}

export interface IPkg {
  channel: IPkgSectionChannel;
  data: any;
}

export type TMsg = string;

export interface IChannelPkgEventData {
  channel: TChannel;
  pkg?: IPkg;
  msg?: TMsg;
}

export interface IChannelEventsList extends INodeEventsList {
  connect: IChannelPkgEventData;
  connected: IChannelPkgEventData;
  disconnect: IChannelPkgEventData;
  disconnected: IChannelPkgEventData;
  got: IChannelPkgEventData;
  send: IChannelPkgEventData;
  pack: IChannelPkgEventData;
  unpack: IChannelPkgEventData;
}

export interface IChannel<IEventsList extends IChannelEventsList> extends INode<IEventsList> {
  isConnected: boolean;
  connect(data?: any): void;
  connected(pkg?: IPkg, msg?: TMsg): void;
  disconnect(data?: any): void;
  disconnected(pkg?: IPkg, msg?: TMsg): void;
  gotPkg(pkg?: IPkg, msg?: TMsg): void;
  got(msg?: TMsg): void;
  send(data?: any): void;
  sendMsg(pkg?: IPkg, msg?: TMsg): void;
  pack(pkg?: IPkg): { pkg: IPkg, msg: TMsg };
  unpack(msg?: TMsg): { pkg: IPkg, msg: TMsg };
  serialize(pkg?: IPkg): any;
  deserialize(msg?: TMsg): any;
}

export function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class Channel extends superClass {
    isConnected = false;
    
    connect(data?) {
      const { pkg, msg } = this.pack({
        data,
        channel: { type: PackageType.Connect },
      });
      this.emit('connect', { pkg, msg, channel: this });
      this.emit('send', { pkg, msg, channel: this });
    }
    
    connected(pkg?, msg?) {
      this.isConnected = true;
      this.emit('connected', { pkg, msg, channel: this });
    }
    
    disconnect(data?) {
      const { pkg, msg } = this.pack({
        data,
        channel: { type: PackageType.Disconnect },
      });
      this.emit('disconnect', { pkg, msg, channel: this });
      this.emit('send', { pkg, msg, channel: this });
    }
    
    disconnected(pkg?, msg?) {
      this.isConnected = false;
      this.emit('disconnected', { pkg, msg, channel: this });
    }
    
    gotPkg(pkg?, msg?): void {
      if (pkg.channel.type === PackageType.Disconnect) {
        const isConnected = this.isConnected;
        this.disconnected(pkg, msg);
        if (isConnected) this.disconnect();
      } else if (pkg.channel.type === PackageType.Connect) {
        const isConnected = this.isConnected;
        this.connected(pkg, msg);
        if (!isConnected) this.connect();
      } else if (pkg.channel.type === PackageType.Package) {
        this.emit('got', { pkg, msg, channel: this });
      }
    }
    
    got(msg?)  {
      const { pkg } = this.unpack(msg);
      this.gotPkg(pkg, msg);
    }
    
    send(data?) {
      const { pkg, msg } = this.pack({
        data,
        channel: { type: PackageType.Package },
      });
      this.sendMsg(pkg, msg);
    }
    
    sendMsg(pkg?, msg?) {
      this.emit('send', { pkg, msg, channel: this });
    }
    
    pack(pkg?) {
      this.emit('pack', { pkg, channel: this });
      const msg = this.serialize(pkg);
      return { pkg, msg };
    }
    
    unpack(msg?) {
      const pkg = this.deserialize(msg);
      this.emit('unpack', { pkg, channel: this });
      return { pkg, msg };
    }
    
    serialize(pkg?) {
      const msg: TMsg = JSON.stringify(pkg);
      return msg;
    }
    
    deserialize(msg?) {
      const pkg: IPkg = JSON.parse(msg);
      return pkg;
    }
  };
}

export const MixedChannel: TClass<IChannel<IChannelEventsList>> = mixin(Node);
export class Channel extends MixedChannel {}
